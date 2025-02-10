import React, { useState } from 'react';
import useSWR from 'swr';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { analysisService } from '@/utils/analysis/analysis';
import DatePicker from '@/components/admin-dashboard/DatePicker';
import { utils, WorkSheet, writeFile } from 'xlsx';

interface Transaction {
    date: string;
    commission_amount: string;
    bonus_amount: string;
    purchase_amount: string;
    sale_amount: string;
    commission_count: string;
    bonus_count: string;
    purchase_count: string;
    sale_count: string;
}

interface Period {
    startDate: string;
    endDate: string;
}

interface Total {
    commission_amount: string;
    bonus_amount: string;
    purchase_amount: string;
    sale_amount: string;
    commission_count: string;
    bonus_count: string;
    purchase_count: string;
    sale_count: string;
}

interface AnalysisData {
    userTransactions: Transaction[];
    period: Period;
    total: Total;
}

const TransactionDashboard = () => {
    const [startDate, setStartDate] = useState<Date>(new Date(new Date().setDate(new Date().getDate() - 30)));
    const [endDate, setEndDate] = useState<Date>(new Date());

    const formatDateToString = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const fetcher = () => {
        const formattedStartDate = formatDateToString(startDate);
        const formattedEndDate = formatDateToString(endDate);
        return analysisService.getAnalysisData(formattedStartDate, formattedEndDate);
    };

    const { data, error, isLoading } = useSWR<AnalysisData>(
        [`/analysis`, formatDateToString(startDate), formatDateToString(endDate)],
        fetcher,
        {
            revalidateOnFocus: false,
            refreshInterval: 30000, // Refresh every 30 seconds
        }
    );

    console.log(data);


    const formatCurrency = (amount: string) => {
        return parseFloat(amount).toLocaleString('vi-VN');
    };

    const exportToXLSX = (transactions: Transaction[], period: Period): void => {
        try {
            // Tạo dữ liệu cho file Excel
            const excelData = transactions.map(row => ({
                'Ngày': row.date,
                'Hoa hồng (VNĐ)': parseFloat(row.commission_amount).toLocaleString('vi-VN'),
                'Thưởng (VNĐ)': parseFloat(row.bonus_amount).toLocaleString('vi-VN'),
                'Tổng mua (VNĐ)': parseFloat(row.purchase_amount).toLocaleString('vi-VN'),
                'Tổng bán (VNĐ)': parseFloat(row.sale_amount).toLocaleString('vi-VN'),
                'Số GD hoa hồng': row.commission_count,
                'Số GD thưởng': row.bonus_count,
                'Số GD mua': row.purchase_count,
                'Số GD bán': row.sale_count
            }));

            // Tạo workbook mới
            const wb = utils.book_new();

            // Tạo worksheet từ dữ liệu
            const ws: WorkSheet = utils.json_to_sheet(excelData);

            // Điều chỉnh độ rộng cột
            const columnWidths: { wch: number }[] = [
                { wch: 15 },  // Ngày
                { wch: 20 },  // Hoa hồng
                { wch: 20 },  // Thưởng
                { wch: 20 },  // Tổng mua
                { wch: 20 },  // Tổng bán
                { wch: 15 },  // Số GD hoa hồng
                { wch: 15 },  // Số GD thưởng
                { wch: 15 },  // Số GD mua
                { wch: 15 },  // Số GD bán
            ];
            ws['!cols'] = columnWidths;

            // Thêm worksheet vào workbook
            utils.book_append_sheet(wb, ws, 'Thống kê giao dịch');

            // Tạo tên file với thời gian
            const fileName = `thong-ke-giao-dich-${period.startDate}-den-${period.endDate}.xlsx`;

            // Xuất file
            writeFile(wb, fileName);
        } catch (error) {
            console.error('Lỗi khi xuất file:', error);
            // Có thể thêm thông báo lỗi cho người dùng ở đây
        }
    };

    const handleExportXLSX = (): void => {
        if (!data) return;
        exportToXLSX(data.userTransactions, data.period);
    };


    if (error) {
        return <div className="text-red-500 text-center">Đã có lỗi xảy ra khi tải dữ liệu</div>;
    }

    if (isLoading) {
        return <div className="text-center">Đang tải dữ liệu...</div>;
    }

    if (!data) {
        return <div className="text-center">Không có dữ liệu</div>;
    }

    const { userTransactions, total } = data;

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex sm:flex-row flex-col sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
                        <CardTitle>Thống kê tổng quan</CardTitle>
                        <div className="flex space-x-4">
                            <DatePicker
                                selected={startDate}
                                onChange={(date: Date | null) => date && setStartDate(date)}
                                placeholderText="Từ ngày"
                                className="w-40"
                            />
                            <DatePicker
                                selected={endDate}
                                onChange={(date: Date | null) => date && setEndDate(date)}
                                placeholderText="Đến ngày"
                                className="w-40"
                                minDate={startDate}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="gap-4 grid grid-cols-2">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Tổng hoa hồng:</span>
                                    <span className="font-bold text-xl">
                                        {formatCurrency(total.commission_amount)} VNĐ
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Tổng thưởng:</span>
                                    <span className="font-bold text-xl">
                                        {formatCurrency(total.bonus_amount)} VNĐ
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Tổng mua:</span>
                                    <span className="font-bold text-xl">
                                        {formatCurrency(total.purchase_amount)} VNĐ
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Tổng bán:</span>
                                    <span className="font-bold text-xl">
                                        {formatCurrency(total.sale_amount)} VNĐ
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Chi tiết giao dịch theo ngày</CardTitle>
                        <Button
                            onClick={handleExportXLSX}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Xuất XLSX
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Ngày</TableHead>
                                <TableHead>Hoa hồng</TableHead>
                                <TableHead>Thưởng</TableHead>
                                <TableHead>Tổng mua</TableHead>
                                <TableHead>Tổng bán</TableHead>
                                <TableHead>Số GD hoa hồng</TableHead>
                                <TableHead>Số GD thưởng</TableHead>
                                <TableHead>Số GD mua</TableHead>
                                <TableHead>Số GD bán</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userTransactions.map((transaction) => (
                                <TableRow key={transaction.date}>
                                    <TableCell>{transaction.date}</TableCell>
                                    <TableCell>{formatCurrency(transaction.commission_amount)} VNĐ</TableCell>
                                    <TableCell>{formatCurrency(transaction.bonus_amount)} VNĐ</TableCell>
                                    <TableCell>{formatCurrency(transaction.purchase_amount)} VNĐ</TableCell>
                                    <TableCell>{formatCurrency(transaction.sale_amount)} VNĐ</TableCell>
                                    <TableCell>{transaction.commission_count}</TableCell>
                                    <TableCell>{transaction.bonus_count}</TableCell>
                                    <TableCell>{transaction.purchase_count}</TableCell>
                                    <TableCell>{transaction.sale_count}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default TransactionDashboard;
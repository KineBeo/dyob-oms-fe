import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { commissionHistoryService } from '@/utils/commission-history/commission-historyApi';
import { UserStatus } from '@/interfaces/user-status';
import * as XLSX from 'xlsx';

interface User {
    id: string;
    fullName: string;
    phoneNumber: string;
    bankName: string;
    bankAccountNumber: string;
    rank: string;
}

interface CommissionRecord {
    userId: string;
    user: User;
    monthly_commission: number;
    bonus: number;
    month: number;
    year: number;
    createdAt: string;
    userStatus: UserStatus;
}

const CommissionDashboard: React.FC = () => {
    // Get available months and years
    const today = new Date();
    const previousMonth = new Date(today.getFullYear(), today.getMonth() - 1);

    const [commissionData, setCommissionData] = useState<CommissionRecord[]>([]);
    const [selectedYear, setSelectedYear] = useState<number>(previousMonth.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState<number>(previousMonth.getMonth() + 1);
    const [loading, setLoading] = useState<boolean>(true);

    // Generate available years (from 2024 to current year)
    const availableYears = Array.from(
        { length: today.getFullYear() - 2023 },
        (_, i) => 2024 + i
    ).reverse();

    // Generate available months based on selected year
    const getAvailableMonths = () => {
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1;

        return Array.from({ length: 12 }, (_, i) => ({
            value: i + 1,
            label: `Tháng ${i + 1}`,
            disabled: selectedYear === currentYear && (i + 1) > currentMonth
        })).reverse();
    };

    useEffect(() => {
        fetchCommissionData();
    }, [selectedYear, selectedMonth]);

    const fetchCommissionData = async () => {
        setLoading(true);
        try {
            const data = await commissionHistoryService.getCommissionHistoryMonthly(selectedMonth, selectedYear);
            setCommissionData(data);
        } catch (error) {
            console.error('Error fetching commission data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getFilteredData = () => {
        if (commissionData === null || commissionData === undefined) return [];

        return commissionData.filter(item =>
            item.year === selectedYear && item.month === selectedMonth
        );
    };

    const calculateTotalCommission = () => {
        const filteredData = getFilteredData();
        return {
            monthly: filteredData.reduce((sum, item) => sum + Number(item.monthly_commission), 0),
            bonus: filteredData.reduce((sum, item) => sum + Number(item.bonus), 0)
        };
    };

    const exportToExcel = () => {
        const filteredData = getFilteredData();

        if (filteredData.length === 0) {
            alert('Không có dữ liệu cho thời gian đã chọn');
            return;
        }

        // Prepare data for Excel
        const excelData = filteredData.map((item, index) => ({
            'Tên người dùng': item.userStatus.user.fullname,
            'Cấp bậc': item.userStatus.user_rank,
            'Số điện thoại': item.userStatus.user.phone_number,
            'Ngân hàng': item.userStatus.user.bank_name,
            'Số tài khoản': item.userStatus.user.bank_account_number,
            'Hoa hồng (VNĐ)': Number(item.monthly_commission),
            'Thưởng (VNĐ)': Number(item.bonus),
            'Tổng cộng (VNĐ)': Number(item.monthly_commission) + Number(item.bonus)
        }));

        // Add summary row
        const totals = calculateTotalCommission();
        console.log(totals);
        excelData.push({
            'Tên người dùng': '',
            'Cấp bậc': '',
            'Số điện thoại': '',
            'Ngân hàng': '',
            'Số tài khoản': 'TỔNG CỘNG',
            'Hoa hồng (VNĐ)': totals.monthly,
            'Thưởng (VNĐ)': totals.bonus,
            'Tổng cộng (VNĐ)': totals.monthly + totals.bonus
        });

        // Create worksheet
        const ws = XLSX.utils.json_to_sheet(excelData);

        // Set column widths
        const colWidths = [
            { wch: 5 },  // STT
            { wch: 30 }, // Tên người dùng
            { wch: 15 }, // Cấp bậc
            { wch: 15 }, // Số điện thoại
            { wch: 20 }, // Ngân hàng
            { wch: 20 }, // Số tài khoản
            { wch: 15 }, // Hoa hồng
            { wch: 15 }, // Thưởng
            { wch: 15 }, // Tổng cộng
        ];
        ws['!cols'] = colWidths;

        // Create workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Hoa Hồng');

        // Save file
        XLSX.writeFile(wb, `hoa-hong-thang-${selectedMonth}-${selectedYear}.xlsx`);
    };

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-gray-800 text-3xl">Lịch sử hoa hồng</h2>
                <div className="flex gap-4">
                    <Select
                        value={selectedMonth.toString()}
                        onValueChange={(value) => setSelectedMonth(parseInt(value))}
                    >
                        <SelectTrigger className="w-32">
                            <SelectValue placeholder="Chọn tháng" />
                        </SelectTrigger>
                        <SelectContent>
                            {getAvailableMonths().map(month => (
                                <SelectItem
                                    key={month.value}
                                    value={month.value.toString()}
                                    disabled={month.disabled}
                                >
                                    {month.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={selectedYear.toString()}
                        onValueChange={(value) => setSelectedYear(parseInt(value))}
                    >
                        <SelectTrigger className="w-32">
                            <SelectValue placeholder="Chọn năm" />
                        </SelectTrigger>
                        <SelectContent>
                            {availableYears.map(year => (
                                <SelectItem key={year} value={year.toString()}>
                                    Năm {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Thống kê hoa hồng tháng {selectedMonth} năm {selectedYear}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Tổng hoa hồng:</span>
                            <span className="font-bold text-xl">
                                {new Intl.NumberFormat('vi-VN').format(calculateTotalCommission().monthly)} VNĐ
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Tổng thưởng:</span>
                            <span className="font-bold text-xl">
                                {new Intl.NumberFormat('vi-VN').format(calculateTotalCommission().bonus)} VNĐ
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Tổng cộng:</span>
                            <span className="font-bold text-primary text-xl">
                                {new Intl.NumberFormat('vi-VN').format(
                                    calculateTotalCommission().monthly + calculateTotalCommission().bonus
                                )} VNĐ
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Chi tiết hoa hồng {`Tháng ${selectedMonth}`} năm {selectedYear}</CardTitle>
                        <Button
                            onClick={exportToExcel}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Xuất dữ liệu
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>STT</TableHead>
                                    <TableHead>Tên người dùng</TableHead>
                                    <TableHead>Cấp bậc</TableHead>
                                    <TableHead>Hoa hồng</TableHead>
                                    <TableHead>Thưởng</TableHead>
                                    <TableHead>Tổng cộng</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">
                                            Đang tải dữ liệu...
                                        </TableCell>
                                    </TableRow>
                                ) : getFilteredData().length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">
                                            Không có dữ liệu cho thời gian đã chọn
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    getFilteredData().map((item, index) => {
                                        return (
                                            (
                                                <TableRow key={item.userId}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{item.userStatus.user.fullname}</TableCell>
                                                    <TableCell>{item.userStatus.user_rank}</TableCell>
                                                    <TableCell>
                                                        {
                                                            new Intl.NumberFormat('vi-VN').format(Number(item.monthly_commission))
                                                        } VNĐ
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Intl.NumberFormat('vi-VN').format(item.bonus)} VNĐ
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Intl.NumberFormat('vi-VN').format(Number(item.monthly_commission) + Number(item.bonus))} VNĐ
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CommissionDashboard;
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { commissionHistoryService } from '@/utils/commission-history/commission-historyApi';
import UserDetailModal from './UserDetailModal';
import { Button } from '../ui/button';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { User } from '@/interfaces/auth';
import { Download } from 'lucide-react';
import { UserStatus } from '@/interfaces/user-status';

interface CommissionHistory {
  userStatus: UserStatus;
  monthly_commission: string;
  bonus: string;
  month: number;
  year: number;
  createdAt: Date;
}

const CommissionHistoryManagement = () => {
  const [commissionData, setCommissionData] = useState<CommissionHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedUser, setSelectedUser] = useState<UserStatus | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    fetchCommissionHistory();
  }, []);

  const fetchCommissionHistory = async () => {
    try {
      setLoading(true);
      const data = await commissionHistoryService.getAllCommissionHistory();
      setCommissionData(data);

      // Find the most recent year and month
      if (data.length > 0) {
        const sortedData = data.sort((a: CommissionHistory, b: CommissionHistory) =>
          new Date(b.year, b.month - 1).getTime() - new Date(a.year, a.month - 1).getTime()
        );

        const mostRecentEntry = sortedData[0];
        setSelectedYear(mostRecentEntry.year);
        setSelectedMonth(mostRecentEntry.month);
      }
    } catch (error) {

      console.error('Error fetching commission history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (userStatus: UserStatus) => {
    setSelectedUser(userStatus);
    setIsModalOpen(true);
  };

  const getYearlyData = () => {
    return commissionData.filter(item => item.year === selectedYear);
  };

  const prepareChartData = () => {
    const yearlyData = getYearlyData();

    type MonthlyTotals = {
      [key: number]: {
        month: string;
        'Tổng hoa hồng cá nhân': number;
        'Tổng thưởng': number;
      };
    };

    const monthlyTotals = yearlyData.reduce((acc: MonthlyTotals, item) => {
      const month = item.month;
      if (!acc[month]) {
        acc[month] = {
          month: `Tháng ${month}`,
          'Tổng hoa hồng cá nhân': 0,
          'Tổng thưởng': 0
        };
      }
      acc[month]['Tổng hoa hồng cá nhân'] += parseFloat(item.monthly_commission);
      acc[month]['Tổng thưởng'] += parseFloat(item.bonus);
      return acc;
    }, {} as MonthlyTotals);

    return Object.values(monthlyTotals).sort((a, b) => {
      return parseInt((a as any).month.split(' ')[1]) - parseInt((b as any).month.split(' ')[1]);
    });
  };

  const exportToCSV = () => {
    // Filter data for the selected month and year
    const monthlyData = getYearlyData().filter(
      item => item.month === selectedMonth
    );

    // If no data for the selected month
    if (monthlyData.length === 0) {
      alert(`Không có dữ liệu hoa hồng cho tháng ${selectedMonth} năm ${selectedYear}.`);
      return;
    }

    // Prepare CSV data
    const csvData: { [key: string]: string }[] = monthlyData.map(item => ({
      'Tháng': `Tháng ${item.month}`,
      'Tên người dùng': item.userStatus.user.fullname,
      'Số điện thoại': item.userStatus.user.phone_number,
      'Tài khoản ngân hàng': item.userStatus.user.bank_name,
      'Số tài khoản': item.userStatus.user.bank_account_number,
      'Mã người dùng': item.userStatus.personal_referral_code,
      'Cấp bậc': item.userStatus.user_rank,
      'Hoa hồng cá nhân': parseFloat(item.monthly_commission).toLocaleString('vi-VN') + ' VNĐ',
      'Thưởng doanh số': parseFloat(item.bonus).toLocaleString('vi-VN') + ' VNĐ',
    }));

    // Create CSV content
    const headers = Object.keys(csvData[0]);
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => headers.map(header => `"${row[header as keyof typeof row]}"`).join(','))
    ].join('\n');

    // Create and download CSV
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `hoa-hong-thang-${selectedMonth}-${selectedYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const calculateTotalCommission = () => {
    const yearlyData = getYearlyData();
    return {
      monthly: yearlyData.reduce((sum, item) => sum + parseFloat(item.monthly_commission), 0),
      bonus: yearlyData.reduce((sum, item) => sum + parseFloat(item.bonus), 0)
    };
  };

  const uniqueYears = Array.from(new Set(commissionData.map(item => item.year)));
  const uniqueMonths = Array.from(
    new Set(getYearlyData().map(item => item.month))
  ).sort((a, b) => a - b);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl text-gray-800">Lịch sử hoa hồng</h2>
        <div className="flex items-center space-x-4">
          <Select
            value={selectedYear.toString()}
            onValueChange={(value) => setSelectedYear(parseInt(value))}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Chọn năm" />
            </SelectTrigger>
            <SelectContent>
              {uniqueYears.map(year => (
                <SelectItem key={year} value={year.toString()}>
                  Năm {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedMonth.toString()}
            onValueChange={(value) => setSelectedMonth(parseInt(value))}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Chọn tháng" />
            </SelectTrigger>
            <SelectContent>
              {uniqueMonths.map(month => (
                <SelectItem key={month} value={month.toString()}>
                  Tháng {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Rest of the component remains the same as before */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tổng quan hoa hồng năm {selectedYear}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={prepareChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis
                    tickFormatter={(value) => value.toLocaleString('vi-VN')}
                    label={{
                      value: 'VNĐ',
                      angle: -90,
                      position: 'insideLeft',
                      style: { fontSize: '12px' }
                    }}
                    tick={{ fontSize: '12px' }}
                  />
                  <Tooltip
                    formatter={(value) => [value.toLocaleString('vi-VN') + ' VNĐ']}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Tổng hoa hồng cá nhân"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Tổng thưởng doanh số"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thống kê tổng hoa hồng năm {selectedYear}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tổng hoa hồng cá nhân:</span>
                <span className="font-bold text-xl">
                  {calculateTotalCommission().monthly.toLocaleString('vi-VN')} VNĐ
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Thưởng doanh số cá nhân:</span>
                <span className="font-bold text-xl">
                  {calculateTotalCommission().bonus.toLocaleString('vi-VN')} VNĐ
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Chi tiết hoa hồng theo tháng</CardTitle>
            <Button
              onClick={exportToCSV}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Xuất CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tháng</TableHead>
                <TableHead>Tên người dùng</TableHead>
                <TableHead>Cấp bậc</TableHead>
                <TableHead>Hoa hồng cá nhân</TableHead>
                <TableHead>Thưởng</TableHead>
                <TableHead>Tổng cộng</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getYearlyData()
                .filter(item => item.month === selectedMonth)
                .map((item) => (
                  <TableRow key={`${item.year}-${item.month}`}>
                    <TableCell>Tháng {item.month}</TableCell>
                    <TableCell>{item.userStatus.user.fullname}</TableCell>
                    <TableCell>{item.userStatus.user_rank}</TableCell>
                    <TableCell>{parseFloat(item.monthly_commission).toLocaleString('vi-VN')} VNĐ</TableCell>
                    <TableCell>{parseFloat(item.bonus).toLocaleString('vi-VN')} VNĐ</TableCell>
                    <TableCell>
                      {(parseFloat(item.monthly_commission) + parseFloat(item.bonus)).toLocaleString('vi-VN')} VNĐ
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRowClick(item.userStatus)}
                      >
                        Chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedUser && (
        <UserDetailModal
          user={selectedUser.user}
          userStatus={selectedUser}
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default CommissionHistoryManagement;
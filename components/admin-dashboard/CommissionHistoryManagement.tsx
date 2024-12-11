import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { commissionHistoryService } from '@/utils/commission-history/commission-historyApi';
import { UserStatus } from '../affiliate-dashboard/Referrals';
import UserDetailModal from './UserDetailModal';
import { Button } from '../ui/button';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { User } from '@/interfaces/auth';

interface CommissionHistory {
    userStatus: UserStatus;
    monthly_commission: string;
    group_commission: string;
    month: number;
    year: number;
    createdAt: Date;
}

const CommissionHistoryManagement = () => {
  const [commissionData, setCommissionData] = useState<CommissionHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
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
    //   console.log(data);
      setCommissionData(data);
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
    return yearlyData.map(item => ({
      month: `Tháng ${item.month}`,
      'Hoa hồng tháng': parseFloat(item.monthly_commission),
      'Hoa hồng nhóm': parseFloat(item.group_commission)
    }));
  };

  const calculateTotalCommission = () => {
    const yearlyData = getYearlyData();
    return {
      monthly: yearlyData.reduce((sum, item) => sum + parseFloat(item.monthly_commission), 0),
      group: yearlyData.reduce((sum, item) => sum + parseFloat(item.group_commission), 0)
    };
  };

  const uniqueYears = Array.from(new Set(commissionData.map(item => item.year)));

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Lịch sử hoa hồng</h2>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Hoa hồng tháng"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Hoa hồng nhóm"
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
                <span className="text-gray-600">Tổng hoa hồng nhóm:</span>
                <span className="font-bold text-xl">
                  {calculateTotalCommission().group.toLocaleString('vi-VN')} VNĐ
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chi tiết hoa hồng theo tháng</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tháng</TableHead>
                <TableHead>Mã người dùng</TableHead>
                <TableHead>Cấp bậc</TableHead>
                <TableHead>Hoa hồng cá nhân</TableHead>
                <TableHead>Hoa hồng nhóm</TableHead>
                <TableHead>Tổng cộng</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getYearlyData().map((item) => (
                <TableRow key={`${item.year}-${item.month}`}>
                  <TableCell>Tháng {item.month}</TableCell>
                  <TableCell>{item.userStatus.personal_referral_code}</TableCell>
                  <TableCell>{item.userStatus.user_rank}</TableCell>
                  <TableCell>{parseFloat(item.monthly_commission).toLocaleString('vi-VN')} VNĐ</TableCell>
                  <TableCell>{parseFloat(item.group_commission).toLocaleString('vi-VN')} VNĐ</TableCell>
                  <TableCell>
                    {(parseFloat(item.monthly_commission) + parseFloat(item.group_commission)).toLocaleString('vi-VN')} VNĐ
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
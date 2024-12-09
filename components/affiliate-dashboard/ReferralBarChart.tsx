import React, { useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Referral, UserStatus } from './Referrals';
import { Select, SelectItem } from '@nextui-org/react';

const ReferralBarChart =  ({ userStatus }: { userStatus: UserStatus }) => {
  const [timeRange, setTimeRange] = useState(3); // Default to 3 months

  const processedData = useMemo(() => {
    const referralsByDate = new Map();
    
    const processReferrals = (referrals: Referral[]) => {
      referrals.forEach((referral: Referral) => {
        const date = new Date(referral.createdAt).toISOString().split('T')[0];
        referralsByDate.set(date, (referralsByDate.get(date) || 0) + 1);
        
        if (referral.referrals && referral.referrals.length > 0) {
          processReferrals(referral.referrals);
        }
      });
    };

    if (userStatus.referrals) {
      processReferrals(userStatus.referrals);
    }

    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - timeRange);

    const chartData = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      chartData.push({
        date: dateStr,
        referrals: referralsByDate.get(dateStr) || 0
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return chartData;
  }, [userStatus, timeRange]);

  const datesOfChart = [
    {key: 1, value: '1 tháng'},
    {key: 2, value: '2 tháng'},
    {key: 3, value: '3 tháng'},
    {key: 6, value: '6 tháng'},
    {key: 12, value: '12 tháng'},
  ]

  return (
    <Card className="w-full border border-gray-300">
      <CardHeader>
        <CardTitle>Thống kê giới thiệu</CardTitle>
        <CardDescription>Số lượt giới thiệu hàng ngày trong {timeRange} tháng qua</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select
            id="timeRange"
            value={timeRange}
            onChange={(e) => setTimeRange(Number(e.target.value))}
            className="max-w-xs"
            radius='lg'
            label="Chọn khoảng thời gian"
            variant='bordered'
          >
            {datesOfChart.map((date) => (
              <SelectItem key={date.key} value={date.key}>{date.value}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                angle={-15}
                textAnchor="end"
                height={60}
                tickFormatter={(date) => {
                  return new Date(date).toLocaleDateString('vi-VN', {
                    month: 'numeric',
                    day: 'numeric'
                  });
                }}
              />
              <YAxis
                allowDecimals={false}
                label={{ value: 'Số người được giới thiệu', angle: -90, position: 'center'}}
              />
              <Tooltip
                labelFormatter={(date) => {
                  return new Date(date).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  });
                }}
                formatter={(value) => [`SL: ${value} người`, '']}
              />
              <Bar
                dataKey="referrals"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralBarChart;
import React, { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Referral, UserStatus } from './Referrals';

const ReferralBarChart =  ({ userStatus }: { userStatus: UserStatus }) => {
  const processedData = useMemo(() => {
    // Create a map to store referrals by date
    const referralsByDate = new Map();
    
    // Function to process referrals recursively
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

    // Get date range for last 3 months
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - 1);

    // Create array of all dates in range
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
  }, [userStatus]);

  return (
    <Card className="w-full border border-gray-300">
      <CardHeader>
        <CardTitle>Thống kê giới thiệu</CardTitle>
        <CardDescription>Số lượt giới thiệu hàng ngày trong 3 tháng qua</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                angle={-10}
                textAnchor="end"
                height={60}
                tickFormatter={(date) => {
                  return new Date(date).toLocaleDateString('vi-US', {
                    month: 'short',
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
                formatter={(value) => [`${value} referral${value !== 1 ? 's' : ''}`, 'Count']}
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
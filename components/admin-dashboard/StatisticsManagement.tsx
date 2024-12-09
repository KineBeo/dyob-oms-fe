"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { orderService } from "@/utils/order/orderApi"
import { userService } from "@/utils/user/userApi"
import { useEffect, useState } from "react"
import { Order } from "@/interfaces/order"
import { User } from "@/interfaces/user"
import { DollarSign, Users, ShoppingCart, Activity } from 'lucide-react';

const chartConfig = {
  views: {
    label: "Số liệu",
  },
  revenue: {
    label: "Doanh số",
    color: "hsl(var(--chart-1))",
  },
  newUser: {
    label: "Người dùng mới",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface ChartData {
  date: string;
  revenue: number;
  newUser: number;
}

export function StatisticsManagement() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    subscriptions: 0,
    sales: 0,
    activeNow: 0,
    completedOrders: 0,
  });

  const [chartData, setChartData] = React.useState<ChartData[]>([]);
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("revenue");

  const total = React.useMemo(
    () => ({
      revenue: chartData.reduce((acc, curr) => acc + curr.revenue, 0),
      newUser: chartData.reduce((acc, curr) => acc + curr.newUser, 0),
    }),
    [chartData]
  )

  React.useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        const orders = await orderService.getAllOrders();
        const users = await userService.getAll();

        // Lấy ngày 3 tháng trước
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

        // Nhóm và tính tổng theo ngày cho orders
        const dailyTotals = orders.reduce((acc: Record<string, { date: string; revenue: number; newUser: number }>, order: { createdAt: string; total_amount: string; status: string }) => {
          const orderDate = new Date(order.createdAt);
          if (orderDate >= threeMonthsAgo && order.status === "COMPLETED") {
            const dateKey = orderDate.toISOString().split('T')[0];
            const amount = parseFloat(order.total_amount);

            if (!acc[dateKey]) {
              acc[dateKey] = {
                date: dateKey,
                revenue: 0,
                newUser: 0,
              };
            }
            acc[dateKey].revenue += amount;
          }
          return acc;
        }, {});

        // Nhóm và tính tổng theo ngày cho users
        users.forEach((user: { createdAt: Date }) => {
          const userDate = new Date(user.createdAt);
          if (userDate >= threeMonthsAgo) {
            const dateKey = userDate.toISOString().split('T')[0];

            if (!dailyTotals[dateKey]) {
              dailyTotals[dateKey] = {
                date: dateKey,
                revenue: 0,
                newUser: 0,
              };
            }
            dailyTotals[dateKey].newUser += 1;
          }
        });

        // Chuyển đổi thành mảng và sắp xếp theo ngày
        const processedData = Object.values(dailyTotals)
          .sort((a, b) => new Date((a as ChartData).date).getTime() - new Date((b as ChartData).date).getTime());

        setChartData(processedData as ChartData[]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAndProcessData();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const orders = await orderService.getAllOrders();
        const users = await userService.getAll();

        // Tính toán các thống kê
        const completedOrders = orders.filter((order: Order) => order.status === "COMPLETED");
        const totalRevenue = completedOrders.reduce((sum: number, order: Order) =>
          sum + parseFloat(order.total_amount), 0
        );

        // Tính tăng trưởng so với tháng trước
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        const lastMonthRevenue = completedOrders
          .filter((order: Order) => new Date(order.createdAt) >= lastMonth)
          .reduce((sum: number, order: Order) => sum + parseFloat(order.total_amount), 0);


        // Tính số lượng người dùng được tạo trong tháng trước
        const subscriptions = users.filter((user: User) => new Date(user.createdAt) >= lastMonth).length;

        setStats({
          totalRevenue,
          subscriptions,
          sales: completedOrders.length,
          activeNow: 573, // Giả định
          completedOrders: completedOrders.length,
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStats();
  }, []);

  interface StatCardProps {
    title: string;
    value: number | string;
    subtext?: string;
    icon: React.ComponentType<{ className?: string }>;
    className?: string;
  }

  const StatCard: React.FC<StatCardProps> = ({ title, value, subtext, icon: Icon, className = "" }) => (
    <Card className="bg-white border border-gray-300 rounded-2xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <div className="flex flex-row justify-between">
              <p className="text-sm text-black font-semibold">{title}</p>
              <div className={`${className}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <div className="flex items-baseline space-x-2">
              <p className="text-2xl font-bold">{value}</p>
              {subtext && (
                <span className="text-sm text-gray-500">
                  {subtext}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="border border-gray-300 p-4 bg-white">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-4">
        <StatCard
          title="Tổng doanh thu"
          value={`${stats.totalRevenue.toLocaleString()} VNĐ`}
          icon={DollarSign}
          className="text-black"
        />
        <StatCard
          title="Số người đăng ký"
          value={stats.subscriptions.toLocaleString()}
          icon={Users}
          className="text-black"
        />
        <StatCard
          title="Đơn hàng thành công"
          value={stats.sales.toLocaleString()}
          // subtext="+19% so với tháng trước"
          icon={ShoppingCart}
          className="text-black"
        />

      </div>
      <Card className="border border-gray-300 rounded-2xl">
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>Biểu đồ thống kê</CardTitle>
            <CardDescription>
              Thống kê doanh số và người dùng mới trong 3 tháng qua
            </CardDescription>
          </div>
          <div className="flex">
            {["revenue", "newUser"].map((key) => {
              const chart = key as keyof typeof chartConfig
              return (
                <button
                  key={chart}
                  data-active={activeChart === chart}
                  className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6 text-center"
                  onClick={() => setActiveChart(chart)}
                >
                  <span className="text-xs text-muted-foreground font-semibold">
                    {chartConfig[chart].label}
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    {total[key as keyof typeof total].toLocaleString()}
                  </span>
                </button>
              )
            })}
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("vi-VN", {
                    month: "short",
                    day: "numeric",
                  })
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="views"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("vi-VN", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    }}
                  />
                }
              />
              <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>

  )
}

export default StatisticsManagement;
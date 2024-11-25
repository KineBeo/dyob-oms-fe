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

export function StatisticsManagement() {
  const [chartData, setChartData] = React.useState<any[]>([]);
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
            const dailyTotals = orders.reduce((acc: any, order: any) => {
                const orderDate = new Date(order.createdAt);
                if (orderDate >= threeMonthsAgo) {
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
            users.forEach((user: any) => {
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
                .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

            setChartData(processedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchAndProcessData();
}, []);

  return (
    <Card>
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
  )
}

export default StatisticsManagement;
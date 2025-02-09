// Thêm interface cho dữ liệu thống kê hàng tháng


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import toast from "react-hot-toast";
import {
  BarChart2,
  CalendarDays,
} from "lucide-react";
import Loading from "../Loading";
import { userStatusService } from "@/utils/user-status/userStatus";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface MonthlyStats {
  month: number;
  year: number;
  personalSales: number;
  commission: number;
  bonus: number;
  dailyData: Array<{ date: string; amount: number }>;
}

const Statistics = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [stats, setStats] = useState<MonthlyStats | null>(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchStats = async () => {
  //     if (!user?.id) return;
  //     setLoading(true);
  //     try {
  //       const data = await userStatusService.getMonthlyStats(
  //         user.id,
  //         selectedDate.getMonth() + 1,
  //         selectedDate.getFullYear()
  //       );
  //       setStats(data);
  //     } catch (error) {
  //       toast.error("Không thể tải dữ liệu thống kê");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchStats();
  // }, [selectedDate, user?.id]);
   const generateSampleData = (month: number, year: number): MonthlyStats => {
     const daysInMonth = new Date(year, month, 0).getDate();
     const dailyData = Array.from({ length: daysInMonth }, (_, i) => ({
       date: `${year}-${month.toString().padStart(2, "0")}-${(i + 1)
         .toString()
         .padStart(2, "0")}`,
       amount: Math.floor(Math.random() * 5000000) + 1000000,
     }));

     return {
       month,
       year,
       personalSales: dailyData.reduce((sum, day) => sum + day.amount, 0),
       commission: Math.floor(Math.random() * 5000000) + 2000000,
       bonus: Math.floor(Math.random() * 3000000) + 1000000,
       dailyData,
     };
   };

   useEffect(() => {
     setLoading(true);
     const timeout = setTimeout(() => {
       const sampleData = generateSampleData(
         selectedDate.getMonth() + 1,
         selectedDate.getFullYear()
       );
       setStats(sampleData);
       setLoading(false);
     }, 800);

     return () => clearTimeout(timeout);
   }, [selectedDate]);

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month] = e.target.value.split("-");
    setSelectedDate(new Date(parseInt(year), parseInt(month) - 1));
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      {/* Month Picker */}
      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold">Chọn tháng</h3>
            </div>
            <input
              type="month"
              value={`${selectedDate.getFullYear()}-${(
                selectedDate.getMonth() + 1
              )
                .toString()
                .padStart(2, "0")}`}
              onChange={handleMonthChange}
              className="border rounded-lg px-4 py-2"
            />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-600 font-medium">
                Doanh số cá nhân
              </p>
              <p className="text-2xl font-bold text-blue-700 mt-2">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(stats?.personalSales || 0)}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-green-600 font-medium">Hoa hồng</p>
              <p className="text-2xl font-bold text-green-700 mt-2">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(stats?.commission || 0)}
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-600 font-medium">Thưởng</p>
              <p className="text-2xl font-bold text-purple-700 mt-2">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(stats?.bonus || 0)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              
              Chi tiết doanh số hàng ngày
            </h3>

            <div className="divide-y border rounded-lg">
              {stats?.dailyData.map((day) => (
                <div 
                  key={day.date}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        Ngày {new Date(day.date).getDate()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(day.date).toLocaleDateString('vi-VN', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <p className="font-semibold text-green-600">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(day.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Chi tiết hoa hồng tháng {stats?.month}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ngày</TableHead>
                <TableHead>Doanh số</TableHead>
                <TableHead>Hoa hồng cá nhân</TableHead>
                <TableHead>Thưởng</TableHead>
                <TableHead>Tổng cộng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats?.dailyData.map((day) => (
                <TableRow key={`${day.date}-${day.amount}`}>
                  <TableCell> {day.date}</TableCell>
                  <TableCell>
                    {" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(day?.amount || 0)}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(day?.amount || 0)}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(day?.amount || 0)}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(day?.amount || 0)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* Chart */}
      {/* <Card className="border border-gray-200">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <BarChart2 className="w-5 h-5" />
            Biểu đồ thống kê tháng {selectedDate.getMonth() + 1}
          </h3>

          <div className="h-80">
            {stats?.dailyData ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) =>
                      new Date(date).getDate().toString()
                    }
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [
                      new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(Number(value)),
                      "Doanh thu",
                    ]}
                  />
                  <Bar
                    dataKey="amount"
                    fill="#3b82f6"
                    name="Doanh thu hàng ngày"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Không có dữ liệu để hiển thị
              </div>
            )}
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default Statistics
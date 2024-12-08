import { orderService } from "@/utils/order/orderApi";
import { userService } from "@/utils/user/userApi";
import { Card } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { CardContent } from "../ui/card";

const Overview = () => {
    interface OverviewData {
        label: string;
        value: number;
    }

    const [overviewData, setOverviewData] = useState<OverviewData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orders = await orderService.getAllOrders();
                const users = await userService.getAll();
                const totalRevenue = orders.reduce((sum: number, order: { total_amount: string }) => sum + Number(order.total_amount), 0);
                setOverviewData([
                    { label: 'Tổng người dùng', value: users.length },
                    { label: 'Đơn hàng mới', value: orders.length },
                    { label: 'Doanh số', value: totalRevenue },
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const formatNumberWithDots = (number: string): string => {
        // Convert the number to a string and split into integer and decimal parts
        const parts = number.toString().split('.');

        // Format the integer part with dots
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        // Join back the parts (in case there were decimal places)
        return parts.join(',');
    };


    return (
        <div className="space-y-6">
            <h2 className="font-bold text-2xl text-gray-800">Tổng quan hệ thống</h2>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
                <Card>
                    <CardContent className="p-6">
                        <h3 className="font-medium text-gray-700">Tổng người dùng</h3>
                        <p className="font-bold text-2xl text-blue-600">{overviewData.find(data => data.label === 'Tổng người dùng')?.value}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <h3 className="font-medium text-gray-700">Đơn hàng mới</h3>
                        <p className="font-bold text-2xl text-green-600">{overviewData.find(data => data.label === 'Đơn hàng mới')?.value}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <h3 className="font-medium text-gray-700">Doanh thu</h3>
                        <p className="font-bold text-2xl text-purple-600">{formatNumberWithDots((overviewData.find(data => data.label === 'Doanh số')?.value || 0).toString())} VNĐ</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Overview;
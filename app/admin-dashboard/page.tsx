'use client'

import { useEffect, useState } from "react";
import { CardTitle, CardContent } from "@/components/ui/card";
import { Card, CardHeader, Button } from "@nextui-org/react";
import { ChevronLeft, ChevronRight, LogOut, Settings, User, LayoutDashboard, Users, ShoppingCart, FileText, Menu } from "lucide-react";
import UserManagement from "@/components/admin-dashboard/UserManagement";
import OrderManagement from "@/components/admin-dashboard/OrderManagement";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import StatisticsManagement from "@/components/admin-dashboard/StatisticsManagement";
import { orderService } from "@/utils/order/orderApi";
import { userService } from "@/utils/user/userApi";
import Overview from "@/components/admin-dashboard/Overview";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const DashboardLayout = () => {
    const [activeTab, setActiveTab] = useState('welcome');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const user = useSelector((state: RootState) => state.auth.user);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/404');
        } else if (user.role !== 'ADMIN') {
            router.push('/404');
        }
    }, [user, router]);

    if (!user || user.role !== 'ADMIN') {
        return <Loading />;
    }

    const menuItems = [
        { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Trang chủ' },
        { id: 'users', icon: <Users size={20} />, label: 'Quản lý users' },
        { id: 'orders', icon: <ShoppingCart size={20} />, label: 'Đơn hàng' },
        { id: 'reports', icon: <FileText size={20} />, label: 'Thống kê' },
        { id: 'settings', icon: <Settings size={20} />, label: 'Cài đặt' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'welcome':
                return (
                    <div className="space-y-6 text-center">
                        <h1 className="font-bold text-4xl text-gray-800">Chào mừng đến với Dashboard</h1>
                        <p className="text-gray-600 text-xl">Vui lòng chọn một mục từ menu để xem thông tin chi tiết</p>
                        <Card className="mx-auto max-w-sm">
                            <CardHeader>
                                <CardTitle>Thông tin người dùng</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">
                                    Đang đăng nhập với tư cách <span className="font-semibold">{user?.fullname}</span>
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                );
            case 'dashboard':
                return <Overview />;
            case 'orders':
                return <OrderManagement />;
            case 'users':
                return <UserManagement />;
            case 'reports':
                return <StatisticsManagement />;
            default:
                return (
                    <div className="p-6 text-center">
                        <h2 className="font-bold text-2xl text-gray-800">
                            {menuItems.find(item => item.id === activeTab)?.label || 'Không tìm thấy trang'}
                        </h2>
                        <p className="mt-4 text-gray-600">
                            Nội dung đang được phát triển...
                        </p>
                    </div>
                );
        }
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <aside className={`bg-[#f7efe4] shadow-lg transition-all duration-300 
                ${isSidebarOpen ? 'w-64' : 'w-0 md:w-16'} overflow-hidden relative`}>
                {/* Sidebar Toggle Button at the Top */}
                <div className="top-2 right-2 z-10 absolute">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
                        title={isSidebarOpen ? "Thu gọn menu" : "Mở rộng menu"}
                    >
                        <Menu size={24} />
                    </button>
                </div>

                {/* User Profile Section */}
                <div className={`p-6 border-b ${!isSidebarOpen && 'md:p-4'}`}>
                    <div className="flex items-center space-x-4">
                        <div className={`transition-opacity duration-300 ${!isSidebarOpen && 'md:hidden'}`}>
                            <h3 className="font-medium text-gray-900">{user?.fullname}</h3>
                            <p className="text-gray-500 text-sm">{user?.role}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="p-4">
                    <ul className="space-y-2">
                        {menuItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => setActiveTab(item.id)}
                                    className={`flex items-center w-full p-2 rounded-lg transition-colors
                                        ${activeTab === item.id
                                            ? 'bg-[#dc2626] text-gray-100'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    title={!isSidebarOpen ? item.label : ''}
                                >
                                    <span className="shrink-0">{item.icon}</span>
                                    <span className={`ml-3 transition-opacity duration-300 
                                        ${!isSidebarOpen && 'md:hidden'}`}>
                                        {item.label}
                                    </span>
                                </button>
                            </li>
                        ))}
                        <li>
                            <button className="flex items-center hover:bg-gray-100 p-2 rounded-lg w-full text-gray-700">
                                <LogOut className="shrink-0" />
                                <span className={`ml-3 transition-opacity duration-300 
                                    ${!isSidebarOpen && 'md:hidden'}`}>
                                    Đăng xuất
                                </span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
                {/* Header */}
                <div className="bg-white shadow-sm p-4 border-b">
                    <h1 className="inline-block ml-4 font-semibold text-gray-800 text-xl">
                        {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                    </h1>
                </div>

                <div className="p-8">
                    <div className="mx-auto max-w-7xl">
                        {renderContent()}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
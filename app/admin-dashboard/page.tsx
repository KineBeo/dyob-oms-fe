'use client'

import { useState } from "react";
import { CardTitle, CardContent } from "@/components/ui/card";
import { Card, CardHeader, Button } from "@nextui-org/react";
import { ChevronLeft, ChevronRight, LogOut, Settings, User, LayoutDashboard, Users, ShoppingCart, FileText, Menu } from "lucide-react";
import UserManagement from "@/components/admin-dashboard/UserManagement";

const DashboardLayout = () => {
    const [activeTab, setActiveTab] = useState('welcome');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const user = {
        name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        role: "Admin",
        avatar: "/api/placeholder/40/40"
    };

    const menuItems = [
        { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Trang chủ' },
        { id: 'users', icon: <Users size={20} />, label: 'Quản lý users' },
        { id: 'orders', icon: <ShoppingCart size={20} />, label: 'Đơn hàng' },
        { id: 'reports', icon: <FileText size={20} />, label: 'Báo cáo' },
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
                                    Đang đăng nhập với tư cách <span className="font-semibold">{user.name}</span>
                                </p>
                                <p className="text-gray-500 text-sm">{user.email}</p>
                            </CardContent>
                        </Card>
                    </div>
                );
            case 'dashboard':
                return (
                    <div className="space-y-6">
                        <h2 className="font-bold text-2xl text-gray-800">Tổng quan hệ thống</h2>
                        <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-medium text-gray-700">Tổng người dùng</h3>
                                    <p className="font-bold text-2xl text-blue-600">1,234</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-medium text-gray-700">Đơn hàng mới</h3>
                                    <p className="font-bold text-2xl text-green-600">56</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-medium text-gray-700">Doanh thu</h3>
                                    <p className="font-bold text-2xl text-purple-600">$12,345</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                );
            case 'users':
                return <UserManagement />;
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
                ${isSidebarOpen ? 'w-64' : 'w-0 md:w-16'} overflow-hidden`}>
                {/* User Profile Section */}
                <div className={`p-6 border-b ${!isSidebarOpen && 'md:p-4'}`}>
                    <div className="flex items-center space-x-4">
                        <img
                            src={user.avatar}
                            alt="User avatar"
                            className="rounded-full w-10 h-10 shrink-0"
                        />
                        <div className={`transition-opacity duration-300 ${!isSidebarOpen && 'md:hidden'}`}>
                            <h3 className="font-medium text-gray-900">{user.name}</h3>
                            <p className="text-gray-500 text-sm">{user.role}</p>
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
                                            ? 'bg-gray-200 text-gray-900'
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
                {/* Header with toggle button */}
                <div className="bg-white shadow-sm p-4 border-b">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
                        title={isSidebarOpen ? "Thu gọn menu" : "Mở rộng menu"}
                    >
                        <Menu size={24} />
                    </button>
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
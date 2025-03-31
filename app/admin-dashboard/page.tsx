'use client';
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    LayoutDashboard,
    Users,
    PackageOpen,
    ShoppingCart,
    Settings,
    LogOut,
    TrendingUp,
    UserPlus
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/Loading";

// Import components
import UserManagement from "@/components/admin-dashboard/UserManagement";
import OrderManagement from "@/components/admin-dashboard/OrderManagement";
import StatisticsManagement from "@/components/admin-dashboard/StatisticsManagement";
import ProductsManagement from "@/components/admin-dashboard/ProductsManagement";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import { Avatar } from "@nextui-org/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import CommissionHistoryManagement from "@/components/admin-dashboard/CommissionHistoryManagement";
import TransactionDashboard from "@/components/admin-dashboard/BalanceManagement";
import CommissionDashboard from "@/components/admin-dashboard/CommissionHistory";
import CreateUsers from "@/components/admin-dashboard/CreateUsers";

const DashboardLayout = () => {
    // Sử dụng URL search params để lưu trạng thái tab
    const searchParams = useSearchParams();
    const initialTab = searchParams?.get('tab') || 'welcome';
    const initialPage = parseInt(searchParams?.get('page') || '1');
    const [activeTab, setActiveTab] = useState(initialTab);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const user = useSelector((state: RootState) => state.auth.user);
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(() =>
        parseInt(searchParams?.get('page') || '1')
    );

    // Single consolidated useEffect for authentication, URL management, and initial checks
    useEffect(() => {
        // Authentication check
        if (!user) {
            router.push('/404');
            return;
        }

        if (user.role !== 'ADMIN') {
            router.push('/404');
            return;
        }

        // Update URL with current tab and page
        const url = new URL(window.location.href);
        url.searchParams.set('tab', activeTab);
        url.searchParams.set('page', currentPage.toString());
        window.history.replaceState({}, '', url.toString());
    }, [user, router, activeTab, currentPage]);

    // Early return for loading state
    if (!user || user.role !== 'ADMIN') {
        return <Loading />;
    }

    const menuItems = [
        {
            label: 'Tổng quan',
            href: '#dashboard',
            icon: <LayoutDashboard className="flex-shrink-0 w-6 h-6 text-neutral-700 dark:text-neutral-200" />,
            id: 'dashboard'
        },
        {
            label: 'Thống kê chi tiết',
            href: '#statistics',
            icon: <TrendingUp className="flex-shrink-0 w-6 h-6 text-neutral-700 dark:text-neutral-200" />,
            id: 'statistics'
        },
        {
            label: 'Quản lý người dùng',
            href: '#users',
            icon: <Users className="flex-shrink-0 w-6 h-6 text-neutral-700 dark:text-neutral-200" />,
            id: 'users'
        },
        {
            label: 'Quản lý sản phẩm',
            href: '#products',
            icon: <PackageOpen className="flex-shrink-0 w-6 h-6 text-neutral-700 dark:text-neutral-200" />,
            id: 'products'
        },
        {
            label: 'Quản lý đơn hàng',
            href: '#orders',
            icon: <ShoppingCart className="flex-shrink-0 w-6 h-6 text-neutral-700 dark:text-neutral-200" />,
            id: 'orders'
        },
        {
            label: 'Quản lý lịch sử hoa hồng từng tháng',
            href: '#commission-history',
            icon: <LayoutDashboard className="flex-shrink-0 w-6 h-6 text-neutral-700 dark:text-neutral-200" />,
            id: 'commission-history'
        }, {
            label: 'Tạo người dùng',
            href: '#create-users',
            icon: <UserPlus className="flex-shrink-0 w-6 h-6 text-neutral-700 dark:text-neutral-200" />,
            id: 'create-users'
        }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'welcome':
                return (
                    <div className="space-y-6 text-center">
                        <h1 className="font-bold text-gray-800 text-4xl">Chào mừng đến với bảng điều khiển</h1>
                        <p className="text-gray-600 text-xl">Vui lòng chọn một mục từ menu để xem thông tin chi tiết</p>
                        <Card className="mx-auto max-w-sm">
                            <CardHeader className="justify-center items-center">
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
                return <StatisticsManagement />;
            case 'statistics':
                return <TransactionDashboard />;
            case 'orders':
                return <OrderManagement />;
            case 'products':
                return <ProductsManagement />;
            case 'users':
                return <UserManagement
                    initialPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                />;
            case 'commission-history':
                return <CommissionDashboard />;
            case 'create-users':
                return <CreateUsers />;
            default:
                return (
                    <div className="p-6 text-center">
                        <h2 className="font-bold text-gray-800 text-2xl">
                            {menuItems.find(item => item.id === activeTab)?.label || 'Không tìm thấy trang'}
                        </h2>
                        <p className="mt-4 text-gray-600">
                            Nội dung đang được phát triển...
                        </p>
                    </div>
                );
        }
    };

    const handleLinkClick = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        setIsSidebarOpen(false);
        setActiveTab(id);
    };

    return (
        <div className={cn(
            "rounded-md flex flex-col md:flex-row bg-gray-100 w-full flex-1 mx-auto border border-neutral-200 overflow-hidden",
            "h-full" // for your use case, use `h-screen` instead of `h-[60vh]`
        )}>
            <div>
                <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} >
                    <SidebarBody className="justify-between gap-10 border border-gray-300">
                        <div className="flex flex-col flex-1">
                            {isSidebarOpen ? <Logo name={user.role} /> : <LogoIcon />}

                            <div className="flex flex-col gap-2 mt-8">
                                {menuItems.map((item) => (
                                    <SidebarLink
                                        key={item.id}
                                        link={{
                                            label: item.label,
                                            href: item.href,
                                            icon: item.icon
                                        }}
                                        className={`${activeTab === item.id
                                            ? 'text-white hover:bg-gray-300 font-bold'
                                            : 'hover:bg-gray-200'
                                            } rounded-lg`}
                                        onClick={handleLinkClick(item.id)}
                                    />
                                ))}
                            </div>
                        </div>
                        <SidebarLink
                            className="font-bold text-2xl"
                            link={{
                                label: user.fullname,
                                href: "#",
                                icon: (
                                    <Image
                                        src="/images/logo-image.png"
                                        className="flex-shrink-0 rounded-full w-10 h-10"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                    </SidebarBody>
                </Sidebar>
            </div>


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

const Logo = ({ name }: { name: string }) => {
    return (
        <Link
            href="#"
            className="z-20 relative flex items-center space-x-2 py-1 font-normal text-black text-sm"
        >
            <div className="hover:scale-110 transition duration-250">
                <Avatar
                    src="/images/logo-image.png"
                    size="md"
                    className="animate-shake hover:cursor-pointer"
                />

            </div>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre"
            >
                {name}
            </motion.span>
        </Link>
    );
};
const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="z-20 relative flex items-center space-x-2 py-1 font-normal text-black text-sm"
        >
            <div className="hover:scale-110 transition duration-250">
                <Avatar
                    src="/images/logo-image.png"
                    size="md"
                    className="animate-shake hover:cursor-pointer"
                />
            </div>
        </Link>
    );
};
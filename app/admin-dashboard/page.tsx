'use client';
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    LayoutDashboard,
    Users,
    PackageOpen,
    ShoppingCart,
    Settings,
    LogOut
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
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
        {
            label: 'Thống kê tổng quan',
            href: '#dashboard',
            icon: <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />,
            id: 'dashboard'
        },
        {
            label: 'Quản lý người dùng',
            href: '#users',
            icon: <Users className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />,
            id: 'users'
        },
        {
            label: 'Quản lý sản phẩm',
            href: '#products',
            icon: <PackageOpen className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />,
            id: 'products'
        },
        {
            label: 'Quản lý đơn hàng',
            href: '#orders',
            icon: <ShoppingCart className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />,
            id: 'orders'
        },
        {
            label: 'Cài đặt',
            href: '#settings',
            icon: <Settings className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />,
            id: 'settings'
        },
        // {
        //     label: 'Đăng xuất',
        //     href: '/logout',
        //     icon: <LogOut className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />,
        //     id: 'logout'
        // }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'welcome':
                return (
                    <div className="space-y-6 text-center">
                        <h1 className="font-bold text-4xl text-gray-800">Chào mừng đến với bảng điều khiển</h1>
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
            case 'orders':
                return <OrderManagement />;
            case 'products':
                return <ProductsManagement />;
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

    const handleLinkClick = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        // if (id === 'logout') {
        //     // Handle logout logic here
        //     return;
        // }
        setActiveTab(id);
    };

    return (
        <div className={cn(
            "rounded-md flex flex-col md:flex-row bg-gray-100 w-full flex-1 mx-auto border border-neutral-200 overflow-hidden",
            "h-full" // for your use case, use `h-screen` instead of `h-[60vh]`
        )}>
            <div>
            <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen}>
                <SidebarBody className="justify-between gap-10 border border-gray-300">
                    <div className="flex flex-col flex-1">
                        {isSidebarOpen ? <Logo name={user.role} /> : <LogoIcon />}

                        <div className="mt-8 flex flex-col gap-2">
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
                                    className="h-10 w-10 flex-shrink-0 rounded-full"
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
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="hover:scale-110 transition duration-250">
                <Avatar
                    src="/images/logo-image.png"
                    size="md"
                    className="hover:cursor-pointer animate-shake"
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
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="hover:scale-110 transition duration-250">
                <Avatar
                    src="/images/logo-image.png"
                    size="md"
                    className="hover:cursor-pointer animate-shake"
                />
            </div>
        </Link>
    );
};
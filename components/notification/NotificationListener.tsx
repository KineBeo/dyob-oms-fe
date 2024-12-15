'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Bell, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import io from 'socket.io-client';
import { notificationService } from '@/utils/notification/notification';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Định nghĩa interface cho Notification
interface Notification {
    id: number;
    message: string;
    isRead: boolean;
    createdAt: string;
    user?: {
        id: number;
        fullname?: string;
    };
    type?: 'order' | 'alert' | 'info';
}

export default function NavbarNotificationPanel() {
    // Lấy trạng thái xác thực và thông tin người dùng từ Redux
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    // State quản lý notifications
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Animation variants cho notifications
    const notificationVariants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300 } },
        exit: { opacity: 0, x: -50, transition: { duration: 0.2 } }
    };

    // Fetch initial notifications
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const apiNotifications = await notificationService.getNotification();
                setNotifications(apiNotifications);
            } catch (error) {
                console.error('Failed to fetch notifications', error);
                toast.error('Không thể tải thông báo');
            }
        };

        if (isAuthenticated) {
            fetchNotifications();
        }
    }, [isAuthenticated]);

    // Đóng dropdown khi click ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Kết nối Socket cho notifications real-time
    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'ADMIN') return;

        const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || '', {
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        });

        socket.on('newOrder', (order) => {
            const newNotification: Notification = {
                id: order.id,
                message: `Đơn hàng mới từ ${order.user?.fullname || 'Khách hàng'}, giá trị ${order.total_amount}`,
                isRead: false,
                createdAt: new Date().toISOString(),
                type: 'order',
                user: order.user
            };

            // Hiển thị toast notification
            toast.success(newNotification.message, {
                icon: '🎉',
                duration: 4000,
                position: 'top-right'
            });

            // Thêm notification mới vào danh sách
            setNotifications(prev => [newNotification, ...prev]);
        });

        return () => {
            socket.disconnect();
        };
    }, [isAuthenticated, user]);

    // Nếu chưa đăng nhập thì không hiển thị
    if (!isAuthenticated) return null;

    // Đếm số lượng notification chưa đọc
    const unreadCount = notifications.filter((notification) => !notification.isRead).length;

    // Đánh dấu notification đã đọc
    const markAsRead = async (id: number) => {
        try {
            await notificationService.markAsRead(id);
            setNotifications((prev) =>
                prev.map((notification) =>
                    notification.id === id ? { ...notification, isRead: true } : notification
                )
            );
        } catch (error) {
            console.error('Failed to mark notification as read', error);
            toast.error('Không thể đánh dấu thông báo');
        }
    };

    // Xóa tất cả notifications
    const clearAllNotifications = () => {
        try {
            // Gọi API xóa tất cả notifications nếu cần
            setNotifications([]);
            toast.success('Đã xóa tất cả thông báo');
        } catch (error) {
            console.error('Failed to clear notifications', error);
            toast.error('Không thể xóa thông báo');
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Notification Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative bg-[#FBF6EC] p-2 rounded-full font-medium text-text-brown-primary laptop:text-lg desktop:text-lg hover:text-[#D7A444] transition duration-400 cursor-pointer hover:scale-125"
            >
                <Bell size={24} />
                {unreadCount > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="-top-1 -right-1 absolute bg-red-500 px-1.5 py-0.5 rounded-full text-white text-xs"
                    >
                        {unreadCount}
                    </motion.span>
                )}
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="right-0 z-50 absolute bg-white shadow-lg mt-2 border rounded-lg w-80"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center bg-gray-100 p-3 border-b">
                            <h3 className="font-semibold text-lg">Thông báo</h3>
                            {notifications.length > 0 && (
                                <button
                                    onClick={clearAllNotifications}
                                    className="hover:bg-red-100 p-1 rounded text-red-500 text-sm"
                                >
                                    Xóa tất cả
                                </button>
                            )}
                        </div>

                        {/* Notifications List */}
                        <div className="max-h-[300px] overflow-y-auto">
                            <AnimatePresence>
                                {notifications.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="py-4 text-center text-gray-500"
                                    >
                                        Không có thông báo mới
                                    </motion.div>
                                ) : (
                                    notifications.map((notification) => (
                                        <motion.div
                                            key={notification.id}
                                            variants={notificationVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            className={`flex justify-between items-center hover:bg-gray-50 p-3 border-b cursor-pointer ${notification.isRead ? 'bg-gray-100' : ''}`}
                                            onClick={() => markAsRead(notification.id)}
                                        >
                                            <div className="flex-grow">
                                                <p className="text-sm">{notification.message}</p>
                                                <span className="text-gray-500 text-xs">
                                                    {new Date(notification.createdAt).toLocaleString()}
                                                </span>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setNotifications((prev) =>
                                                        prev.filter((notif) => notif.id !== notification.id)
                                                    );
                                                }}
                                                className="ml-2 text-gray-400 hover:text-red-500"
                                            >
                                                <X size={16} />
                                            </button>
                                        </motion.div>
                                    ))
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
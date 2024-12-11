'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Bell, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import io from 'socket.io-client';
import { notificationService } from '@/utils/notification/notification';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

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
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Fetch initial notifications from API
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const apiNotifications = await notificationService.getNotification();
                // console.log('apiNotifications', apiNotifications);
                setNotifications(apiNotifications);
            } catch (error) {
                console.error('Failed to fetch notifications', error);
            }
        };

        if (isAuthenticated) {
            fetchNotifications();
        }
    }, [isAuthenticated]);

    // Close dropdown when clicking outside
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

    // Socket connection for real-time notifications
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
            toast.success(newNotification.message, { icon: '🎉' });

            setNotifications(prev => [newNotification, ...prev]);
        });

        return () => {
            socket.disconnect();
        };
    }, [isAuthenticated, user]);

    if (!isAuthenticated) return null;

    const unreadCount = notifications.filter((notification) => !notification.isRead).length;

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
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Notification Trigger */}
            <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative bg-[#FBF6EC] p-2 rounded-full font-medium text-text-brown-primary laptop:text-lg desktop:text-lg hover:text-[#D7A444] hover:scale-125 transition duration-400 cursor-pointer"
            >
            <Bell size={24} />
            {unreadCount > 0 && (
                <span className="-top-1 -right-1 absolute bg-red-500 px-1.5 py-0.5 rounded-full text-white text-xs">
                {unreadCount}
                </span>
            )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
            <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 10 }}
                exit={{ opacity: 0, y: -10 }}
                className="right-0 z-50 absolute bg-white shadow-lg mt-2 border rounded-lg w-80 transition duration-500"
            >
                {/* Header */}
                <div className="flex justify-between items-center bg-gray-100 p-3 border-b">
                <h3 className="font-semibold text-lg">Thông báo</h3>
                {notifications.length > 0 && (
                    <button
                    onClick={() => setNotifications([])}
                    className="hover:bg-red-100 p-1 rounded text-red-500 text-sm"
                    >
                    Xóa tất cả
                    </button>
                )}
                </div>

                {/* Notifications List */}
                <div className="max-h-[300px] overflow-y-auto">
                {notifications.length === 0 ? (
                    <div className="py-4 text-center text-gray-500">
                    Không có thông báo mới
                    </div>
                ) : (
                    notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`flex justify-between items-center hover:bg-gray-50 p-3 border-b ${notification.isRead ? 'bg-gray-100' : ''}`}
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
                    </div>
                    ))
                )}
                </div>
            </motion.div>
            )}
        </div>
    );
}

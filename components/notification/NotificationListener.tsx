'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Bell, X, ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import io from 'socket.io-client';
import { notificationService } from '@/utils/notification/notification';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure
} from "@nextui-org/react";

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
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Animation variants
    const notificationVariants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300 } },
        exit: { opacity: 0, x: -50, transition: { duration: 0.2 } }
    };

    // Fetch initial notifications (keep existing)
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

    // Socket connection (keep existing)
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

            toast.success(newNotification.message, {
                icon: '🎉',
                duration: 4000,
                position: 'top-right'
            });

            setNotifications(prev => [newNotification, ...prev]);
        });

        return () => {
            socket.disconnect();
        };
    }, [isAuthenticated, user]);

    // Outside click handler (keep existing)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!isAuthenticated) return null;

    // Count unread notifications
    const unreadCount = notifications.filter((notification) => !notification.isRead).length;

    // Mark notification as read
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

    // Delete a specific notification
    const deleteNotification = async (id: number) => {
        try {
            await notificationService.deleteNotification(id);
            setNotifications((prev) => prev.filter((notification) => notification.id !== id));
            toast.success('Đã xóa thông báo');
        } catch (error) {
            console.error('Failed to delete notification', error);
            toast.error('Không thể xóa thông báo');
        }
    };

    // Clear all notifications
    const clearAllNotifications = async () => {
        try {
            await notificationService.clearAllNotifications();
            setNotifications([]);
            toast.success('Đã xóa tất cả thông báo');
            onOpenChange();
        } catch (error) {
            console.error('Failed to clear notifications', error);
            toast.error('Không thể xóa thông báo');
        }
    };

    return (
        <div className="relative flex items-center space-x-4" ref={dropdownRef}>
            {/* Desktop Notification Trigger */}
            <div className="desktop:block laptop:block hidden">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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

                {/* Desktop Dropdown Menu */}
                <AnimatePresence>
                    {isDropdownOpen && (
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
                                                className={`flex justify-between items-center p-3 border-b cursor-pointer 
                                                    ${notification.isRead
                                                        ? 'bg-gray-50 text-gray-500'
                                                        : 'bg-white text-black font-semibold'}`}
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
                                                        deleteNotification(notification.id);
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

            {/* Mobile Notification Trigger */}
            <div className="desktop:hidden laptop:hidden">
                <button
                    onClick={onOpen}
                    className="relative bg-[#FBF6EC] p-2 rounded-full font-medium text-text-brown-primary mobile:text-md hover:text-[#D7A444] transition duration-400 cursor-pointer"
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

                {/* Mobile Modal */}
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    scrollBehavior="inside"
                    size="full"
                    placement="bottom"
                    className="rounded-t-3xl h-[90vh]"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex justify-between items-center">
                                    <h3 className="font-semibold text-lg">Thông báo</h3>
                                    {notifications.length > 0 && (
                                        <Button
                                            color="danger"
                                            variant="light"
                                            onClick={clearAllNotifications}
                                        >
                                            Xóa tất cả
                                        </Button>
                                    )}
                                </ModalHeader>
                                <ModalBody>
                                    {notifications.length === 0 ? (
                                        <div className="mt-10 text-center text-gray-500">
                                            Không có thông báo mới
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {notifications.map((notification) => (
                                                <div
                                                    key={notification.id}
                                                    className={`p-3 rounded-lg border cursor-pointer 
                                                        ${notification.isRead
                                                            ? 'bg-gray-50 text-gray-500'
                                                            : 'bg-white text-black font-semibold border-[#D7A444]'}`}
                                                    onClick={() => {
                                                        markAsRead(notification.id);
                                                        onClose();
                                                    }}
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex-grow">
                                                            <p className="text-sm">{notification.message}</p>
                                                            <span className="block mt-1 text-gray-500 text-xs">
                                                                {new Date(notification.createdAt).toLocaleString()}
                                                            </span>
                                                        </div>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                deleteNotification(notification.id);
                                                            }}
                                                            className="ml-2 text-gray-400 hover:text-red-500"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="default" variant="light" onPress={onClose}>
                                        Đóng
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
}
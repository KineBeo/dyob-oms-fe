'use client'
import { useEffect } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toast } from 'react-hot-toast';

export function NotificationListener() {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!isAuthenticated || !user) return;

        const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);

        socket.on('newOrder', (order) => {
            // Chỉ xử lý nếu là admin
            if (user.role === 'ADMIN') {
                console.log('New order received:', order);
                toast.success(`Bạn vừa có một đơn hàng mệnh giá ${order.total_amount}`, { icon: '🚀' });

                // Optional: Show browser notification
                // if ('Notification' in window && Notification.permission === 'granted') {
                //     new Notification(`New Order from ${order.user.fullname}`, {
                //         body: `Order #${order.id}`
                //     });
                // }

                if ('Notification' in window) {
                    if (Notification.permission === 'default') {
                        Notification.requestPermission().then((permission) => {
                            if (permission === 'granted') {
                                new Notification('You have enabled notifications!');
                            } else if (permission === 'denied') {
                                console.log('Notifications denied by user.');
                            }
                        });
                    } else if (Notification.permission === 'granted') {
                        new Notification('Notifications already enabled!');
                    } else {
                        console.log('Notification permission is denied.');
                    }
                }
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [isAuthenticated, user]);

    return null;
}

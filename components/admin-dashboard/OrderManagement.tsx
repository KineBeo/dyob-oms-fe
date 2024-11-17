import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Order, OrderStatus } from '@/interfaces/order';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'react-hot-toast';
import { orderService } from '@/utils/order/orderApi';

const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      if (user?.role !== 'ADMIN') {
        toast.error('Bạn không có quyền truy cập trang này');
        return;
      }

      const data = await orderService.getAllOrders();
      // Đảm bảo data hợp lệ trước khi set state
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        console.error('Invalid orders data received:', data);
        toast.error('Dữ liệu đơn hàng không hợp lệ');
      }
    } catch (error) {
      toast.error('Không thể tải danh sách đơn hàng');
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: OrderStatus) => {
    try {
      await orderService.updateOrderStatusAdmin(orderId, newStatus);
      toast.success('Cập nhật trạng thái đơn hàng thành công');
      fetchOrders();
    } catch (error) {
      toast.error('Không thể cập nhật trạng thái đơn hàng');
      console.error('Error updating order status:', error);
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price: string | undefined) => {
    if (!price) return 'N/A';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(Number(price));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quản lý đơn hàng</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              Chưa có đơn hàng nào
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn hàng</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Địa chỉ giao hàng</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Sản phẩm</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>#{order?.id || 'N/A'}</TableCell>
                    <TableCell>{formatDate(order?.createdAt)}</TableCell>
                    <TableCell>{formatPrice(order?.total_amount)}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {order?.snapshot_full_address || 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Select
                        defaultValue={order?.status}
                        onValueChange={(value: OrderStatus) =>
                          handleStatusChange(order.id, value)
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(OrderStatus).map((status) => (
                            <SelectItem key={status} value={status}>
                              {status === OrderStatus.NOT_START_YET
                                ? 'Chờ xử lý'
                                : status === OrderStatus.ON_GOING
                                ? 'Đang giao'
                                : 'Hoàn thành'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {order?.orderProduct?.map((item) => (
                          <div key={item?.id} className="text-sm">
                            {item?.product?.name || 'Sản phẩm không xác định'} x{' '}
                            {item?.quantity || 0}
                          </div>
                        )) || 'Không có sản phẩm'}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderManagement;
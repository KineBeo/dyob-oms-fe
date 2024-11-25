import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Order, OrderStatus } from '@/interfaces/order';
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { orderService } from '@/utils/order/orderApi';
import { RootState } from '@/store/store';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';

const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const { user } = useSelector((state: RootState) => state.auth);

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

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.NOT_START_YET:
        return 'Chờ xử lý';
      case OrderStatus.ON_GOING:
        return 'Đang giao';
      case OrderStatus.COMPLETED:
        return 'Hoàn thành';
      default:
        return status;
    }
  };

  const columns = useMemo<ColumnDef<Order>[]>(() => [
    {
      accessorKey: 'id',
      header: 'Mã đơn hàng',
      cell: ({ row }) => <span>#{row.getValue('id')}</span>,
    },
    {
      accessorKey: 'createdAt',
      header: 'Ngày tạo',
      cell: ({ row }) => formatDate(row.getValue('createdAt')),
    },
    {
      accessorKey: 'total_amount',
      header: 'Tổng tiền',
      cell: ({ row }) => formatPrice(row.getValue('total_amount')),
    },
    {
      accessorKey: 'snapshot_full_address',
      header: 'Địa chỉ giao hàng',
      cell: ({ row }) => (
        <div className="max-w-xs truncate">
          {row.getValue('snapshot_full_address') || 'N/A'}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: ({ row }) => (
        <Select
          defaultValue={row.getValue('status')}
          onValueChange={(value: OrderStatus) =>
            handleStatusChange(row.original.id, value)
          }
        >
          <SelectTrigger className="w-32">
            <SelectValue>{getStatusText(row.getValue('status'))}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Object.values(OrderStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {getStatusText(status)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <Button
          variant="outline"
          onClick={() => setSelectedOrder(row.original)}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ], []);

  const table = useReactTable({
    data: orders,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

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
          {/* Filters */}
          <div className="flex gap-4 mb-4">
            <Input
              placeholder="Tìm theo mã đơn hàng..."
              value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
              onChange={(event) =>
                table.getColumn('id')?.setFilterValue(event.target.value)
              }
              className="max-w-xs"
            />
            <Input
              placeholder="Tìm theo địa chỉ..."
              value={(table.getColumn('snapshot_full_address')?.getFilterValue() as string) ?? ''}
              onChange={(event) =>
                table.getColumn('snapshot_full_address')?.setFilterValue(event.target.value)
              }
              className="max-w-xs"
            />
            <Select
              value={(table.getColumn('status')?.getFilterValue() as string) ?? 'all'}
              onValueChange={(value) =>
                table.getColumn('status')?.setFilterValue(value === 'all' ? '' : value)
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                {Object.values(OrderStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    {getStatusText(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              Chưa có đơn hàng nào
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          className="cursor-pointer hover:bg-gray-50"
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          Không tìm thấy kết quả
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-2 py-4">
                <div className="flex-1 text-sm text-gray-500">
                  {table.getFilteredRowModel().rows.length} đơn hàng
                </div>
                <div className="flex items-center space-x-6 lg:space-x-8">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Số dòng mỗi trang</p>
                    <Select
                      value={`${table.getState().pagination.pageSize}`}
                      onValueChange={(value) => {
                        table.setPageSize(Number(value));
                      }}
                    >
                      <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue placeholder={table.getState().pagination.pageSize} />
                      </SelectTrigger>
                      <SelectContent side="top">
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                          <SelectItem key={pageSize} value={`${pageSize}`}>
                            {pageSize}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Trang {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng #{selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Tạo lúc: {formatDate(selectedOrder?.createdAt)}
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[600px]">
            <div className="space-y-6">
              {/* Thông tin khách hàng */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Thông tin khách hàng</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Tên người nhận</p>
                    <p>{selectedOrder?.snapshot_receiver_name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Số điện thoại</p>
                    <p>{selectedOrder?.snapshot_phone_number || 'N/A'}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Địa chỉ giao hàng</p>
                    <p>{selectedOrder?.snapshot_full_address || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Chi tiết đơn hàng */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Chi tiết sản phẩm</h3>
                <div className="space-y-4">
                  {selectedOrder?.orderProduct?.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{item?.product?.name}</p>
                        <p className="text-sm text-gray-500">
                          Số lượng: {item?.quantity}
                        </p>
                      </div>
                      <p className="font-medium">
                        {formatPrice(String(Number(item?.price) * Number(item?.quantity)))}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Tổng tiền */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">Tổng tiền</p>
                  <p className="text-sm text-gray-500">Đã bao gồm phí vận chuyển</p>
                </div>
                <p className="text-xl font-bold">
                  {formatPrice(selectedOrder?.total_amount)}
                </p>
              </div>

              {/* Trạng thái đơn hàng */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Trạng thái đơn hàng</h3>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-500">Trạng thái hiện tại:</p>
                  <p className="font-medium">
                    {getStatusText(selectedOrder?.status as OrderStatus)}
                  </p>
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderManagement;
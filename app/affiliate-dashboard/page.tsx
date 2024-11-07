'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { userStatusService } from '@/utils/user-status/userStatus';
import { orderService } from '@/utils/order/orderApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const UserStatusPage = () => {
  const [userStatus, setUserStatus] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const ordersPerPage = 3;
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user?.id) return;
        const statusData = await userStatusService.getUserStatusById(user.id);
        const ordersData = await orderService.getOrderByUserID(user.id);
        
        if (statusData) setUserStatus(statusData);
        if (ordersData) setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user?.id]);

  const totalPages = Math.ceil((orders?.length || 0) / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (!userStatus) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const OrderCard = ({ order }: { order: any }) => (
    <div className="p-4 bg-white rounded-lg border hover:shadow-lg transition-shadow">
      <div className="flex mobile:flex-col tablet:flex-row laptop:flex-row justify-between items-start mb-2">
        <p className="font-medium text-text-brown-primary">Mã đơn: #{order.id}</p>
        <p className="text-text-brown-primary mobile:mt-2 tablet:mt-0">
          {new Date(order.createdAt).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>
      <div className="grid mobile:grid-cols-1 tablet:grid-cols-2 gap-2 text-sm">
        <p className="text-text-brown-primary">Trạng thái: 
          <span className="ml-2 font-medium">{order.status}</span>
        </p>
        <p className="text-text-brown-primary">Địa chỉ: 
          <span className="ml-2 font-medium">{order.address}</span>
        </p>
      </div>
    </div>
  );

  const OrderRow = ({ order }: { order: any }) => (
    <div className="p-4 bg-white border-b hover:bg-gray-50 transition-colors">
      <div className="grid mobile:grid-cols-1 tablet:grid-cols-4 gap-4 items-center">
        <p className="font-medium text-text-brown-primary">#{order.id}</p>
        <p className="text-text-brown-primary">{order.status}</p>
        <p className="text-text-brown-primary truncate">{order.address}</p>
        <p className="text-text-brown-primary">
          {new Date(order.createdAt).toLocaleDateString('vi-VN')}
        </p>
      </div>
    </div>
  );

  return (
    <div className="mobile:px-2 tablet:px-4 laptop:container desktop:container mx-auto p-4 space-y-4 font-roboto">
      {/* Thông tin cơ bản */}
      <Card className="">
        <CardHeader>
          <CardTitle className="text-text-brown-primary mobile:text-lg tablet:text-xl laptop:text-2xl">
            Thông tin tài khoản
          </CardTitle>
        </CardHeader>
        <CardContent className="grid mobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-2 desktop:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-text-brown-primary">Mã giới thiệu</p>
            <p className="text-lg font-semibold mt-1">{userStatus.personal_referral_code}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-text-brown-primary">Cấp bậc</p>
            <p className="text-lg font-semibold mt-1">{userStatus.user_rank}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-text-brown-primary">Người giới thiệu</p>
            <p className="text-lg font-semibold mt-1">{userStatus.referrer_name || 'Chưa có'}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-text-brown-primary">Ngày đạt cấp bậc</p>
            <p className="text-lg font-semibold mt-1">{new Date(userStatus.rank_achievement_date).toLocaleDateString('vi-VN')}</p>
          </div>
        </CardContent>
      </Card>

      {/* Thống kê */}
      <Card className="">
        <CardHeader>
          <CardTitle className="text-text-brown-primary mobile:text-lg tablet:text-xl laptop:text-2xl">
            Thống kê
          </CardTitle>
        </CardHeader>
        <CardContent className="grid mobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border">
            <p className="text-sm font-medium text-blue-600">Tổng đơn hàng</p>
            <p className="mobile:text-xl tablet:text-2xl font-bold text-blue-700">
              {userStatus.total_orders}
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border">
            <p className="text-sm font-medium text-green-600">Tổng mua hàng</p>
            <p className="mobile:text-xl tablet:text-2xl font-bold text-green-700">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                .format(Number(userStatus.total_purchase))}
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border">
            <p className="text-sm font-medium text-purple-600">Tổng doanh số</p>
            <p className="mobile:text-xl tablet:text-2xl font-bold text-purple-700">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                .format(Number(userStatus.total_sales))}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Mạng lưới */}
      <Card className="">
        <CardHeader>
          <CardTitle className="text-text-brown-primary mobile:text-lg tablet:text-xl laptop:text-2xl">
            Mạng lưới giới thiệu ({userStatus.referrals?.length || 0} người)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userStatus.referrals && userStatus.referrals.length > 0 ? (
            <div className="grid mobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-3 gap-4">
              {userStatus.referrals.map((referral: any) => (
                <div key={referral.id} className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <p className="font-medium text-text-brown-primary">Mã: {referral.personal_referral_code}</p>
                  <p className="text-gray-600 mt-2">Cấp bậc: {referral.user_rank}</p>
                  <p className="text-gray-600 mt-1">Doanh số: {
                    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                      .format(Number(referral.total_sales))
                  }</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-text-brown-primary">
              <p>Chưa có người được giới thiệu</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Đơn hàng */}
      <Card className="">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-text-brown-primary mobile:text-lg tablet:text-xl laptop:text-2xl">
            Đơn hàng gần đây
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              List
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {orders && orders.length > 0 ? (
            <>
              {viewMode === 'grid' ? (
                <div className="grid mobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-4">
                  {currentOrders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="bg-gray-100 p-4 rounded-t-lg">
                    <div className="grid mobile:grid-cols-1 tablet:grid-cols-4 gap-4 font-medium text-text-brown-primary">
                      <p>Mã đơn</p>
                      <p>Trạng thái</p>
                      <p>Địa chỉ</p>
                      <p>Ngày đặt</p>
                    </div>
                  </div>
                  {currentOrders.map((order) => (
                    <OrderRow key={order.id} order={order} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <Button
                      key={number}
                      variant={currentPage === number ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => paginate(number)}
                    >
                      {number}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 text-text-brown-primary">
              <p>Chưa có đơn hàng nào</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStatusPage;
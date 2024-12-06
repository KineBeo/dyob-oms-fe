'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { userStatusService } from '@/utils/user-status/userStatus';
import { orderService } from '@/utils/order/orderApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MapPin, Package, BarChart2, UserPlus, Badge, Crown, Phone, UserIcon, LayoutDashboard, BookOpen } from 'lucide-react';
import { userAddressService } from '@/utils/user-address/userAddressApi';
import Addresses from '@/components/affiliate-dashboard/Addresses';
import Loading from '@/components/Loading';
import RankRoadmap, { UserRank } from '@/components/affiliate-dashboard/RankRoadmap';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Referral {
  id: string;
  fullname: string;
  personal_referral_code: string;
  user_rank: string;
  total_sales: number;
}

interface UserStatus {
  personal_referral_code: string;
  user_rank: string;
  referrer_name: string | null;
  rank_achievement_date: string;
  total_orders: number;
  total_purchase: number;
  total_sales: number;
  group_sales: number;
  commission: string;
  referrals: Referral[];
  user_type: 'NORMAL' | 'AFFILIATE';
}

interface Order {
  id: string;
  createdAt: string;
  status: string;
  snapshot_full_address: string;
}

interface Address {
  id: number;
  full_address: string;
  is_default: boolean;
}

const UserStatusPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user?.id) return;
        const statusData = await userStatusService.getUserStatusById(user.id);
        const ordersData = await orderService.getOrderByUserID(user.id);
        // Fetch addresses here using the provided endpoint
        // const addressesData = await userAddressService.getUserAddresses(user.id);
        const addressData = await userAddressService.getUserAddresses(user.id);

        if (statusData) setUserStatus(statusData);
        if (ordersData) setOrders(ordersData);
        // if (addressesData) setAddresses(addressesData);
        if (addressData) setAddresses(addressData);
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
    return <Loading />;
  }

  const copyReferralLink = async (referralCode: string) => {
    const referralLink = `${window.location.origin}/authentication/register?ref=${referralCode}`;
    try {
      await navigator.clipboard.writeText(referralLink);
      toast.success('Đã sao chép liên kết giới thiệu!');
    } catch (err) {
      toast.error('Không thể sao chép liên kết. Vui lòng thử lại.');
    }
  };

  const Overview = () => (
    <div className="space-y-6">
      <Card className="shadow-sm border-none">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex justify-center items-center bg-primary/10 rounded-full w-16 h-16">
              <UserIcon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-2xl">{user?.fullname}</h2>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1">
                  {userStatus?.user_type === 'AFFILIATE' && (
                    <div className="flex items-center gap-1">
                      <Crown className="w-5 h-5" />
                      {userStatus.user_rank}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-5 h-5" />
                  {user?.phone_number}
                </div>
              </div>
            </div>
          </div>
          {userStatus?.user_type === 'AFFILIATE' && (
            <RankRoadmap currentRank={userStatus.user_rank as UserRank} />
          )}
        </CardContent>
      </Card>

      <Card className="shadow-sm border-none">
        <CardContent className="gap-4 grid grid-cols-2 desktop:grid-cols-4 laptop:grid-cols-4 mini-laptop:grid-cols-2 p-6">

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="font-medium text-green-600 text-sm">Đã mua hàng</p>
            <p className="font-bold text-2xl text-green-700 mobile:text-lg tablet:text-xl mini-laptop:text-xl laptop:text-xl">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                .format(Number(userStatus.total_purchase))}
            </p>
          </div>
          {(userStatus?.user_type === 'AFFILIATE' || user?.role === 'ADMIN') && (
            <>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="font-medium text-purple-600 text-sm">Doanh số giới thiệu</p>
                <p className="font-bold text-2xl text-purple-700 mobile:text-lg tablet:text-xl mini-laptop:text-xl laptop:text-xl">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                    .format(Number(userStatus.total_sales))}
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="font-medium text-red-600 text-sm">Tổng doanh số</p>
                <p className="font-bold text-2xl text-red-700 mobile:text-lg tablet:text-xl mini-laptop:text-xl laptop:text-xl">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                    .format(Number(userStatus.group_sales))}
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="font-medium text-orange-600 text-sm">Thưởng</p>
                <p className="font-bold text-2xl text-orange-700 mobile:text-lg tablet:text-xl mini-laptop:text-xl laptop:text-xl">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                    .format(Number(userStatus.commission))}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      {(userStatus?.user_type === 'AFFILIATE' || user?.role === 'ADMIN') && (
        <Card className="shadow-sm border-none">
          <CardContent className="p-6">
            <h3 className="mb-4 font-semibold text-lg">Thông tin tài khoản</h3>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Mã giới thiệu</p>
                <p className="font-medium break-all">
                  {`${window.location.origin}/authentication/register?ref=${userStatus?.personal_referral_code}`}
                </p>
              </div>
              <div className='flex flex-col justify-center space-y-2 w-full'>
                <Button
                  onClick={() => copyReferralLink(userStatus?.personal_referral_code)}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Sao chép liên kết
                </Button>
                <Button
                  disabled
                  variant="outline"
                  size='sm'
                  className='opacity-50 w-full cursor-not-allowed'
                // 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700' khi có hiệu lực
                >
                  Rút tiền
                </Button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Cấp bậc</p>
                <p className="font-medium">{userStatus.user_rank}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Người giới thiệu</p>
                <p className="font-medium">{userStatus.referrer_name || 'Chưa có'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Ngày đạt cấp bậc</p>
                <p className="font-medium">
                  {new Date(userStatus.rank_achievement_date).toLocaleDateString('vi-VN')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const translateOrderStatus = (status: string) => {
    switch (status) {
      case 'NOT_START_YET':
        return 'Đang chờ xử lý';
      case 'ONG_OING':
        return 'Đang xử lý';
      case 'COMPLETED':
        return 'Đã hoàn thành';
      case 'DELIVERED':
        return 'Đã nhận hàng';
      case 'CANCELED':
        return 'Đã hủy';
      default:
        return status;
    }
  }

  const Orders = () => (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-lg">Đơn hàng của tôi</h3>
      </div>
      <div className="divide-y">
        {currentOrders.length > 0 ? (
          currentOrders.map((order) => (
            <div key={order.id} className="hover:bg-gray-50 p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">Đơn hàng #{order.id}</p>
                  <p className="text-gray-600 text-sm">
                    {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                  </p>
                </div>
                <span className="bg-blue-100 px-3 py-1 rounded-full text-blue-800 text-sm">
                  {translateOrderStatus(order.status)}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{order.snapshot_full_address}</p>
            </div>
          ))
        ) : (
          <p className="py-8 font-bold text-center text-gray-700 text-lg laptop:text-xl desktop:text-xl">Bạn chưa có đơn hàng nào</p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 p-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
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
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );

  <Addresses />

  const Referrals = () => (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-lg">Mạng lưới giới thiệu ({userStatus.referrals?.length || 0})</h3>
      </div>
      <div className="p-4">
        {userStatus.referrals && userStatus.referrals.length > 0 ? (
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {userStatus.referrals.map((referral) => (
              <div key={referral.id} className="p-4 border rounded-lg">
                <p className="font-medium">{referral.fullname}</p>
                <p className="mt-2 text-gray-600 text-sm">Mã: {referral.personal_referral_code}</p>
                <p className="text-gray-600 text-sm">Cấp bậc: {referral.user_rank}</p>
                <p className="text-gray-600 text-sm">
                  Doanh số: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                    .format(Number(referral.total_sales))}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-8 font-bold text-center text-gray-700 text-lg laptop:text-xl desktop:text-xl">Chưa có người được giới thiệu</p>
        )}
      </div>
    </div>
  );

  const Policy = () => (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-2xl text-center laptop:text-2xl desktop:text-3xl">Chính sách</h3>
      </div>
      <div className="p-4">
        <p className=""> </p>
        <div className="flex justify-center py-8">
          <Button
            className="font-bold text-gray-700 text-lg laptop:text-xl desktop:text-xl"
            variant="outline"
            size="sm"
            onClick={() => router.push('/affiliate')}
          >
            Tìm hiểu về chính sách của chúng tôi
          </Button>
        </div>
      </div>
    </div>
  );
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto p-4 md:p-6 lg:p-8 max-w-7xl">
        <div className="flex md:flex-row flex-col gap-6">
          {/* Sidebar */}
          <div className="space-y-2 w-full md:w-64">
            <Button
              variant={activeTab === 'overview' ? 'default' : 'ghost'}
              className="justify-start w-full"
              onClick={() => setActiveTab('overview')}
            >
              <BarChart2 className="mr-2 w-4 h-4" />
              Tổng quan
            </Button>
            <Button
              variant={activeTab === 'orders' ? 'default' : 'ghost'}
              className="justify-start w-full"
              onClick={() => setActiveTab('orders')}
            >
              <Package className="mr-2 w-4 h-4" />
              Đơn hàng
            </Button>
            <Button
              variant={activeTab === 'addresses' ? 'default' : 'ghost'}
              className="justify-start w-full"
              onClick={() => setActiveTab('addresses')}
            >
              <MapPin className="mr-2 w-4 h-4" />
              Thông tin thanh toán
            </Button>
            <Button
              variant={activeTab === 'policy' ? 'default' : 'ghost'}
              className="justify-start w-full"
              onClick={() => setActiveTab('policy')}
            >
              <BookOpen className="mr-2 w-4 h-4" />
              Chính sách
            </Button>
            {(userStatus?.user_type === 'AFFILIATE' || user?.role === 'ADMIN') && (
              <Button
                variant={activeTab === 'referrals' ? 'default' : 'ghost'}
                className="justify-start w-full"
                onClick={() => setActiveTab('referrals')}
              >
                <UserPlus className="mr-2 w-4 h-4" />
                Giới thiệu
              </Button>
            )}
            {/* Admin Dashboard Button */}
            {user?.role === "ADMIN" && (
              <Button
                variant={activeTab === 'admin' ? 'default' : 'ghost'}
                className='justify-start w-full'
                onClick={() => router.push('/admin-dashboard')}
              >
                <LayoutDashboard className="mr-2 w-4 h-4" />
                Admin Dashboard
              </Button>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && <Overview />}
            {activeTab === 'orders' && <Orders />}
            {activeTab === 'addresses' && <Addresses />}
            {activeTab === 'referrals' && userStatus?.user_type === 'AFFILIATE' && <Referrals />}
            {activeTab === 'policy' && <Policy />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStatusPage;
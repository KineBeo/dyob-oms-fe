'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { userStatusService } from '@/utils/user-status/userStatus';
import { orderService } from '@/utils/order/orderApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MapPin, Package, BarChart2, UserPlus, Badge, Crown, Phone, UserIcon, LayoutDashboard } from 'lucide-react';
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
  commission: string;
  referrals: Referral[];
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
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <UserIcon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user?.fullname}</h2>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1">
                  <Crown className="w-5 h-5" />
                  {userStatus.user_rank}
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-5 h-5" />
                  {user?.phone_number}
                </div>
              </div>
            </div>
          </div>
          <RankRoadmap currentRank={userStatus.user_rank as UserRank} />
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardContent className="grid grid-cols-2 mini-laptop:grid-cols-2 laptop:grid-cols-4 desktop:grid-cols-4 gap-4 p-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-blue-600">Tổng đơn hàng</p>
            <p className="text-2xl mobile:text-lg tablet:text-xl mini-laptop:text-xl laptop:text-xl font-bold text-blue-700">{userStatus.total_orders}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm font-medium text-green-600">Tổng mua hàng</p>
            <p className="text-2xl mobile:text-lg tablet:text-xl mini-laptop:text-xl laptop:text-xl font-bold text-green-700">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                .format(Number(userStatus.total_purchase))}
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm font-medium text-purple-600">Tổng doanh số</p>
            <p className="text-2xl mobile:text-lg tablet:text-xl mini-laptop:text-xl laptop:text-xl font-bold text-purple-700">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                .format(Number(userStatus.total_sales))}
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-sm font-medium text-orange-600">Tổng hoa hồng</p>
            <p className="text-2xl mobile:text-lg tablet:text-xl mini-laptop:text-xl laptop:text-xl font-bold text-orange-700">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                .format(Number(userStatus.commission))}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Thông tin tài khoản</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Mã giới thiệu</p>
              <p className="font-medium break-all">
                {`${window.location.origin}/authentication/register?ref=${userStatus?.personal_referral_code}`}
              </p>
            </div>
            <Button
              onClick={() => copyReferralLink(userStatus?.personal_referral_code)}
              variant="outline"
              size="sm"
            >
              Sao chép liên kết
            </Button>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Cấp bậc</p>
              <p className="font-medium">{userStatus.user_rank}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Người giới thiệu</p>
              <p className="font-medium">{userStatus.referrer_name || 'Chưa có'}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Ngày đạt cấp bậc</p>
              <p className="font-medium">
                {new Date(userStatus.rank_achievement_date).toLocaleDateString('vi-VN')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  const Orders = () => (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Đơn hàng của tôi</h3>
      </div>
      <div className="divide-y">
        {currentOrders.length > 0 ? (
          currentOrders.map((order) => (
            <div key={order.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">Đơn hàng #{order.id}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                  </p>
                </div>
                <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">{order.snapshot_full_address}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700 py-8 font-bold text-lg laptop:text-xl desktop:text-xl">Bạn chưa có đơn hàng nào</p>
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
    </div>
  );

  <Addresses />

  const Referrals = () => (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Mạng lưới giới thiệu ({userStatus.referrals?.length || 0})</h3>
      </div>
      <div className="p-4">
        {userStatus.referrals && userStatus.referrals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userStatus.referrals.map((referral) => (
              <div key={referral.id} className="p-4 border rounded-lg">
                <p className="font-medium">{referral.fullname}</p>
                <p className="text-sm text-gray-600 mt-2">Mã: {referral.personal_referral_code}</p>
                <p className="text-sm text-gray-600">Cấp bậc: {referral.user_rank}</p>
                <p className="text-sm text-gray-600">
                  Doanh số: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                    .format(Number(referral.total_sales))}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700 text-lg laptop:text-xl desktop:text-xl font-bold py-8">Chưa có người được giới thiệu</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-2">
            <Button
              variant={activeTab === 'overview' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('overview')}
            >
              <BarChart2 className="mr-2 h-4 w-4" />
              Tổng quan
            </Button>
            <Button
              variant={activeTab === 'orders' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('orders')}
            >
              <Package className="mr-2 h-4 w-4" />
              Đơn hàng
            </Button>
            <Button
              variant={activeTab === 'addresses' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('addresses')}
            >
              <MapPin className="mr-2 h-4 w-4" />
              Địa chỉ
            </Button>
            <Button
              variant={activeTab === 'referrals' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('referrals')}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Mạng lưới
            </Button>
            {/* Admin Dashboard Button */}
            {user?.role === "ADMIN" && (
              <Button
                variant={activeTab === 'admin' ? 'default' : 'ghost'}
                className='w-full justify-start'
                onClick={() => router.push('/admin-dashboard')}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Admin Dashboard
              </Button>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && <Overview />}
            {activeTab === 'orders' && <Orders />}
            {activeTab === 'addresses' && <Addresses />}
            {activeTab === 'referrals' && <Referrals />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStatusPage;
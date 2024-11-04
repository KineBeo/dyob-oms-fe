"use client"
import React, { useState } from "react";
import { Table, Card, Button, Avatar, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const stats = [
  { label: "Tổng số", value: "$9,342" },
  { label: "Doanh số tháng này", value: "$5,342" },
  { label: "Hoa hồng trực tiếp", value: "$9,342" },
  { label: "Hoa hồng gián tiếp", value: "$9,342" },
  { label: "Thưởng doanh số nhóm", value: "$1,342" },
];

const orders = [
  {
    customer: "0123456789",
    status: "Chờ xác nhận",
    total: "$3,412",
    commission: "1,232",
    rate: "13.43%",
  },
  {
    customer: "Fall Fashion",
    status: "Đang giao",
    total: "$2,543",
    commission: "1,033",
    rate: "13.54%",
  },
  {
    customer: "Back to School",
    status: "Thành công",
    total: "$1,234",
    commission: "1,234",
    rate: "16.65%",
  },
  {
    customer: "Winter Sports",
    status: "Standard",
    total: "$2,345",
    commission: "1,345",
    rate: "10.78%",
  },
  {
    customer: "Spring Flowers",
    status: "Standard",
    total: "$4,567",
    commission: "1,456",
    rate: "9.87%",
  },
];

const referrals = [
  {
    name: "0123456789",
    role: "Nhân viên",
    sales: "$3,409",
    commission: "$1,234",
  },
  {
    name: "Fall Fashion",
    role: "Nhân viên",
    sales: "$3,543",
    commission: "$1,234",
  },
  {
    name: "Back to School",
    role: "Nhân viên",
    sales: "$1,234",
    commission: "$1,234",
  },
  {
    name: "Winter Sports",
    role: "Trưởng nhóm",
    sales: "$2,345",
    commission: "$1,234",
  },
  {
    name: "Spring Flowers",
    role: "Nhân viên",
    sales: "$4,567",
    commission: "$1,234",
  },
];

export default function AffiliateDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  // Get auth state from Redux
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex flex-col laptop:flex-row desktop:flex-row mini-laptop:flex-row bg-[#F5F5F5] min-h-screen">
      {/* Sidebar for mobile */}
      <div className="laptop:hidden desktop:hidden mini-laptop:hidden bg-[#7A0505] p-4 flex flex-row justify-normal items-center">
        <Avatar
          className=""
          classNames={{
            base: "bg-gradient-to-br from-[#FBF6EC] to-[#D7A444]",
          }}
            name={user?.fullname.split(' ').pop()}
          onClick={toggleSidebar}
        />
        <h2 className="mt-2 text-xl font-semibold px-2 text-white">
         {user?.fullname}
        </h2>
        {/* <Button isIconOnly onClick={toggleSidebar} className="bg-transparent">
          <Menu className="text-white" />
        </Button> */}
      </div>

      {/* Sidebar */}
      <div
        className={`w-full md:w-64 bg-white shadow-md ${
          sidebarOpen ? "block" : "hidden"
        } laptop:block mini-laptop:block desktop:block`}
      >
        <div className="p-4 flex flex-row">
        <Avatar
          className=""
          classNames={{
            base: "bg-gradient-to-br from-[#FBF6EC] to-[#D7A444]",
          }}
            name={user?.fullname.split(' ').pop()}
          onClick={toggleSidebar}
        />
          <h2 className="mt-2 text-xl  font-semibold px-2 mobile:hidden tablet:hidden ">
            {user?.fullname}
          </h2>
        </div>
        <nav className="mt-6 mx-4">
          <Button color="primary" className="w-full mb-2 bg-[#7A0505]">
            Trưởng phòng
          </Button>
          <Button color="primary" className="w-full mb-2 bg-[#7A0505]">
            Link Affiliate
          </Button>
          <div className="px-4 py-2 bg-gray-100">
            <h3 className="font-semibold">Thông tin cơ bản</h3>
            <p className="text-sm">SDT: 0123456789</p>
            <p className="text-sm">STK: 0123456789</p>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <div className="bg-[#3F291B] text-white p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-lg laptop:text-xl desktop:text-xl font-bold">
              Chúc bạn một ngày tốt lành
            </h1>
            <p className="mt-2 text-base laptop:text-xl desktop:text-xl">
              Bạn làm tốt lắm! Bạn đã kiếm được{" "}
              <span className="font-bold text-2xl laptop:text-3xl desktop:text-3xl text-[#D7A444]">
                5.000.000 đ
              </span>{" "}
              trong tuần này.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-4 md:p-6">
          <div className="grid grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-5 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-4">
                <h3 className="text-xs laptop:text-sm desktop:text-sm font-medium text-gray-600">
                  {stat.label}
                </h3>
                <p className="text-lg laptop:text-xl desktop:text-xl text-[#7A0505] font-bold mt-1">
                  {stat.value}
                </p>
              </Card>
            ))}
          </div>

          <div className="space-y-8 laptop:space-y-0 desktop:space-y-0 laptop:grid desktop:grid  laptop:grid-cols-1 desktop:grid-cols-2 laptop:gap-8 desktop:gap-8">
            <div>
              <h2 className="text-lg laptop:text-xl desktop:text-xl font-bold mb-4">
                Đơn hàng được bạn giới thiệu
              </h2>
              <div className="overflow-x-auto">
                <Table aria-label="Đơn hàng được bạn giới thiệu">
                  <TableHeader>
                    <TableColumn>Khách hàng</TableColumn>
                    <TableColumn>Trạng thái</TableColumn>
                    <TableColumn>Tổng giá trị</TableColumn>
                    <TableColumn>Hoa hồng trực tiếp</TableColumn>
                    <TableColumn>Tỉ lệ hoa hồng</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order, index) => (
                      <TableRow key={index}>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell>{order.total}</TableCell>
                        <TableCell>{order.commission}</TableCell>
                        <TableCell>{order.rate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div>
              <h2 className="text-lg laptop:text-xl desktop:text-xl font-bold mb-4">
                Nhân viên được bạn giới thiệu
              </h2>
              <div className="overflow-x-auto">
                <Table aria-label="Nhân viên được bạn giới thiệu">
                  <TableHeader>
                    <TableColumn>Tên nhân viên</TableColumn>
                    <TableColumn>Chức vụ</TableColumn>
                    <TableColumn>Doanh số</TableColumn>
                    <TableColumn>Hoa hồng gián tiếp</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {referrals.map((referral, index) => (
                      <TableRow key={index}>
                        <TableCell>{referral.name}</TableCell>
                        <TableCell>{referral.role}</TableCell>
                        <TableCell>{referral.sales}</TableCell>
                        <TableCell>{referral.commission}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

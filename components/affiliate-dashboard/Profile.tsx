import { UpdateUserDto } from "@/interfaces/user";
import { Card } from "@nextui-org/react";
import { Crown } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { UserStatus } from "@/interfaces/user-status";

const Profile = ({ user, userStatus, formatDate, onUpdateUser }: { user: any, userStatus: UserStatus, formatDate: (date: Date | string | undefined) => string, onUpdateUser: (updateData: UpdateUserDto) => Promise<void> }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullname: user?.fullname || '',
        phone_number: user?.phone_number || '',
        cccd: user?.cccd || '',
        bank_name: user?.bank_name || '',
        bank_account_number: user?.bank_account_number || ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { name, value } = e.target;

     let newValue = value;

     // Nếu là trường cccd hoặc bank_account_number, chỉ cho phép nhập số
     if (name === "cccd" || name === "bank_account_number") {
       // Loại bỏ tất cả các ký tự không phải số
       newValue = value.replace(/\D/g, "");

       // Giới hạn số lượng ký tự cho cccd là 12 số
       if (name === "cccd" && newValue.length > 12) {
         newValue = newValue.slice(0, 12);
       }

       // Giới hạn số lượng ký tự cho bank_account_number (16 số)
       if (name === "bank_account_number" && newValue.length > 16) {
         newValue = newValue.slice(0, 16);
       }
     }
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onUpdateUser(formData);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            fullname: user?.fullname || '',
            phone_number: user?.phone_number || '',
            cccd: user?.cccd || '',
            bank_name: user?.bank_name || '',
            bank_account_number: user?.bank_account_number || ''
        });
        setIsEditing(false);
    };

    return (
      <div className="space-y-6">
        <Card className="shadow-none border border-gray-300 rounded-none">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-xl">Thông tin cá nhân</h3>
              {!isEditing && (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Chỉnh sửa
                </Button>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg">
                    <p className="text-gray-600 text-sm">Họ và tên</p>
                    {isEditing ? (
                      <Input
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleInputChange}
                        className="bg-white"
                      />
                    ) : (
                      <p className="font-medium">{user?.fullname}</p>
                    )}
                  </div>

                  <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg">
                    <p className="text-gray-600 text-sm">Số điện thoại</p>
                    <p className="font-medium">{user?.phone_number}</p>
                  </div>

                  <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg">
                    <p className="text-gray-600 text-sm">Số Căn Cước</p>
                    {isEditing ? (
                      <Input
                        name="cccd"
                        value={formData.cccd}
                        onChange={handleInputChange}
                        className="bg-white"
                        maxLength={12}
                      />
                    ) : (
                      <p className="font-medium">{user?.cccd}</p>
                    )}
                  </div>

                  <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg">
                    <p className="text-gray-600 text-sm">Tên ngân hàng</p>
                    {isEditing ? (
                      <Input
                        name="bank_name"
                        value={formData.bank_name}
                        onChange={handleInputChange}
                        className="bg-white"
                      />
                    ) : (
                      <p className="font-medium">{user?.bank_name}</p>
                    )}
                  </div>

                  <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg">
                    <p className="text-gray-600 text-sm">Số tài khoản</p>
                    {isEditing ? (
                      <Input
                        name="bank_account_number"
                        value={formData.bank_account_number}
                        onChange={handleInputChange}
                        className="bg-white"
                      />
                    ) : (
                      <p className="font-medium">{user?.bank_account_number}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg">
                    <p className="text-gray-600 text-sm">Gói</p>
                    <p className="font-medium">{userStatus.user_class}</p>
                  </div>

                  <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg">
                    <p className="text-gray-600 text-sm">Ngày tham gia</p>
                    <p className="font-medium">
                      {formatDate(userStatus?.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end gap-4 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    Hủy
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {userStatus?.user_type === "AFFILIATE" && (
          <Card className="shadow-sm border border-gray-300">
            <CardContent className="p-6">
              <h3 className="mb-6 font-semibold text-xl">
                Thông tin Affiliate
              </h3>
              <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg">
                  <p className="text-gray-600 text-sm">Mã giới thiệu</p>
                  <p className="font-medium break-all">
                    {userStatus.personal_referral_code}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg">
                  <p className="text-gray-600 text-sm">Trạng thái Affiliate</p>
                  <p className="flex items-center gap-2 font-medium">
                    <Crown className="w-4 h-4" />
                    {userStatus.user_rank}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg">
                  <p className="text-gray-600 text-sm">Người giới thiệu</p>
                  <p className="font-medium">
                    {userStatus.referrer_name || "Chưa có"}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg">
                  <p className="text-gray-600 text-sm">Tổng cá nhân chi tiêu</p>
                  <p className="font-medium">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(Number(userStatus.total_purchase))}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg">
                  <p className="text-gray-600 text-sm">Tổng doanh số</p>
                  <p className="font-medium">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(Number(userStatus.total_sales))}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg">
                  <p className="text-gray-600 text-sm">Hoa hồng</p>
                  <p className="font-medium">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(Number(userStatus.commission))}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg">
                  <p className="text-gray-600 text-sm">Thưởng</p>
                  <p className="font-medium">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(Number(userStatus.bonus))}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg">
                  <p className="text-gray-600 text-sm">Ngày đạt cấp</p>
                  <p className="font-medium">
                    {formatDate(userStatus?.rank_achievement_date)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
};

export default Profile;
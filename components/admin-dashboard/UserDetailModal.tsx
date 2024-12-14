import { User } from "@/interfaces/auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UserStatus } from "@/interfaces/user-status";


interface UserDetailModalProps {
    user: User;
    userStatus: UserStatus;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, userStatus, isOpen, onOpenChange }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Chi tiết thông tin người dùng</DialogTitle>
                </DialogHeader>
                <div className="gap-4 grid grid-cols-2">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Họ và tên:</span>
                            <span className="font-medium">{user.fullname}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Số điện thoại:</span>
                            <span className="font-medium">{user.phone_number}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">CCCD:</span>
                            <span className="font-medium">{user.cccd}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Tên ngân hàng:</span>
                            <span className="font-medium">{user.bank_name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Tài khoản ngân hàng:</span>
                            <span className="font-medium">{user.bank_account_number}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Ngày tham gia:</span>
                            <span className="font-medium">{new Date(userStatus.createdAt).toLocaleDateString('vi-VN')}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Mã giới thiệu:</span>
                            <span className="font-medium">{userStatus.personal_referral_code}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Loại người dùng:</span>
                            <span className="font-medium">{userStatus.user_type}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Hạng:</span>
                            <span className="font-medium">{userStatus.user_class}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Cấp bậc:</span>
                            <span className="font-medium">{userStatus.user_rank}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Tổng đơn hàng:</span>
                            <span className="font-medium">{userStatus.total_orders}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Tổng mua:</span>
                            <span className="font-medium">{userStatus.total_purchase.toLocaleString('vi-VN')} VNĐ</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Doanh số cá nhân:</span>
                            <span className="font-medium">{userStatus.total_sales.toLocaleString('vi-VN')} VNĐ</span>
                        </div>
                        {/* <div className="flex justify-between">
                            <span className="text-gray-600">Doanh số nhóm:</span>
                            <span className="font-medium">{userStatus.group_sales.toLocaleString('vi-VN')} VNĐ</span>
                        </div> */}
                    </div>
                    <div className="col-span-2">
                        <div className="flex justify-between pt-2 border-t">
                            <span className="text-gray-600">Ngày đạt hạng:</span>
                            <span className="font-medium">
                                {new Date(userStatus.rank_achievement_date).toLocaleDateString('vi-VN')}
                            </span>
                        </div>
                        {/* <div className="flex justify-between">
              <span className="text-gray-600">Lần kiểm tra hạng cuối:</span>
              <span className="font-medium">
                {new Date(userStatus.last_rank_check).toLocaleDateString('vi-VN')}
              </span>
            </div> */}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UserDetailModal;
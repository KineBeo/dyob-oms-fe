import React, { useState } from 'react';
import { ChevronRight, ChevronDown, UserPlus } from 'lucide-react';

interface Referral {
    id: string;
    fullname: string;
    personal_referral_code: string;
    user_rank: string;
    total_sales: number;
    referrals: Referral[];
}

interface UserStatus {
    personal_referral_code: string;
    user_rank: string;
    total_sales: number;
    referrals: Referral[];
}

const ReferralItem = ({ referral, depth = 0 }: { referral: Referral, depth?: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const hasChildren = referral.referrals && referral.referrals.length > 0;

    return (
        <div className={`pl-${depth * 4} border-l-2 border-gray-200`}>
            <div
                className="flex items-center hover:bg-gray-100 p-2 rounded cursor-pointer"
                onClick={() => hasChildren && setIsExpanded(!isExpanded)}
            >
                {hasChildren ? (
                    isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                ) : (
                    <UserPlus size={16} className="text-gray-400" />
                )}

                <div className="flex-1 ml-2">
                    <div className="font-medium">{referral.fullname}</div>
                    <div className="text-gray-500 text-xs">
                        Cấp bậc: {referral.user_rank} |
                        Doanh số: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                            .format(Number(referral.total_sales))}
                    </div>
                </div>
            </div>

            {isExpanded && hasChildren && (
                <div className="ml-4 border-l border-dashed">
                    {referral.referrals.map(subReferral => (
                        <ReferralItem
                            key={subReferral.id}
                            referral={subReferral}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const Referrals = ({ userStatus }: { userStatus: UserStatus }) => {
    return (
        <div className="bg-white shadow rounded-lg">
            <div className="p-4 border-b">
                <h3 className="font-semibold text-lg">Mạng lưới giới thiệu</h3>
                <div className="text-gray-600 text-sm">
                    <div>Cấp bậc: {userStatus.user_rank}</div>
                    <div>Tổng doanh số: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                        .format(Number(userStatus.total_sales))}</div>
                </div>
            </div>

            <div className="p-4">
                {userStatus.referrals && userStatus.referrals.length > 0 ? (
                    userStatus.referrals.map(referral => (
                        <ReferralItem
                            key={referral.id}
                            referral={referral}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500">Chưa có người được giới thiệu</p>
                )}
            </div>
        </div>
    );
};

export default Referrals;
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

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

interface Props {
    userStatus: UserStatus;
}

const getFontSizeForDepth = (depth: number) => {
    const sizes = [
        'text-base',
        'text-sm',
        'text-xs',
        'text-xxs'
    ];
    return sizes[depth] || 'text-xxs';
};

const ReferralItem = ({
    referral,
    depth = 0,
    onToggleExpand
}: {
    referral: Referral,
    depth?: number,
    onToggleExpand?: (id: string) => void
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
        onToggleExpand?.(referral.id);
    };

    return (
        <div
            className={`
                ${getFontSizeForDepth(depth)} 
                ${depth > 0 ? 'bg-gray-50 mb-2 p-2 rounded' : 'p-4 border rounded-lg mb-4'}
            `}
        >
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-medium">{referral.fullname}</p>
                    <p className="text-gray-600">Mã: {referral.personal_referral_code}</p>
                    <p className="text-gray-600">Cấp bậc: {referral.user_rank}</p>
                    <p className="text-gray-600">
                        Doanh số: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                            .format(Number(referral.total_sales))}
                    </p>
                </div>
                {referral.referrals && referral.referrals.length > 0 && (
                    <button
                        onClick={toggleExpand}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        {isExpanded ? <ChevronUp /> : <ChevronDown />}
                    </button>
                )}
            </div>

            {isExpanded && referral.referrals && referral.referrals.length > 0 && (
                <div className="mt-2 pl-4 border-t">
                    <h4 className={`mb-2 font-semibold ${getFontSizeForDepth(depth + 1)}`}>
                        Người được giới thiệu ({referral.referrals.length})
                    </h4>
                    {referral.referrals.map((nestedReferral) => (
                        <ReferralItem
                            key={nestedReferral.id}
                            referral={nestedReferral}
                            depth={depth + 1}
                            onToggleExpand={onToggleExpand}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const Referrals = ({ userStatus }: Props) => {
    const [expandedReferrals, setExpandedReferrals] = useState<Set<string>>(new Set());

    const handleToggleExpand = (id: string) => {
        const newExpandedReferrals = new Set(expandedReferrals);
        if (newExpandedReferrals.has(id)) {
            newExpandedReferrals.delete(id);
        } else {
            newExpandedReferrals.add(id);
        }
        setExpandedReferrals(newExpandedReferrals);
    };

    return (
        <div className="bg-white shadow-sm rounded-lg">
            <div className="p-4 border-b">
                <h3 className="font-semibold text-lg">
                    Mạng lưới giới thiệu ({userStatus.referrals?.length || 0})
                </h3>
            </div>
            <div className="p-4">
                {userStatus.referrals && userStatus.referrals.length > 0 ? (
                    <div className="space-y-4">
                        {userStatus.referrals.map((referral) => (
                            <ReferralItem
                                key={referral.id}
                                referral={referral}
                                onToggleExpand={handleToggleExpand}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="py-8 font-bold text-center text-gray-700 text-lg laptop:text-xl desktop:text-xl">
                        Chưa có người được giới thiệu
                    </p>
                )}
            </div>
        </div>
    );
};

export default Referrals;
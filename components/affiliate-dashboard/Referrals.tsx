import React, { useState } from 'react';
import { ChevronRight, ChevronDown, UserPlus, Download, Table, LayoutGrid } from 'lucide-react';
import { User } from '@/interfaces/auth';

export interface Referral {
    id: string;
    fullname: string;
    personal_referral_code: string;
    referrer_name: string | null;
    total_purchase: string;
    user_rank: string;
    total_sales: number;
    referrals: Referral[];
    createdAt: Date;
}

export interface UserStatus {
    user: User;
    personal_referral_code: string;
    user_rank: string;
    user_class: string;
    referrer_name: string | null;
    rank_achievement_date: string;
    total_orders: number;
    total_purchase: number;
    total_sales: number;
    group_sales: number;
    commission: string;
    group_commission: string;
    referrals: Referral[];
    user_type: 'NORMAL' | 'AFFILIATE';
    createdAt: Date;
}


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

// Hàm chuyển đổi dữ liệu phân cấp thành mảng phẳng
const flattenReferrals = (referrals: Referral[], level = 1): any[] => {
    return referrals.reduce((acc: any[], referral: Referral) => {
        const flatItem = {
            'Cấp': level,
            'Họ tên': referral.fullname,
            'Cấp bậc': referral.user_rank,
            'Doanh số': referral.total_sales,
            'Người giới thiệu': referral.referrer_name || 'Không có',
            'Ngày tham gia': formatDate(referral.createdAt),
        };

        acc.push(flatItem);

        if (referral.referrals && referral.referrals.length > 0) {
            acc.push(...flattenReferrals(referral.referrals, level + 1));
        }

        return acc;
    }, []);
};

// Hàm xuất CSV
const exportToCSV = (userStatus: UserStatus) => {
    const flatData = flattenReferrals(userStatus.referrals);

    // Tạo header
    const headers = ['Cấp', 'Họ tên', 'Cấp bậc', 'Doanh số', 'Người giới thiệu', 'Ngày tham gia'];

    // Chuyển đổi dữ liệu thành định dạng CSV
    const csvContent = [
        headers.join(','),
        ...flatData.map(row => [
            row['Cấp'],
            `"${row['Họ tên']}"`,
            `"${row['Cấp bậc']}"`,
            row['Doanh số'],
            `"${row['Người giới thiệu']}"`,
            `"${row['Ngày tham gia']}"`,
        ].join(','))
    ].join('\n');

    // Tạo Blob và tải xuống
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `network_referrals_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

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
                    <UserPlus size={16} className="text-black" />
                )}

                <div className="flex-1 ml-2">
                    <div className="font-medium">{referral.fullname}</div>
                    <div className="text-black text-xs">
                        Cấp bậc: {referral.user_rank} |
                        Doanh số: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                            .format(Number(referral.total_sales))} | Chi tiêu: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                            .format(Number(referral.total_purchase))} 
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

const ReferralTable = ({ data }: { data: any[] }) => {
    return (
        <div className="overflow-x-auto border border-gray-400">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {Object.keys(data[0] || {}).map((header) => (
                            <th
                                key={header}
                                className="px-6 py-3 text-left text-xs text-black uppercase tracking-wider font-semibold"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                    {data.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            {Object.values(row).map((value: any, i) => (
                                <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {typeof value === 'number' && !Object.keys(row)[i].includes('Cấp')
                                        ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
                                        : value}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const Referrals = ({ userStatus }: { userStatus: UserStatus }) => {
    // console.log('User status:', userStatus);
    const [viewMode, setViewMode] = useState<'tree' | 'table'>('tree');
    const flatData = flattenReferrals(userStatus.referrals);

    return (
        <div className="bg-white rounded-lg border border-gray-300">
            <div className="p-4 border-b">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">Mạng lưới giới thiệu</h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode(viewMode === 'tree' ? 'table' : 'tree')}
                            className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                        >
                            {viewMode === 'tree' ? <Table size={16} /> : <LayoutGrid size={16} />}
                            {viewMode === 'tree' ? 'Xem dạng bảng' : 'Xem dạng cây'}
                        </button>
                        <button
                            onClick={() => exportToCSV(userStatus)}
                            className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                            <Download size={16} />
                            Xuất CSV
                        </button>
                    </div>
                </div>
                <div className="text-black text-md">
                    <div>Cấp bậc: {userStatus.user_rank}</div>
                    <div>Cá nhân đã chi tiêu: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(userStatus.total_purchase)}</div>
                    <div>Doanh số cá nhân: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(userStatus.total_sales)}</div>
                    <div>Tổng doanh số: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(userStatus.group_sales)}</div>
                    <div>Hoa hồng: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(userStatus.commission))}</div>
                    <div>Thưởng nhóm: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(userStatus.group_commission))}</div>
                </div>
            </div>

            <div className="p-4">
                {userStatus.referrals && userStatus.referrals.length > 0 ? (
                    viewMode === 'tree' ? (
                        userStatus.referrals.map(referral => (
                            <ReferralItem
                                key={referral.id}
                                referral={referral}
                            />
                        ))
                    ) : (
                        <ReferralTable data={flatData} />
                    )
                ) : (
                    <p className="text-center text-gray-500">Chưa có người được giới thiệu</p>
                )}
            </div>
        </div>
    );
};

export default Referrals;
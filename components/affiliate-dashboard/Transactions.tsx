import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import useSWR from "swr";
import { userTransactionService } from '@/utils/user-transaction/userTransaction';
import Loading from '../Loading';

export enum TransactionType {
    COMMISSION = 'COMMISSION',
    BONUS = 'BONUS',
    SALE = 'SALE',
    PURCHASE = 'PURCHASE',
    RESET = 'RESET',
}

export interface Transaction {
    id: number;
    createdAt: string;
    type: TransactionType;
    amount: number;
    description?: string;
}

interface GroupedTransactions {
    [date: string]: Transaction[];
}

const Transaction = () => {
    const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());

    const { data, error, isLoading } = useSWR("user-transaction", async () => {
        const response = await userTransactionService.getPersonalTransactionData();
        return response;
    });

    if (isLoading) return <Loading />;
    if (error) return <div>Error loading transaction data</div>;

    const transactions: Transaction[] = data || [];

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const getTransactionStyle = (type: TransactionType) => {
        switch (type) {
            case 'COMMISSION':
                return 'bg-green-100 text-green-700 font-bold px-2 py-1 rounded';
            case 'BONUS':
                return 'bg-yellow-100 text-yellow-700 font-bold px-2 py-1 rounded';
            case 'SALE':
                return 'bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded';
            case 'PURCHASE':
                return 'bg-red-100 text-red-700 font-bold px-2 py-1 rounded';
            case 'RESET':
                return 'bg-gray-100 text-gray-700 font-bold px-2 py-1 rounded';
            default:
                return 'bg-gray-100 text-gray-700 font-bold px-2 py-1 rounded';
        }
    };

    const getTransactionIcon = (type: TransactionType): JSX.Element | null => {
        switch (type) {
            case 'COMMISSION':
            case 'BONUS':
            case 'SALE':
                return <ArrowUpCircle className="w-5 h-5 text-green-600" />;
            case 'PURCHASE':
                return <ArrowDownCircle className="w-5 h-5 text-red-600" />;
            default:
                return null;
        }
    };

    const getTransactionLabel = (type: TransactionType): string => {
        switch (type) {
            case 'COMMISSION':
                return 'Hoa hồng';
            case 'BONUS':
                return 'Thưởng';
            case 'SALE':
                return 'Bán hàng';
            case 'PURCHASE':
                return 'Mua hàng';
            case 'RESET':
                return "Thanh toán";
            default:
                return type;
        }
    };

    const groupTransactionsByDate = (transactions: Transaction[]): GroupedTransactions => {
        return transactions.reduce((groups: GroupedTransactions, transaction) => {
            const date = new Date(transaction.createdAt).toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                weekday: 'long'
            });
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(transaction);
            return groups;
        }, {});
    };

    const toggleDate = (date: string) => {
        const newExpanded = new Set(expandedDates);
        if (newExpanded.has(date)) {
            newExpanded.delete(date);
        } else {
            newExpanded.add(date);
        }
        setExpandedDates(newExpanded);
    };

    const groupedTransactions = groupTransactionsByDate(transactions);

    return (
        <Card className="shadow-none border border-gray-300 rounded-none">
            <CardContent className="p-6">
                <h3 className="mb-6 font-semibold text-xl">Biến động số dư</h3>

                <div className="space-y-4">
                    {Object.entries(groupedTransactions).map(([date, dayTransactions]) => (
                        <div key={date} className="border border-gray-200 rounded-lg">
                            <button
                                className="flex justify-between items-center hover:bg-gray-50 p-3 w-full transition-colors"
                                onClick={() => toggleDate(date)}
                            >
                                <span className="font-medium text-gray-700">{date}</span>
                                {expandedDates.has(date) ?
                                    <ChevronUp className="w-5 h-5 text-gray-500" /> :
                                    <ChevronDown className="w-5 h-5 text-gray-500" />
                                }
                            </button>

                            {expandedDates.has(date) && (
                                <div className="border-gray-200 border-t">
                                    {dayTransactions.map((transaction) => (
                                        <div
                                            key={transaction.id}
                                            className="flex justify-between items-center p-4 border-gray-100 border-b last:border-b-0"
                                        >
                                            <div className="flex items-center gap-3">
                                                {getTransactionIcon(transaction.type)}
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        {getTransactionIcon(transaction.type)}
                                                        <span>{getTransactionLabel(transaction.type)}</span>
                                                    </div>
                                                    <p className="mt-1 text-gray-600 text-sm">
                                                        {transaction.description || '-'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className={getTransactionStyle(transaction.type)}>
                                                    {formatCurrency(transaction.amount)}
                                                </div>
                                                <p className="mt-1 text-gray-500 text-sm">
                                                    {new Date(transaction.createdAt).toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default Transaction;
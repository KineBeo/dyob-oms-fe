import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import useSWR from "swr";
import { userStatusService } from '@/utils/user-status/userStatus';
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

const Transaction = () => {

    const { data, error, isLoading } = useSWR("user-transaction", async () => {
        const response = await userTransactionService.getPersonalTransactionData();
        return response;
    });

    if (isLoading) return <Loading />;

    if (error) return <div>Error loading transaction data</div>;

    console.log(data);
    let transactions: Transaction[] = data || [];

    if (data) {
        transactions = data;
    }

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

    return (
        <Card className="shadow-none border border-gray-300 rounded-none">
            <CardContent className="p-6">
                <h3 className="mb-6 font-semibold text-xl">Biến động số dư</h3>

                <div className="space-y-6">
                    <div className="border border-gray-300 rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[180px]">Thời gian</TableHead>
                                    <TableHead className="w-[200px]">Loại giao dịch</TableHead>
                                    <TableHead className="text-right">Số tiền</TableHead>
                                    <TableHead>Nội dung</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell className="font-medium">
                                            {new Date(transaction.createdAt).toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {getTransactionIcon(transaction.type)}
                                                <span>{getTransactionLabel(transaction.type)}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell
                                            className={`text-right font-bold ${getTransactionStyle(transaction.type)}`}
                                        >
                                            {formatCurrency(transaction.amount)}
                                        </TableCell>
                                        <TableCell className="text-gray-600">
                                            {transaction.description || '-'}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Transaction;
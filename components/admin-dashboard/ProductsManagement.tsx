import { useEffect, useState } from 'react';
import { Pie, PieChart } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Order, OrderProduct } from '@/interfaces/order';
import Loading from '../Loading';
import { orderService } from '@/utils/order/orderApi';
import StrapiControls from './StrapiControl';

const ProductPurchasesChart = () => {
    const [chartData, setChartData] = useState<{ data: { name: string; quantity: number; fill: string }[]; config: any } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orders = await orderService.getAllOrders();

                // Aggregate product quantities across all orders
                const productQuantities: { [key: string]: number } = {};

                orders.forEach((order: Order) => {
                    order.orderProduct.forEach((item: OrderProduct) => {
                        const productName = item.product.name;
                        if (!productQuantities[productName]) {
                            productQuantities[productName] = 0;
                        }
                        productQuantities[productName] += item.quantity;
                    });
                });

                // Convert to chart format and sort by quantity
                const colors = [
                    "hsl(var(--chart-1))",
                    "hsl(var(--chart-2))",
                    "hsl(var(--chart-3))",
                    "hsl(var(--chart-4))",
                    "hsl(var(--chart-5))",
                ];

                const chartData = Object.entries(productQuantities)
                    .map(([name, quantity], index) => ({
                        name,
                        quantity,
                        fill: colors[index % colors.length]  // Use predefined colors
                    }))
                    .sort((a, b) => b.quantity - a.quantity)
                    .slice(0, 5); // Show top 5 products

                // Create chart config dynamically
                const chartConfig = {
                    quantity: {
                        label: "Quantity Sold",
                    },
                    ...chartData.reduce((acc, item, index) => ({
                        ...acc,
                        [item.name]: {
                            label: item.name,
                            color: `hsl(var(--chart-${index + 1}))`,
                        },
                    }), {})
                };

                setChartData({ data: chartData, config: chartConfig });
                setLoading(false);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError(String(err));
                }
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <Loading />
        );
    }

    if (error) {
        return (
            <Card className="flex flex-col">
                <CardHeader className="items-center">
                    <CardTitle>Error loading data</CardTitle>
                    <CardDescription>{error}</CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <div className='flex flex-col'>
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Top 5 sản phẩm bán chạy nhất</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0 m-4">
                    {chartData && (
                        <ChartContainer
                            config={chartData.config}
                            className="mx-auto aspect-square max-h-64"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={true}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={chartData.data}
                                    dataKey="quantity"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                />
                            </PieChart>
                        </ChartContainer>
                    )}
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                    <div className="leading-none text-muted-foreground">
                        Hiển thị 5 sản phẩm bán chạy nhất
                    </div>
                </CardFooter>
            </Card>
            <StrapiControls />
        </div>

    );
};

export default ProductPurchasesChart;
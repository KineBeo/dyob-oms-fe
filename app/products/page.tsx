'use client'
import ProductCard from "@/components/cards/ProductCard";
import React, { useState, useEffect } from 'react';
import * as strapi from '../../utils/globalApi';
import useSWR from 'swr';
import { CategoriesResponse, FilterCategory, Product, ProductResponse } from "@/utils/api/Product.interface";
import Loading from "@/components/Loading";
import { FaBars, FaTimes } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Products() {
    const [selectedFilters, setSelectedFilters] = useState<Set<number>>(new Set());
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20;

    const { data, isLoading, error } = useSWR('products', async () => {
        const response: ProductResponse = await strapi.getAllProducts();
        return response;
    }, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    const { data: categories } = useSWR('categories', async () => {
        const response: CategoriesResponse = await strapi.getAllCategories();
        return response;
    }, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    const filterCategories: FilterCategory[] = categories?.data || [];

    useEffect(() => {
        if (data?.data) {
            const filteredProducts = selectedFilters.size > 0
                ? data.data.filter(product =>
                    product.category.id && selectedFilters.has(product.category.id)
                )
                : data.data;
            setDisplayedProducts(filteredProducts);
            setCurrentPage(1); // Reset to first page when filters change
        }
    }, [data, selectedFilters]);

    // Pagination calculations
    const totalPages = Math.ceil(displayedProducts.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = displayedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleFilterClick = (filterId: number) => {
        setSelectedFilters(prev => {
            const newFilters = new Set(prev);
            if (newFilters.has(filterId)) {
                newFilters.delete(filterId);
            } else {
                newFilters.add(filterId);
            }
            return newFilters;
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getSelectedCategoriesNames = () => {
        return Array.from(selectedFilters)
            .map(filter => filterCategories.find(f => f.id === filter)?.name)
            .filter(Boolean)
            .join(', ');
    };

    const toggleFilterMenu = () => {
        setIsFilterOpen((prev) => !prev);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isLoading) return <Loading />
    if (error) return <div>Error...</div>
    if (!data?.data) return (<div>No products found</div>);

    return (
        <div className="flex flex-col bg-paper min-h-screen">
            {/* Header Banner */}
            <div className="flex justify-center items-center bg-[#4A2511] h-32 text-lg text-white">
                San pham Dong y ong but
            </div>

            {/* Main Content */}
            <div className="flex flex-1 justify-center px-4 py-8">
                <div className="flex mobile:flex-col tablet:flex-col gap-8 w-full max-w-7xl">
                    {/* Filter Button for Mobile/Tablet */}
                    <div className="mobile:block tablet:block justify-end hidden p-4 w-full">
                        <button
                            onClick={toggleFilterMenu}
                            className="flex justify-between items-center bg-[#4A2511] p-2 rounded w-full text-white"
                        >
                            <span className="flex items-center">
                                <FaBars className="mr-2" /> Bộ lọc
                            </span>
                            {selectedFilters.size > 0 && (
                                <span className="font-normal text-sm">({getSelectedCategoriesNames()})</span>
                            )}
                        </button>
                        {isFilterOpen && (
                            <div className="top-20 left-0 z-10 absolute bg-white shadow-lg p-4 w-full">
                                <div className="flex justify-between items-center mb-4">
                                    <p className="font-bold font-robotoslab text-[#4A2511] text-xl uppercase">
                                        Danh mục
                                    </p>
                                    <button
                                        onClick={toggleFilterMenu}
                                        className="text-[#4A2511] hover:text-[#4A2511]/70"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {Array.isArray(filterCategories) && filterCategories.map((filter) => (
                                        <button
                                            key={filter.id}
                                            onClick={() => handleFilterClick(filter.id)}
                                            className={`p-2 text-left rounded transition-colors duration-200 text-sm font-robotoflex font-medium ${selectedFilters.has(filter.id)
                                                ? 'bg-[#4A2511] text-white'
                                                : 'bg-[#dad9da] text-[#4A2511] hover:bg-[#4A2511]/10'
                                                }`}
                                        >
                                            {filter.name}
                                        </button>
                                    ))}

                                    {selectedFilters.size > 0 && (
                                        <button
                                            onClick={() => setSelectedFilters(new Set())}
                                            className="mt-4 text-[#4A2511] text-sm hover:text-[#4A2511]/70 underline"
                                        >
                                            Xóa bộ lọc
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Left Sidebar - Filters */}
                    <div className="mobile:hidden tablet:hidden w-1/6">
                        <div className="top-4 sticky">
                            <p className="mb-4 font-bold font-robotoslab text-[#4A2511] text-xl uppercase">
                                Danh mục
                            </p>
                            <div className="flex flex-col gap-2">
                                {Array.isArray(filterCategories) && filterCategories.map((filter) => (
                                    <button
                                        key={filter.id}
                                        onClick={() => handleFilterClick(filter.id)}
                                        className={`p-2 text-left rounded transition-colors duration-200 text-sm font-robotoflex font-medium ${selectedFilters.has(filter.id)
                                            ? 'bg-[#4A2511] text-white'
                                            : 'bg-[#dad9da] text-[#4A2511] hover:bg-[#4A2511]/10'
                                            }`}
                                    >
                                        {filter.name}
                                    </button>
                                ))}
                            </div>

                            {selectedFilters.size > 0 && (
                                <button
                                    onClick={() => setSelectedFilters(new Set())}
                                    className="mt-4 text-[#4A2511] text-sm hover:text-[#4A2511]/70 underline"
                                >
                                    Xóa bộ lọc
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right Content - Products */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <p className="font-bold font-robotoslab text-[#4A2511] text-2xl mobile:text-lg tablet:text-xl uppercase">
                                Danh sách sản phẩm
                                {selectedFilters.size > 0 && (
                                    <span className="ml-2 font-normal text-sm">
                                        ({getSelectedCategoriesNames()})
                                    </span>
                                )}
                            </p>
                            <span className="text-gray-600 text-sm">
                                {displayedProducts.length} sản phẩm
                            </span>
                        </div>

                        <div className="gap-6 grid grid-cols-4 laptop:grid-cols-3 mobile:grid-cols-2 tablet:grid-cols-2">
                            {Array.isArray(currentProducts) && currentProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    image_url={product.Main_image.provider_metadata.public_id}
                                    title={product.Name}
                                    price={product.Price}
                                    slug={product.slug}
                                />
                            ))}
                        </div>

                        {displayedProducts.length === 0 ? (
                            <div className="py-8 text-center text-gray-500">
                                Không tìm thấy sản phẩm nào cho danh mục này
                            </div>
                        ) : (
                            // Pagination Controls
                            <div className="flex justify-center items-center gap-2 mt-8">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="hover:bg-gray-100 disabled:opacity-50 p-2 rounded disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-3 py-1 rounded ${currentPage === page
                                            ? 'bg-[#4A2511] text-white'
                                            : 'hover:bg-gray-100'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="hover:bg-gray-100 disabled:opacity-50 p-2 rounded disabled:cursor-not-allowed"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
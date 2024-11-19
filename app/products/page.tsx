'use client'
import React, { useState, useEffect } from 'react';
import * as strapi from '../../utils/globalApi';
import useSWR from 'swr';
import { CategoriesResponse, FilterCategory, Product, ProductResponse } from "@/utils/api/Product.interface";
import Loading from "@/components/Loading";
import FilterButtons from '@/components/product/FilterButton';
import FilterSidebar from '@/components/product/FilterSideBar';
import ProductList from '@/components/product/ProductList';
import Image from 'next/image';

export default function Products() {
    const [selectedFilters, setSelectedFilters] = useState<Set<number>>(new Set());
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20;

    // Fetch product and category data using useSWR
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

    const clearFilters = () => {
        setSelectedFilters(new Set());
    };

    if (isLoading) return <Loading />
    if (error) return <div>Error...</div>
    if (!data?.data) return (<div>No products found</div>);

    return (
      <div className="flex flex-col  min-h-screen">
        <Image
          src="/images/productbg.png"
          alt="Background"
          fill
          priority
          className="object-cover -z-10"
        />

        <div className="flex flex-col items-center justify-center bg-[#3F291B] w-full h-36 mobile:h-32 tablet:h-40">
          <p className=" font-robotoslab text-[#D7A444] font-semibold text-2xl text-left mobile:text-2xl tablet:text-2xl mini-laptop:text-2xl">
            {" "}
            SẢN PHẨM ĐÔNG Y ÔNG BỤT{" "}
          </p>
        </div>
        <div className="flex flex-1 justify-center px-4 py-8">
          <div className="flex mobile:flex-col tablet:flex-col gap-8 w-full max-w-7xl">
            <FilterButtons
              isFilterOpen={isFilterOpen}
              selectedFilters={selectedFilters}
              toggleFilterMenu={toggleFilterMenu}
              getSelectedCategoriesNames={getSelectedCategoriesNames}
              filterCategories={filterCategories}
              handleFilterClick={handleFilterClick}
              clearFilters={clearFilters}
            />

            <FilterSidebar
              filterCategories={filterCategories}
              selectedFilters={selectedFilters}
              handleFilterClick={handleFilterClick}
              clearFilters={clearFilters}
            />

            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h1 className="font-bold font-robotoslab text-[#4A2511] text-2xl mobile:text-xl">
                  DANH SÁCH SẢN PHẨM
                  {selectedFilters.size > 0 && (
                    <span className="ml-2 font-normal text-base">
                      ({getSelectedCategoriesNames()})
                    </span>
                  )}
                </h1>
                <span className="text-gray-600 text-sm">
                  {selectedFilters.size > 0
                    ? `${displayedProducts.length}/${data.meta.pagination.total} sản phẩm`
                    : `${data.meta.pagination.total} sản phẩm`}
                </span>
              </div>
              <ProductList
                displayedProducts={currentProducts}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
}
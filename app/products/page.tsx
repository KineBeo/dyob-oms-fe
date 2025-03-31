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
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import { MeiliSearch } from 'meilisearch';
import debounce from 'lodash.debounce';

// Khởi tạo client Meilisearch
const client = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILISEARCH_HOST as string,
  apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY as string, 
});

export default function Products() {
  const [selectedFilters, setSelectedFilters] = useState<Set<number>>(new Set());
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const productsPerPage = 20;

  // Fetch dữ liệu sản phẩm và danh mục bằng useSWR
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

  // Cập nhật danh sách sản phẩm hiển thị khi dữ liệu hoặc bộ lọc thay đổi
  useEffect(() => {
    if (data?.data) {
      const filteredProducts = selectedFilters.size > 0
        ? data.data.filter(product =>
            product.category.id && selectedFilters.has(product.category.id)
          )
        : data.data;
      setDisplayedProducts(filteredProducts);
      setCurrentPage(1); // Reset về trang đầu tiên khi bộ lọc thay đổi
    }
  }, [data, selectedFilters]);

  // Hàm tìm kiếm với debounce
  const debouncedSearch = debounce(async (query: string) => {
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    if (searchQuery.trim() !== '') {
      setSelectedFilters(new Set()); // Xóa bộ lọc khi tìm kiếm
    }
    try {
      const index = client.index('product');
      const searchResponse = await index.search(query);
      setSearchResults(searchResponse.hits as Product[]);
    } catch (error) {
      console.error('Lỗi tìm kiếm:', error);
    }
  }, 300); // Debounce 300ms

  // Theo dõi thay đổi của searchQuery
  useEffect(() => {
    debouncedSearch(searchQuery);
    setCurrentPage(1);
  }, [searchQuery]);

  // Quyết định danh sách sản phẩm hiển thị: toàn bộ sản phẩm hoặc kết quả tìm kiếm
  const productsToDisplay = searchQuery.trim() === '' ? displayedProducts : searchResults;

  // Tính toán phân trang
  const totalPages = Math.ceil(productsToDisplay.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsToDisplay.slice(indexOfFirstProduct, indexOfLastProduct);

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

  if (isLoading) return <Loading />;
  if (error) return <div>Error...</div>;
  if (!data?.data) return <div>No products found</div>;

  return (
    <div className="flex flex-col min-h-screen relative">
      <Image
        src="/images/productbg.png"
        alt="Background"
        priority
        layout="fill"
        loading="eager"
        className="object-cover -z-10"
        placeholder="empty"
        quality={50}
      />
      <div className="flex flex-col items-center justify-center bg-[#3F291B] w-full h-36 mobile:h-32 tablet:h-40">
        <p className="font-robotoslab text-[#D7A444] font-semibold text-2xl text-left mobile:text-2xl tablet:text-2xl mini-laptop:text-2xl">
          SẢN PHẨM ĐÔNG Y ÔNG BỤT
        </p>
      </div>

      <div className="flex justify-center px-4 py-4">
        <Breadcrumbs className="w-full max-w-7xl">
          <BreadcrumbItem className="font-medium">Trang chủ</BreadcrumbItem>
          <BreadcrumbItem className="text-[#D7A444] font-bold">Sản phẩm</BreadcrumbItem>
        </Breadcrumbs>
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

            {/* Thanh tìm kiếm */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
              className="border p-2 w-full rounded mb-6"
            />

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
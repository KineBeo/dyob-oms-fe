import ProductCard from "@/components/cards/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/utils/api/Product.interface";

interface ProductListProps {
    displayedProducts: Product[];
    currentPage: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
}

function ProductList(props: ProductListProps) {
    const { displayedProducts, currentPage, totalPages, handlePageChange } = props;

    return (
        <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
                {/* Product list header */}
            </div>

            <div className="gap-6 grid grid-cols-4 laptop:grid-cols-3 mini-laptop:grid-cols-3 mobile:grid-cols-2 tablet:grid-cols-2">
                {displayedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        image_url={product.Main_image.provider_metadata.public_id}
                        title={product.Name}
                        price={product.Price}
                        old_price={product.old_price ?? ""}
                        slug={product.slug}
                    />
                ))}
            </div>

            {displayedProducts.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                    Không tìm thấy sản phẩm nào cho danh mục này
                </div>
            ) : (
                // Pagination controls
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
    );
}

export default ProductList;
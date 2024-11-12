import { FilterCategory } from "@/utils/api/Product.interface";

interface FilterSidebarProps {
    filterCategories: FilterCategory[];
    selectedFilters: Set<number>;
    handleFilterClick: (filterId: number) => void;
    clearFilters: () => void;
}

function FilterSidebar(props: FilterSidebarProps) {
    const { filterCategories, selectedFilters, handleFilterClick, clearFilters } = props;

    return (
        <div className="mobile:hidden tablet:hidden w-1/6">
            <div className="top-4 sticky">
                <p className="mb-4 font-bold font-robotoslab text-[#4A2511] text-xl uppercase">
                    Danh mục
                </p>
                <div className="flex flex-col gap-2">
                    {filterCategories.map((filter) => (
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
                        onClick={clearFilters}
                        className="mt-4 text-[#4A2511] text-sm hover:text-[#4A2511]/70 underline"
                    >
                        Xóa bộ lọc
                    </button>
                )}
            </div>
        </div>
    );
}

export default FilterSidebar;
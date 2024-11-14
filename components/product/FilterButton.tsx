import { FilterCategory } from "@/utils/api/Product.interface";
import { FaBars, FaTimes } from "react-icons/fa";
import FilterSidebar from "./FilterSideBar";

interface FilterButtonsProps {
    isFilterOpen: boolean;
    selectedFilters: Set<number>;
    toggleFilterMenu: () => void;
    getSelectedCategoriesNames: () => string;
    filterCategories: FilterCategory[];
    handleFilterClick: (filterId: number) => void;
    clearFilters: () => void;
}

function FilterButtons(props: FilterButtonsProps) {
    const { isFilterOpen, selectedFilters, toggleFilterMenu, getSelectedCategoriesNames, filterCategories, handleFilterClick, clearFilters } = props;

    return (
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
                    <div className="w-full">
                        <div className="top-4 sticky">
                            <div className="flex justify-between items-center mb-4">
                                <p className="font-bold font-robotoslab text-[#4A2511] text-xl uppercase">
                                    Danh mục
                                </p>
                                <button
                                    onClick={toggleFilterMenu}
                                    className="hover:bg-gray-100 p-2 rounded-full transition-colors duration-200"
                                    aria-label="Close menu"
                                >
                                    <FaTimes className="text-[#4A2511] text-xl" />
                                </button>
                            </div>
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
                                <div className="bottom-0 left-0 fixed flex justify-center border-gray-200 bg-white p-4 border-t w-full">
                                    <button
                                        onClick={clearFilters}
                                        className="flex items-center bg-[#4A2511]/10 hover:bg-[#4A2511]/20 px-6 py-2 rounded-full font-medium text-[#4A2511] text-sm transition-colors duration-200"
                                    >
                                        <FaTimes className="mr-2" />
                                        Xóa bộ lọc ({selectedFilters.size})
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FilterButtons;
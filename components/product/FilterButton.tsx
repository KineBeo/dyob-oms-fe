import { FaBars, FaTimes } from "react-icons/fa";

interface FilterButtonsProps {
    isFilterOpen: boolean;
    selectedFilters: Set<number>;
    toggleFilterMenu: () => void;
    getSelectedCategoriesNames: () => string;
}

function FilterButtons(props: FilterButtonsProps) {
    const { isFilterOpen, selectedFilters, toggleFilterMenu, getSelectedCategoriesNames } = props;

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
                    {/* Filter menu content */}
                </div>
            )}
        </div>
    );
}

export default FilterButtons;
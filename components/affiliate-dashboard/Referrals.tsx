import React, { useState } from 'react';
import { ChevronRight, ChevronDown, UserPlus, Download, Table, LayoutGrid } from 'lucide-react';
import { Referral, UserStatus } from '@/interfaces/user-status';
import * as XLSX from "xlsx";

const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

// Hàm chuyển đổi dữ liệu phân cấp thành mảng phẳng
const flattenReferrals = (referrals: Referral[], level = 1): any[] => {
    return referrals.reduce((acc: any[], referral: Referral) => {
        const flatItem = {
            'Cấp': level,
            'Họ tên': referral.fullname,
            'Cấp bậc': referral.user_rank,
            'Doanh số': referral.total_sales,
            'Người giới thiệu': referral.referrer_name || 'Không có',
            'Ngày tham gia': formatDate(referral.createdAt),
        };

        acc.push(flatItem);

        if (referral.referrals && referral.referrals.length > 0) {
            acc.push(...flattenReferrals(referral.referrals, level + 1));
        }

        return acc;
    }, []);
};

// Hàm xuất excel
const exportToXLSX = (userStatus: UserStatus) => {
  const flatData = flattenReferrals(userStatus.referrals);

  // Tạo workbook và worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(flatData, {
    header: [
      "Cấp",
      "Họ tên",
      "Cấp bậc",
      "Doanh số",
      "Người giới thiệu",
      "Ngày tham gia",
    ],
  });

  // Set column widths
  const colWidths = [
    { wch: 8 }, // Cấp
    { wch: 25 }, // Họ tên
    { wch: 15 }, // Cấp bậc
    { wch: 15 }, // Doanh số
    { wch: 25 }, // Người giới thiệu
    { wch: 25 }, // Ngày tham gia
  ];
  ws["!cols"] = colWidths;

  // Format currency column (Doanh số)
  const numberFormat = "#,##0";
  const range = XLSX.utils.decode_range(ws["!ref"] || "A1");
  for (let R = range.s.r; R <= range.e.r; R++) {
    const cell = ws[XLSX.utils.encode_cell({ r: R, c: 3 })]; // Column D (Doanh số)
    if (cell && cell.v) {
      cell.z = numberFormat;
    }
  }

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "Mạng lưới giới thiệu");

  // Save file
  XLSX.writeFile(
    wb,
    `network_referrals_${new Date().toISOString().split("T")[0]}.xlsx`
  );
};


const ReferralItem = ({ referral, depth = 0 }: { referral: Referral, depth?: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasChildren = referral.referrals && referral.referrals.length > 0;

    return (
        <div className={`pl-${depth * 4} border-l-2 border-gray-200`}>
            <div
                className="flex items-center hover:bg-gray-100 p-2 rounded cursor-pointer"
                onClick={() => hasChildren && setIsExpanded(!isExpanded)}
            >
                {hasChildren ? (
                    isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                ) : (
                    <UserPlus size={16} className="text-black" />
                )}

                <div className="flex-1 ml-2">
                    <div className="font-medium">{referral.fullname}</div>
                    <div className="text-black text-xs">
                        Cấp bậc: {referral.user_rank} |
                        Doanh số: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                            .format(Number(referral.total_sales))} | Chi tiêu: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                .format(Number(referral.total_purchase))}
                    </div>
                </div>
            </div>

            {isExpanded && hasChildren && (
                <div className="ml-4 border-l border-dashed">
                    {referral.referrals.map(subReferral => (
                        <ReferralItem
                            key={subReferral.id}
                            referral={subReferral}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const ReferralTable = ({ data }: { data: any[] }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {Object.keys(data[0] || {}).map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-300 transition-colors">
              {Object.values(row).map((value: any, i) => (
                <td
                  key={i}
                  className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap"
                >
                  {typeof value === "number" &&
                  !Object.keys(row)[i].includes("Cấp")
                    ? new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(value)
                    : value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const Referrals = ({ userStatus }: { userStatus: UserStatus }) => {
  const [viewMode, setViewMode] = useState<"tree" | "table">("tree");
  const [currentPage, setCurrentPage] = useState(1); // State quản lý trang hiện tại
  const ITEMS_PER_PAGE = 10; // Số dòng mỗi trang

  const flatData = flattenReferrals(userStatus.referrals);

  // Sắp xếp dữ liệu theo cấp
  const sortedData = flatData.sort((a, b) => a["Cấp"] - b["Cấp"]);

  // Tính toán dữ liệu hiển thị trên trang hiện tại
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentData = sortedData.slice(startIndex, endIndex);

  // Xử lý chuyển trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="border-gray-300 bg-white border rounded-lg">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Mạng lưới giới thiệu</h3>
          <div className="flex gap-2">
            <button
              onClick={() =>
                setViewMode(viewMode === "tree" ? "table" : "tree")
              }
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded text-gray-700 text-sm transition-colors"
            >
              {viewMode === "tree" ? (
                <Table size={16} />
              ) : (
                <LayoutGrid size={16} />
              )}
              {viewMode === "tree" ? "Xem dạng bảng" : "Xem dạng cây"}
            </button>
            <button
              onClick={() => exportToXLSX(userStatus)}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded text-sm text-white transition-colors"
            >
              <Download size={16} />
              Xuất dữ liệu
            </button>
          </div>
        </div>
        <div className="text-black text-md">
          <div>Cấp bậc: {userStatus.user_rank}</div>
          <div>
            Cá nhân đã chi tiêu:{" "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(userStatus.total_purchase)}
          </div>
          <div>
            Doanh số cá nhân:{" "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(userStatus.total_sales)}
          </div>
          <div className="font-bold mobile:text-xl text-blue-600 text-2xl">
            Thưởng:{" "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(userStatus.bonus)}
          </div>
          <div className="font-bold mobile:text-xl text-green-600 text-2xl">
            Hoa hồng:{" "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(Number(userStatus.commission))}
          </div>
        </div>
      </div>

      <div className="p-4">
        {userStatus.referrals && userStatus.referrals.length > 0 ? (
          viewMode === "tree" ? (
            userStatus.referrals.map((referral) => (
              <ReferralItem key={referral.id} referral={referral} />
            ))
          ) : (
            <>
              <ReferralTable data={currentData} />
              {/* Phần phân trang */}
              {totalPages > 0 && (
                <div className="flex justify-between items-center mt-4 px-4">
                  <div className="text-sm text-gray-600">
                    Hiển thị {startIndex + 1}-{endIndex} trong số {totalItems}{" "}
                    mục
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Trước
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-1 border rounded-md text-sm ${
                            currentPage === page
                              ? "bg-blue-50 text-blue-600 border-blue-200"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Sau
                    </button>
                  </div>
                </div>
              )}
            </>
          )
        ) : (
          <p className="text-center text-gray-500">
            Chưa có người được giới thiệu
          </p>
        )}
      </div>
    </div>
  );
};
export default Referrals;
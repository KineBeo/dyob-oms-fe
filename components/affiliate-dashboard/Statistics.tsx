import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loading from "../Loading";
import { userStatusService } from "@/utils/user-status/userStatus";
import toast from "react-hot-toast";
import {vi} from "date-fns/locale/vi";
import * as XLSX from "xlsx";
import { Download } from "lucide-react";



const vietnameseLocale = {
  ...vi,
  options: {
    ...vi.options,
    weekStartsOn: 1,
  },
};

// Đăng ký locale
registerLocale("vi", vietnameseLocale);

interface Transaction {
  date: string;
  commission_amount: string;
  bonus_amount: string;
  purchase_amount: string;
  sale_amount: string;
  commission_count: string;
  bonus_count: string;
  purchase_count: string;
  sale_count: string;
}

interface StatisticsData {
  userTransactions: Transaction[];
  period: {
    month: string;
    year: string;
  };
}

const ITEMS_PER_PAGE = 10; // Số dòng mỗi trang


// Hàm xuất CSV

const Statistics = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [stats, setStats] = useState<StatisticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await userStatusService.getMonthlyStats(
          selectedDate.getMonth() + 1,
          selectedDate.getFullYear()
        );
        setStats(data);
        setCurrentPage(1); // Reset về trang 1 khi thay đổi tháng
      } catch (error) {
        toast.error("Không thể tải dữ liệu thống kê");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [selectedDate]);

  const handleMonthChange = (
    date: Date | null,
    event?: React.SyntheticEvent<any, Event> | undefined
  ) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  // Hàm xuất CSV 
  const exportToExcel = () => {
    if (!stats?.userTransactions) return;

    // Tạo dữ liệu cho file Excel
    const excelData = stats.userTransactions.map((transaction) => ({
      Ngày: new Date(transaction.date).toLocaleDateString("vi-VN"),
      "Doanh số bán": Number(transaction.sale_amount),
      "Hoa hồng": Number(transaction.commission_amount),
      Thưởng: Number(transaction.bonus_amount),
      "Mua hàng": Number(transaction.purchase_amount),
      "Số đơn bán": Number(transaction.sale_count),
      "Số đơn hoa hồng": Number(transaction.commission_count),
      "Số đơn thưởng": Number(transaction.bonus_count),
      "Số đơn mua": Number(transaction.purchase_count),
    }));

    // Thêm dòng tổng cộng
    const totalsRow = {
      Ngày: "Tổng cộng",
      "Doanh số bán": stats.userTransactions.reduce(
        (sum, t) => sum + Number(t.sale_amount),
        0
      ),
      "Hoa hồng": stats.userTransactions.reduce(
        (sum, t) => sum + Number(t.commission_amount),
        0
      ),
      Thưởng: stats.userTransactions.reduce(
        (sum, t) => sum + Number(t.bonus_amount),
        0
      ),
      "Mua hàng": stats.userTransactions.reduce(
        (sum, t) => sum + Number(t.purchase_amount),
        0
      ),
      "Số đơn bán": stats.userTransactions.reduce(
        (sum, t) => sum + Number(t.sale_count),
        0
      ),
      "Số đơn hoa hồng": stats.userTransactions.reduce(
        (sum, t) => sum + Number(t.commission_count),
        0
      ),
      "Số đơn thưởng": stats.userTransactions.reduce(
        (sum, t) => sum + Number(t.bonus_count),
        0
      ),
      "Số đơn mua": stats.userTransactions.reduce(
        (sum, t) => sum + Number(t.purchase_count),
        0
      ),
    };

    // Gộp dữ liệu và dòng tổng
    const allData = [...excelData, totalsRow];

    // Tạo workbook và worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(allData, {
      header: [
        "Ngày",
        "Doanh số bán",
        "Hoa hồng",
        "Thưởng",
        "Mua hàng",
        "Số đơn bán",
        "Số đơn hoa hồng",
        "Số đơn thưởng",
        "Số đơn mua",
      ],
    });

    // Set column widths
    const colWidths = [
      { wch: 15 }, // Ngày
      { wch: 15 }, // Doanh số bán
      { wch: 15 }, // Hoa hồng
      { wch: 15 }, // Thưởng
      { wch: 15 }, // Mua hàng
      { wch: 12 }, // Số đơn bán
      { wch: 15 }, // Số đơn hoa hồng
      { wch: 12 }, // Số đơn thưởng
      { wch: 12 }, // Số đơn mua
    ];
    ws["!cols"] = colWidths;

    // Format currency columns
    const numberFormat = "#,##0";
    const range = XLSX.utils.decode_range(ws["!ref"] || "A1");
    for (let R = range.s.r; R <= range.e.r; R++) {
      for (let C = 1; C <= 4; C++) {
        // Columns B to E (currency columns)
        const cell = ws[XLSX.utils.encode_cell({ r: R, c: C })];
        if (cell && cell.v) {
          cell.z = numberFormat;
        }
      }
    }

    // Add to workbook
    XLSX.utils.book_append_sheet(
      wb,
      ws,
      `Thống kê tháng ${stats.period.month}`
    );

    // Save file
    XLSX.writeFile(
      wb,
      `thong-ke-thang-${stats.period.month}-${stats.period.year}.xlsx`
    );
  };



  // Tính toán các thông số phân trang
  const totalItems = stats?.userTransactions.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentTransactions =
    stats?.userTransactions.slice(startIndex, endIndex) || [];

  // Xử lý chuyển trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      {/* Month Picker */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Thống kê tháng {stats?.period.month}/{stats?.period.year}
        </h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => exportToExcel()}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded text-sm text-white transition-colors"
          >
            <Download size={16} />
            Xuất dữ liệu
          </button>
          <div className="relative">
            <DatePicker
              locale={vietnameseLocale}
              selected={selectedDate}
              onChange={handleMonthChange}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-600 font-medium">Doanh số cá nhân</p>
          <p className="text-2xl font-bold text-blue-700 mt-2">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(
              stats?.userTransactions.reduce(
                (sum, t) => sum + Number(t.sale_amount),
                0
              ) || 0
            )}
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-sm text-green-600 font-medium">Hoa hồng</p>
          <p className="text-2xl font-bold text-green-700 mt-2">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(
              stats?.userTransactions.reduce(
                (sum, t) => sum + Number(t.commission_amount),
                0
              ) || 0
            )}
          </p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-600 font-medium">Thưởng</p>
          <p className="text-2xl font-bold text-purple-700 mt-2">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(
              stats?.userTransactions.reduce(
                (sum, t) => sum + Number(t.bonus_amount),
                0
              ) || 0
            )}
          </p>
        </div>
      </div>

      {/* Table with Pagination */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 text-left text-md font-medium text-gray-700">
                Ngày
              </th>
              <th className="p-4 text-right text-md font-medium text-gray-700">
                Doanh số bán
              </th>
              <th className="p-4 text-right text-md font-medium text-gray-700">
                Hoa hồng
              </th>
              <th className="p-4 text-right text-md font-medium text-gray-700">
                Thưởng
              </th>
              <th className="p-4 text-right text-md font-medium text-gray-700">
                Mua hàng
              </th>
            </tr>
          </thead>

          <tbody>
            {currentTransactions.map((transaction) => (
              <tr key={transaction.date} className="border-b hover:bg-gray-50">
                <td className="p-4 text-sm text-gray-900">
                  {new Date(transaction.date).toLocaleDateString("vi-VN")}
                </td>
                <td className="p-4 text-right text-sm font-medium text-blue-600">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(Number(transaction.sale_amount))}
                </td>
                <td className="p-4 text-right text-sm font-medium text-green-600">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(Number(transaction.commission_amount))}
                </td>
                <td className="p-4 text-right text-sm font-medium text-purple-600">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(Number(transaction.bonus_amount))}
                </td>
                <td className="p-4 text-right text-sm font-medium text-red-600">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(Number(transaction.purchase_amount))}
                </td>
              </tr>
            ))}
          </tbody>

          {/* Footer with totals */}
          {stats && (
            <tfoot className="bg-gray-50">
              <tr>
                <td className="p-4 text-sm font-medium">Tổng cộng</td>
                <td className="p-4 text-right text-sm font-medium text-blue-600">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    stats.userTransactions.reduce(
                      (sum, t) => sum + Number(t.sale_amount),
                      0
                    )
                  )}
                </td>
                <td className="p-4 text-right text-sm font-medium text-green-600">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    stats.userTransactions.reduce(
                      (sum, t) => sum + Number(t.commission_amount),
                      0
                    )
                  )}
                </td>
                <td className="p-4 text-right text-sm font-medium text-purple-600">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    stats.userTransactions.reduce(
                      (sum, t) => sum + Number(t.bonus_amount),
                      0
                    )
                  )}
                </td>
                <td className="p-4 text-right text-sm font-medium text-red-600">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    stats.userTransactions.reduce(
                      (sum, t) => sum + Number(t.purchase_amount),
                      0
                    )
                  )}
                </td>
              </tr>
            </tfoot>
          )}
        </table>

        {/* Pagination Controls */}
        {totalPages > 0 && (
          <div className="flex justify-between items-center mt-4 px-4">
            <div className="text-sm text-gray-600">
              Hiển thị {startIndex + 1}-{endIndex} trong số {totalItems} mục
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
      </div>
    </div>
  );
};

export default Statistics;

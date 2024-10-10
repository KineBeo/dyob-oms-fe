

const locationCard = () => (
  <div className="relative overflow-hidden rounded-lg">
    <img 
      src="/api/placeholder/600/400" 
      alt="Traditional medicine preparation"
      className="w-full object-cover"
    />
    <div className="absolute bottom-0 left-0 right-0 bg-amber-500 p-4">
      <h3 className="text-center text-white text-xl font-semibold mb-4">
        ĐÔNG Y ÔNG BỤT - HÀ NỘI
      </h3>
      <div className="flex justify-center gap-4">
        <button className="bg-white text-amber-500 px-4 py-2 rounded-full flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          TÌM ĐƯỜNG
        </button>
        <button className="bg-white text-amber-500 px-4 py-2 rounded-full flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          CHI TIẾT
        </button>
      </div>
    </div>
  </div>
);
export default function Address() {

return (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <h1 className="text-4xl font-bold text-center text-red-800 mb-6">
      HỆ THỐNG CƠ SỞ ĐÔNG Y ÔNG BỤT
    </h1>

    <p className="text-center text-gray-700 mb-8 max-w-3xl mx-auto">
      Đông y Ông Bụt với hệ thống 2 phòng khám tại Hà Nội và Hồ Chí Minh, được
      Sở Y Tế cấp phép hoạt động, địa chỉ rõ ràng, mỗi năm tiếp đón hàng chục
      ngàn lượt bệnh nhân:
    </p>

    <div className="grid md:grid-cols-2 gap-8">
      {locationCard()}
      {locationCard()}
    </div>
  </div>
);

}
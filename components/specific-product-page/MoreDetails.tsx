const MoreDetails = () => {
  return (
    <div className="max-w-7xl mx-auto ">
      <div className="bg-[#f9f3ea] p-4  drop-shadow-md">
        <h2 className="text-2xl font-bold text-[#3F291B] ">
          Chi tiết sản phẩm
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-8 px-6 items-center">
        <div className="md:w-3/5 mt-4">
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-[#7A0505] mb-3 pt-2">
              An Vị Khang Ông Bụt là ...
            </h3>
            <p className="text-gray-700">
              Sản phẩm gồm các thành phần: thục địa, nghệ vàng, bạch truật, hoàng kỳ, cao phụ tử, quế, mộc hương,...
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-[#7A0505] mb-3">
              Công dụng
            </h3>
            <p className="text-gray-700">
              Giúp tăng cường khí huyết tuyến tuỵ qua đó dạ dày có nhiều năng lượng hơn cho việc tiêu hoá thức ăn. 
              Không ứ trệ, không đầy hơi, tiêu hoá nhanh.<br></br>
            	Tạo môi trường thuận lợi cho hệ vi sinh có lợi trong dạ dày, 
              giảm hoặc triệt tiêu vi khuẩn HP là nguyên nhân chính gây viêm loét dạ dày.<br></br>
            	Tăng cường làm mới niêm mạc dạ dày, tiêu diệt vi khuẩn HP, làm sạch môi trường
              dạ dày giúp tiêu hoá hiệu quả, tăng sức đề kháng cơ thể.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-[#7A0505] mb-3">
              Cách dùng
            </h3>
            <p className="text-gray-700">
            Ngày uống 2 lần sáng và tối, liều lượng 3-5ml/lần. <br></br>
            Uống trước các bữa ăn 15-20 phút.

            </p>
          </section>
        </div>

        <div className="md:w-2/5">
          <img
            src="/images/product.png"
            alt="An vị khang Ông bụt"
            className="w-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default MoreDetails;

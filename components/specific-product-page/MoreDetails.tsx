const MoreDetails = () => {
  return (
    <div className="max-w-7xl mx-auto ">
      <div className="bg-[#f9f3ea] p-4  drop-shadow-md">
        <h2 className="text-2xl font-bold text-[#3F291B] ">
          CHI TIẾT SẢN PHẨM
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-8 px-6 items-center ">
        <div className="md:w-3/5">
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-[#7A0505] mb-3">
              An vị khang Ông bụt là ...
            </h3>
            <p className="text-gray-700">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting,
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-[#7A0505] mb-3">
              Công dụng
            </h3>
            <p className="text-gray-700">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting,
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-[#7A0505] mb-3">
              Cách dùng
            </h3>
            <p className="text-gray-700">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting,
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

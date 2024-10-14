
const teamMembers = [
  {
    id: 1,
    name: "NHỮ ĐÌNH TÚ",
    role: "Tổng Giám đốc",
    image: "/images/homepage/boss.png",
    isMain: true,
  },
  {
    id: 2,
    name: "Bác sĩ A",
    role: "Chuyên khoa",
    image: "/images/homepage/doctor.png",
  },
  {
    id: 3,
    name: "Bác sĩ B",
    role: "Chuyên khoa",
    image: "/images/homepage/doctor.png",
  },
  {
    id: 4,
    name: "Bác sĩ C",
    role: "Chuyên khoa",
    image: "/images/homepage/doctor.png",
  },
];

export default function OurMembers() {
      const mainDoctor = teamMembers.find((member) => member.isMain);
      const otherDoctors = teamMembers.filter((member) => !member.isMain);
    return (
      <div className="relative">
        {/* Split background */}
        <div className="absolute inset-0">
          <div className="h-1/2 bg-[#3F291B]" />
          <div className="h-1/2 bg-[#FDFAF4]" />
        </div>

        <section className="relative z-10 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              ĐỘI NGŨ ĐÔNG Y ÔNG BỤT
              <div className="w-24 h-1 bg-[#D7A444] mx-auto mt-2"></div>
            </h2>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Main doctor */}
              <div className="flex flex-col md:w-1/2 justify-center items-center">
                <div className="rounded-lg overflow-hidden shadow-lg w-3/5  mobile:w-full ">
                  <img
                    src={mainDoctor?.image}
                    alt={mainDoctor?.name}
                    width={400}
                    height={500}
                  />
                </div>
                <div className="mt-4 bg-white p-4 rounded-lg shadow-md relative w-3/5 ">
                  <h3 className="text-2xl font-bold text-[#7A0505]">
                    {mainDoctor?.name}
                  </h3>
                  <p className="text-[#D7A444] italic font-normal">
                    {mainDoctor?.role}
                  </p>
                </div>
              </div>

              {/* Other doctors */}
              <div className="md:w-1/2 grid grid-cols-3 gap-4 mt-6 md:mt-auto">
                {otherDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="rounded-lg overflow-hidden shadow-lg"
                  >
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
}

export default function ImageAndDes() {
  return (
    <section className="w-full py-8 px-4 md:py-12">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col desktop:flex-row laptop:flex-row items-center">
          {/* Image container */}
          <div className="w-full mb-6">
            <img
              src="images/aboutusnormal/placeholder.png"
              alt="Traditional healing"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Text content */}
          <div className="text-center max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#582F0E]">
              Traditional Healing Wisdom
            </h2>

            <p className="text-gray-700 mb-4 text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <p className="text-gray-700 mb-6 text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <button className="bg-[#8B0000] text-white px-6 py-2 rounded-md hover:bg-[#A52A2A] transition-colors text-sm md:text-base">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

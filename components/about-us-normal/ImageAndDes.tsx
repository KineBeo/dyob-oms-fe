import { Divider } from "@nextui-org/react";

export default function ImageAndDes() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 pb-4 pt-12">
      <div className="w-full mobile:mb-4 tablet:mb-4 mb-6 items-center justify-center flex flex-col">
        <p className="mobile:text-3xl tablet:text-3xl text-4xl font-robotoslab font-bold text-center p-2 text-[#4A2511]">
          Giới thiệu
        </p>
        <Divider className="w-24 h-1 bg-[#D7A444]" />
      </div>

      <div className="grid mobile:grid-cols-1 tablet:grid-cols-1 grid-cols-2 gap-4 items-start justify-between">
        {/* Text content */}
        <div className="w-full space-y-4">
          <p className="mobile:text-base tablet:text-base text-lg desktop:text-xl font-robotoflex">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>

          <p className="mobile:text-base tablet:text-base text-lg desktop:text-xl font-robotoflex">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        {/* Image container */}
        <div className="w-full">
          <img
            src="images/aboutusnormal/placeholder.png"
            alt="Traditional healing"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
}

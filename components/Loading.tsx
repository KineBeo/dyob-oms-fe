// components/Loading.tsx
import Image from "next/image";

const Loading = () => {


  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="animate-bounce ">
        <Image
          src="/images/logo-image.png"
          alt="Đông Y Ông Bụt Logo"
          width={100}
          height={100}
          priority
          loading="eager"
          className="w-auto mobile:w-14 h-auto mobile:h-14 hover:scale-110 transition"
        />
      </div>
      <div className="ml-2 animate-pulse">
        <div className="font-semibold text-text-brown-primary mobile:text-md tablet:text-lg mini-laptop:text-lg laptop:text-xl desktop:text-xl">
          Đông Y Ông Bụt
        </div>
        <div className="text-text-brown-primary mobile:text-sm tablet:text-md mini-laptop:text-md laptop:text-lg desktop:text-lg">
          Vì sao con khóc
        </div>
      </div>
    </div>
  );
};



export default Loading;

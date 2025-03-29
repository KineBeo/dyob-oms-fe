import React from 'react';
import { Button } from "@nextui-org/react";
import { ShoppingCart } from "lucide-react";
import { useRouter } from 'next/navigation';

const BuyNowButton = () => {
  const router = useRouter();

  return (
    <>
      <style jsx global>{`
        @keyframes wiggle {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>

      <div className="flex items-center gap-2  cursor-pointer  transition-transform hover:scale-110 "
        onClick={() => router.push('/products')}
      >
        <Button
          isIconOnly
          radius="full"
          className="w-10 h-10 bg-transparent bg-amber-600  shadow-none  animate-[wiggle_1s_ease-in-out_infinite]"
          aria-label="Mua ngay"
        >
          <ShoppingCart className="text-white" size={24} />
        </Button>
        <div className="text-amber-600 text-large font-semibold">Mua ngay</div>
      </div>
    </>
  );
};

export default BuyNowButton;

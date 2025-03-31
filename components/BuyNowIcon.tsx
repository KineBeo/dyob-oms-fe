import React from 'react';
import { Button, Tooltip } from "@nextui-org/react";
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

      <Tooltip
        content="Mua ngay"
        placement="right"
        isOpen={true}
        classNames={{
          content: "text-lg font-semibold"
        }}
        motionProps={{
            variants: {
              exit: {
                opacity: 0,
                transition: {
                  duration: 0.1,
                  ease: "easeIn",
                }
              },
              enter: {
                opacity: 1,
                transition: {
                  duration: 0.15,
                  ease: "easeOut",
                }
              },
            },
          }}
      >
        <Button
          isIconOnly
          onClick={() => router.push('/products')}
          radius="full"
          className="w-10 h-10 bg-amber-500 hover:bg-amber-600 animate-[wiggle_1s_ease-in-out_infinite] transition-transform hover:scale-110"
          aria-label="Mua ngay"
        >
          <ShoppingCart 
            className="text-white group-hover:scale-110 transition-transform" 
            size={24}
          />
        </Button>
      </Tooltip>
    </>
  );
};

export default BuyNowButton;
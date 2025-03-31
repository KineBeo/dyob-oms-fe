import React from 'react';
import { Button } from "@nextui-org/react";
import { ShoppingCart } from "lucide-react";
import { useRouter } from 'next/navigation';

const BuyNowButton = () => {
  const router = useRouter();

  return (
    <div className="relative inline-block cursor-pointer" onClick={() => router.push('/products')}>
      <style jsx global>{`
        @keyframes wiggle {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
          100% { transform: rotate(0deg); }
        }
        
        .nextui-like-tooltip {
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 10px;
          background-color: #fff;
          color: #000;
          padding: 6px 10px;
          border-radius: 16px;
          font-weight: 800;
          font-size: 1.125rem;
          white-space: nowrap;
          z-index: 1000;
          box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .nextui-like-tooltip::before {
          content: "";
          position: absolute;
          top: 50%;
          right: 100%;
          transform: translateY(-50%);
          border-width: 6px;
          border-style: solid;
          border-color: transparent rgba(0, 0, 0, 0.1) transparent transparent;
        }
        
        .nextui-like-tooltip::after {
          content: "";
          position: absolute;
          top: 50%;
          right: 100%;
          transform: translateY(-50%);
          border-width: 5px;
          border-style: solid;
          border-color: transparent #fff transparent transparent;
          margin-right: 1px;
        }
      `}</style>
      
      <Button 
        isIconOnly 
        radius="full"
        onClick={() => router.push('/products')}
        className="w-10 h-10 bg-amber-500 hover:bg-amber-600 animate-[wiggle_1s_ease-in-out_infinite] transition-transform hover:scale-110"
        aria-label="Mua ngay"
      >
        <ShoppingCart className="text-white group-hover:scale-110 transition-transform" size={24} />
      </Button>
      
      <div className="nextui-like-tooltip">
        Mua ngay
      </div>
    </div>
  );
};

export default BuyNowButton;
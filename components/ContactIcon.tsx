"use client";
import {
  FaFacebookMessenger,
  FaPhone,
} from "react-icons/fa";
import Link from "next/link";
import { SiZalo } from "react-icons/si";
const ContactIcons = () => {
  return (
    <>
      <style jsx global>{`
        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .ripple-container::before,
        .ripple-container::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background: #f59e0b; /* amber-500 */
          animation: ripple 2s infinite cubic-bezier(0.4, 0, 0.6, 1);
        }

        .ripple-container::after {
          animation-delay: 1s;
        }
      `}</style>

      <div className="fixed right-4 bottom-4 flex flex-col gap-3 z-50">
        <Link
          href="mailto:contact@example.com"
          className="w-10 h-10 mobile:w-10 mobile:h-10 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-colors"
          aria-label="Email"
        >
          <SiZalo className="text-white text-2xl" />
        </Link>
        <Link
          href="https://m.me/yourpage"
          className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 hover:scale-110  transition-colors"
          aria-label="Messenger"
        >
          <FaFacebookMessenger className="text-white text-2xl" />
        </Link>

        <div className="relative">
          <div className="ripple-container">
            <Link
              href="tel:+1234567890"
              className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center hover:bg-amber-600 transition-colors hover:scale-110 relative z-10"
              aria-label="Phone"
            >
              <FaPhone className="text-white text-2xl" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactIcons;

"use client";

import { useEffect, useState } from "react";
import { FaFacebookMessenger, FaPhoneAlt } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import Link from "next/link";
import BuyNowButton from "./BuyNowIcon";
declare global {
  interface Window {
    chtlConfig: {
      chatbotId: string;
    };
  }
}
interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = () => {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    const loadChatlingScript = () => {
      if (!scriptsLoaded) {
        const chatbotId = process.env.NEXT_PUBLIC_BOTCHAT_CHATLING_ID;
        // Configure Chatling
        if (!chatbotId) {
          throw new Error(
            "Environment variable NEXT_PUBLIC_BOTCHAT_CHATLING_ID is not set"
          );
        }
        window.chtlConfig = { chatbotId: chatbotId };

        const script = document.createElement("script");
        script.src = "https://chatling.ai/js/embed.js";
        script.async = true;
        script.type = "text/javascript";
        script.id = "chatling-embed-script";
        script.dataset.id = chatbotId;

        script.onload = () => setScriptsLoaded(true);
        document.body.appendChild(script);

        return () => {
          document.body.removeChild(script);
        };
      }
    };

    loadChatlingScript();
  }, [scriptsLoaded]);

  // The Chatling widget will be controlled by its own UI
  // We don't need to render additional container
  return null;
};

const ContactIcons = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

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
          background: #f59e0b;
          animation: ripple 2s infinite cubic-bezier(0.4, 0, 0.6, 1);
        }

        .ripple-container::after {
          animation-delay: 1s;
        }

        .ripple-zalo::before,
        .ripple-zalo::after {
          background: #3b82f6;
        }

        .ripple-messenger::before,
        .ripple-messenger::after {
          background: #3b82f6;
        }
      `}</style>

      <div className="fixed left-4 bottom-4 flex flex-col gap-3 z-50">
        <Chatbot
          isOpen={isChatbotOpen}
          onClose={() => setIsChatbotOpen(false)}
        />
        <BuyNowButton />
        <div className="relative">
          <div className="ripple-container ripple-zalo">
            <Link
              href="https://zalo.me/0888280000"
              target="blank"
              className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all relative z-10"
              aria-label="Zalo"
            >
              <SiZalo className="text-white text-2xl" />
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="ripple-container ripple-messenger">
            <Link
              href="https://www.facebook.com/profile.php?id=61560826497465&mibextid=LQQJ4d"
              target="blank"
              className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all relative z-10"
              aria-label="Messenger"
            >
              <FaFacebookMessenger className="text-white text-2xl" />
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="ripple-container">
            <Link
              href="tel:0888280000"
              target="blank"
              className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center hover:bg-amber-600 transition-all hover:scale-110 relative z-10"
              aria-label="Phone"
            >
              <FaPhoneAlt className="text-white text-2xl" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactIcons;
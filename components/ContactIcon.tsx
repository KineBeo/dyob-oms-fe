"use client";

import { useEffect, useState } from "react";
import { FaFacebookMessenger, FaPhone, FaRobot } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import Link from "next/link";

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    const loadScripts = () => {
      if (!scriptsLoaded) {
        const script1 = document.createElement("script");
        script1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
        script1.async = true;

        const script2 = document.createElement("script");
        script2.src =
          "https://files.bpcontent.cloud/2024/10/29/15/20241029152141-PN38Y243.js";
        script2.async = true;

        script1.onload = () => {
          script2.onload = () => setScriptsLoaded(true);
          document.body.appendChild(script2);
        };

        document.body.appendChild(script1);

        return () => {
          document.body.removeChild(script1);
          document.body.removeChild(script2);
        };
      }
    };

    loadScripts();
  }, [scriptsLoaded]);

  if (!isOpen || !scriptsLoaded) return null;

  return (
    <div className="fixed right-20 bottom-20 z-50">
      <div id="webchat" className="w-[400px] h-[600px]" />
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ×
      </button>
    </div>
  );
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
      `}</style>

      <div className="fixed right-4 bottom-4 flex flex-col gap-3 z-50">
        <button
          onClick={() => setIsChatbotOpen(!isChatbotOpen)}
          className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all mobile:w-10 mobile:h-10"
          aria-label="Chat"
        >
          <FaRobot className="text-white text-2xl" />
        </button>

        <Link
          href="mailto:contact@example.com"
          className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all mobile:w-10 mobile:h-10"
          aria-label="Email"
        >
          <SiZalo className="text-white text-2xl" />
        </Link>

        <Link
          href="https://m.me/yourpage"
          className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all"
          aria-label="Messenger"
        >
          <FaFacebookMessenger className="text-white text-2xl" />
        </Link>

        <div className="relative">
          <div className="ripple-container">
            <Link
              href="tel:+1234567890"
              className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center hover:bg-amber-600 transition-all hover:scale-110 relative z-10"
              aria-label="Phone"
            >
              <FaPhone className="text-white text-2xl" />
            </Link>
          </div>
        </div>
      </div>

      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </>
  );
};

export default ContactIcons;

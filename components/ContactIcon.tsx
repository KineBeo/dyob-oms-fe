import {FaFacebookMessenger, FaPhone } from 'react-icons/fa';
import { SiZalo } from "react-icons/si";

import Link from 'next/link';

const ContactIcons = () => {
  return (
    <div className="fixed right-4 bottom-4 flex flex-col gap-3 z-50">
      <Link
        href="mailto:contact@example.com"
        className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-colors"
        aria-label="Email"
      >
        <SiZalo className="text-white text-xl" />
      </Link>

      <Link
        href="https://m.me/yourpage"
        className="w-9 h-9  rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 hover:scale-110  transition-colors"
        aria-label="Messenger"
      >
        <FaFacebookMessenger className="text-white text-xl" />
      </Link>

      <Link
        href="tel:+1234567890"
        className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center hover:bg-amber-600 hover:scale-110 transition-colors"
        aria-label="Phone"
      >
        <FaPhone className="text-white text-xl" />
      </Link>
    </div>
  );
}

export default ContactIcons
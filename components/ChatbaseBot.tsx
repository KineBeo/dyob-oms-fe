'use client'
import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

export default function ChatbaseBot() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Chat Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="right-6 bottom-6 z-50 fixed bg-blue-600 hover:bg-blue-700 shadow-lg p-4 rounded-full text-white transition-all duration-300"
                aria-label="Toggle chat"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </button>

            {/* Chat Window */}
            <div className={`fixed bottom-24 right-6 z-40 w-96 rounded-lg shadow-2xl transition-all duration-300 transform ${isOpen ? 'scale-100' : 'scale-0'}`}>
                <div className="bg-white rounded-lg overflow-hidden">
                    <iframe
                        src="https://www.chatbase.co/chatbot-iframe/Dfjem5q0yeJiIpKuCuWdG"
                        className="w-full h-[600px]"
                        frameBorder="0"
                    ></iframe>
                </div>
            </div>
        </>
    );
}
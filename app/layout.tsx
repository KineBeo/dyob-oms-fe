import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ContactIcons from "@/components/ContactIcon";
import { Toaster } from "react-hot-toast";
import { Providers } from "./provider";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Đông Y Ông Bụt - Quán Tâm An Bệnh",
  description: "Quán Tâm An Bệnh",
  icons: [
    {
      url: "/favicon.ico",
      sizes: "32x32",
    }
  ],
  openGraph: {
    title: "Đông Y Ông Bụt",
    description: "DỊCH VỤ CỦA ĐÔNG Y ÔNG BỤT · Bắt mạch, thăm khám và kê đơn · Tư vấn khám chữa bệnh",
    images: [
      {
        url: "/images/logo-image.png", // Ảnh hiển thị khi share trên mạng xã hội
        width: 1200,
        height: 630,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="vi">
      <head>
        <meta name="google-site-verification" content="ru0IkfhjFjnnWm4g1SZvsAaxAHDWfjVEfKijL97okvE" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
          <ContactIcons />
          <Footer />
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 1500,
              style: {
                background: '#363636',
                color: '#fff',
                fontFamily: 'var(--font-geist-sans)',
              },
              success: {
                style: {
                  background: '#4aed88',
                  color: '#000',
                },
              },
              error: {
                style: {
                  background: '#ff4444',
                  color: '#fff',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
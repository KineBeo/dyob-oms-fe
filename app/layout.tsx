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
  description: "Đông y Ông Bụt ứng dụng các bài thuốc của Thần y Hải Thượng Lãn Ông, sử dụng 100% dược liệu sạch chất lượng cao, áp dụng công nghệ khoa học hiện đại để tạo ra các sản phẩm",
  icons: [
    {
      url: "/favicon.ico",
      rel: "icon",
      type: "image/x-icon",
    },
    {
      url: "/favicon-96x96.png",
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
    },
    {
      url: "/favicon.svg",
      rel: "icon",
      type: "image/svg+xml",
    },
    {
      url: "/apple-touch-icon.png",
      rel: "apple-touch-icon",
      sizes: "180x180",
    },
    {
      url: "/favicon/site.webmanifest",
      rel: "manifest",
    },
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Đông Y Ông Bụt",
    description: "DỊCH VỤ CỦA ĐÔNG Y ÔNG BỤT · Bắt mạch, thăm khám và kê đơn · Tư vấn khám chữa bệnh",
    images: [
      {
        url: "/favicon-96x96.png", // Ảnh hiển thị khi share trên mạng xã hội
      },
    ],
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
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Đông Y Ông Bụt" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="icon" type="image/png" sizes="192x192" href="/web-app-manifest-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/web-app-manifest-512x512.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
          {/* <ContactIcons /> */}
          <Footer />
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 5000,
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
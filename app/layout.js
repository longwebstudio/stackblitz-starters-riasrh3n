// app/layout.js

import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script'; // Nhập cấu phần Script mặc định để chèn mã trực tiếp

export const metadata = {
  metadataBase: new URL('https://blog.longwebstudio.io.vn'), // Khai báo URL gốc phân giải SEO Image
  title: 'Blog Long Web Studio | Kiến Thức Lập Trình & Sách Đầu Tư',
  description: 'Trang chia sẻ kiến thức thiết kế website WordPress chuẩn SEO và giới thiệu tủ sách đầu tư tài chính.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        {/* 1. Nạp trực tiếp tệp script Google Analytics không đồng bộ */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LNXEP5KDWL"
          strategy="afterInteractive" // Chạy tập lệnh ngay sau khi trang tương tác (tối ưu tốc độ)
        />
        
        {/* 2. Thực thi đoạn mã khởi tạo gtag */}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LNXEP5KDWL');
          `}
        </Script>
      </head>
      
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col justify-between">
        
        {/* Thanh điều hướng */}
        <Header />

        {/* Nội dung chính hiển thị của trang */}
        <main className="flex-grow">{children}</main>

        {/* Chân trang */}
        <Footer />
        
      </body>
    </html>
  );
}
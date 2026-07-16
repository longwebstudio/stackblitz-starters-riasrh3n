import './globals.css';
import Link from 'next/link';
import Script from 'next/script'; // Import cấu phần Script mặc định

// app/layout.js

export const metadata = {
  // Bổ sung dòng cấu hình này để phân giải tất cả đường dẫn tương đối trong SEO
  metadataBase: new URL('https://blog.longwebstudio.io'), 
  
  title: 'Blog Long Web Studio | Kiến Thức Lập Trình & Sách Đầu Tư',
  description: 'Trang chia sẻ kiến thức thiết kế website WordPress chuẩn SEO và giới thiệu tủ sách đầu tư tài chính.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        {/* Tải tệp script Google Analytics một cách không đồng bộ */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LNXEP5KDWL"
          strategy="afterInteractive"
        />
        {/* Thực thi cấu hình gtag */}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LNXEP5KDWL');
          `}
        </Script>
      </head>
      <body class="bg-slate-50 text-slate-900 min-h-screen flex flex-col justify-between">
        <header class="bg-white border-b border-slate-100 sticky top-0 z-50">
          <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" class="font-extrabold text-lg text-slate-950 tracking-tight flex items-center gap-1">
              <span class="text-red-600 font-black">LONG</span><span class="text-slate-400 font-light text-xs">WEB STUDIO</span>
            </Link>
          </div>
        </header>

        <main class="flex-grow">{children}</main>

        <footer class="bg-slate-950 text-slate-500 py-10 border-t border-slate-900 mt-20">
          <div class="max-w-6xl mx-auto px-4 text-center text-xs">
            <p>© {new Date().getFullYear()} Long Web Studio. Tất cả quyền được bảo lưu.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Blog Long Web Studio | Kiến Thức Lập Trình & Sách Đầu Tư',
  description:
    'Trang chia sẻ kiến thức thiết kế website WordPress chuẩn SEO và giới thiệu tủ sách đầu tư tài chính.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col justify-between">
        {/* Navigation Bar */}
        <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="font-extrabold text-lg text-slate-950 tracking-tight flex items-center gap-1"
            >
              <span className="text-red-600 font-black">LONG</span>
              <span className="text-slate-400 font-light text-xs">WEB STUDIO</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-semibold text-slate-600">
              <Link href="/" className="hover:text-red-600 transition-colors">
                Trang chủ
              </Link>
              <Link
                href="/sach-dau-tu"
                className="hover:text-red-600 transition-colors"
              >
                Tủ Sách
              </Link>
              <a
                href="https://longwebstudio.io.vn"
                target="_blank"
                className="bg-slate-900 text-white text-xs px-3.5 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
              >
                Dịch Vụ
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-grow">{children}</main>

        <footer className="bg-slate-950 text-slate-500 py-12 border-t border-slate-900 mt-20">
          <div className="max-w-6xl mx-auto px-4 text-center text-xs space-y-2">
            <p>
              © {new Date().getFullYear()} Long Web Studio. Tất cả quyền được
              bảo lưu.
            </p>
            <p className="text-slate-700">
              Vận hành trên tên miền phụ blog.longwebstudio.io
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

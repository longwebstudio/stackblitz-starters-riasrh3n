import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 mt-20">
      {/* 1. Phần nội dung chính của Chân trang */}
      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Cột 1: Giới thiệu thương hiệu (Chiếm 5/12 chiều rộng) */}
        <div className="md:col-span-5 space-y-4">
          <Link href="/" className="font-extrabold text-lg text-white tracking-tight flex items-center gap-1">
            <span className="text-red-500 font-black">LONG</span><span className="text-slate-400 font-light text-xs">WEB STUDIO</span>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
            Freelancer chuyên thiết kế website WordPress chuẩn SEO, tối ưu tốc độ tối đa, phát triển hệ thống Headless CMS kết hợp công nghệ Next.js hiệu năng cao.
          </p>
        </div>

        {/* Cột 2: Danh mục liên kết (Chiếm 3/12 chiều rộng) */}
        <div className="md:col-span-3 space-y-4">
          <h3 className="text-white font-bold text-xs uppercase tracking-widest">Danh mục</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-red-500 transition-colors">Trang chủ</Link>
            </li>
            <li>
              <Link href="/sach-dau-tu" className="hover:text-red-500 transition-colors">Tủ Sách Đầu Tư</Link>
            </li>
            <li>
              <a href="https://longwebstudio.io.vn" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">
                Dịch Vụ Thiết Kế Web
              </a>
            </li>
          </ul>
        </div>

        {/* Cột 3: Thông tin liên lạc (Chiếm 4/12 chiều rộng) */}
        <div className="md:col-span-4 space-y-4">
          <h3 className="text-white font-bold text-xs uppercase tracking-widest">Liên hệ</h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-center gap-2">
              <span className="text-base">📧</span>
              <a href="mailto:contact@longwebstudio.io.vn" className="hover:text-red-500 transition-colors">
                contact@longwebstudio.io.vn
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-base">💬</span>
              <a href="https://zalo.me/0966570913" target="_blank" rel="nofollow" className="hover:text-red-500 transition-colors">
                Zalo: 0966.570.913 (Hỗ trợ 24/7)
              </a>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-base">📍</span>
              <span>TP. Hà Nội, Việt Nam (Nhận dự án Remote toàn quốc)</span>
            </li>
          </ul>
        </div>

      </div>

      {/* 2. Phần chân đế Copyright */}
      <div className="border-t border-slate-900/60 py-8 bg-slate-950/40">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs text-slate-600 space-y-1">
          <p>© {currentYear} Long Web Studio. Tất cả quyền được bảo lưu.</p>
          <p>Vận hành tối ưu trên nền tảng tích hợp Headless WordPress &amp; Next.js.</p>
        </div>
      </div>
    </footer>
  );
}
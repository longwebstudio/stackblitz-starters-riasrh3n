'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react'; // Sử dụng thư viện Motion mới nhất

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Tủ Sách', href: '/sach-dau-tu' },
    { label: 'Dịch Vụ', href: 'https://longwebstudio.io.vn', external: true },
  ];

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* <!-- Logo thương hiệu --> */}
        <div className="flex-shrink-0">
          <Link href="/" className="font-extrabold text-lg text-slate-950 tracking-tight flex items-center gap-1">
            <span className="text-red-600 font-black">LONG</span><span className="text-slate-400 font-light text-xs">WEB STUDIO</span>
          </Link>
        </div>

        {/* <!-- 1. Giao diện Desktop: Menu ngang --> */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
          {menuItems.map((item) => (
            item.external ? (
              <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={item.href} className="hover:text-red-600 transition-colors">
                {item.label}
              </Link>
            )
          ))}
          <a href="https://longwebstudio.io.vn" target="_blank" rel="noopener noreferrer" className="bg-slate-900 text-white text-xs px-3.5 py-1.5 rounded-lg hover:bg-slate-800 transition-colors">
            Dịch Vụ
          </a>
        </nav>

        {/* <!-- 2. Giao diện Mobile: Nút nhắn nhanh qua Zalo & nút bật Hamburger --> */}
        <div class="flex md:hidden items-center gap-2">
          {/* <!-- Nút Zalo nhỏ hiển thị cố định tăng chuyển đổi --> */}
          <a href="https://zalo.me/0966570913" target="_blank" rel="nofollow" className="bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors shadow-sm">
            Nhắn Zalo
          </a>
          
          {/* <!-- Hamburger Button --> */}
          <button 
            onClick={() => setIsOpen(true)}
            className="text-slate-500 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-50 focus:outline-none"
            aria-label="Mở menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* 3. Ngăn kéo Menu Mobile (Drawer) sử dụng Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm md:hidden"
          >
            {/* Bảng điều hướng trượt từ bên phải */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()} // Ngăn sự kiện click đóng lan truyền vào trong panel
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-white p-6 shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Header ngăn kéo */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Danh mục</span>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-slate-500 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-50 focus:outline-none"
                    aria-label="Đóng menu"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Danh sách các liên kết */}
                <nav className="flex flex-col space-y-4">
                  {menuItems.map((item) => (
                    item.external ? (
                      <a 
                        key={item.href} 
                        href={item.href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={() => setIsOpen(false)}
                        className="text-base font-bold text-slate-700 hover:text-red-600 transition-colors border-b border-slate-50 pb-2 block"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link 
                        key={item.href} 
                        href={item.href} 
                        onClick={() => setIsOpen(false)}
                        className="text-base font-bold text-slate-700 hover:text-red-600 transition-colors border-b border-slate-50 pb-2 block"
                      >
                        {item.label}
                      </Link>
                    )
                  ))}
                </nav>
              </div>

              {/* CTAs lớn ở dưới cùng của ngăn kéo */}
              <div className="border-t border-slate-100 pt-6 space-y-3">
                <a href="https://longwebstudio.io.vn" target="_blank" rel="noopener noreferrer" className="w-full bg-slate-950 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-xs text-center block shadow-sm">
                  Dịch Vụ Thiết Kế Web
                </a>
                <a href="https://zalo.me/0966570913" target="_blank" rel="nofollow" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-xs text-center block shadow-sm">
                  Trò chuyện Zalo: 0966.570.913
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
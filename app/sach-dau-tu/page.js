import { getAllBooks } from '@/lib/wordpress';
import Link from 'next/link';

export const metadata = {
  title: 'Thư Viện Sách Đầu Tư | Blog Long Web Studio',
  description: 'Tổng hợp và review chi tiết tủ sách đầu tư tài chính chọn lọc.',
};

export default async function BooksArchivePage() {
  const books = await getAllBooks();

  return (
    <div class="max-w-6xl mx-auto px-4 py-16 flex-grow">
      <header class="mb-12 text-center">
        <span class="text-xs font-bold text-red-600 uppercase tracking-widest block mb-2">Thư viện tủ sách</span>
        <h1 class="text-3xl font-black text-slate-950 sm:text-4xl tracking-tight">Tất Cả Sách Đầu Tư</h1>
      </header>

      {books.length === 0 ? (
        <p class="text-center text-slate-400 py-12">Hiện chưa có đầu sách nào.</p>
      ) : (
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((book) => {
            const priceFormatted = book.giaBan
              ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.giaBan)
              : 'Liên hệ';
            return (
              <article key={book.slug} class="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div class="aspect-[3/4] bg-slate-50 rounded-xl overflow-hidden mb-3 flex items-center justify-center">
                    {book.featuredImage?.node?.sourceUrl ? (
                      <img src={book.featuredImage.node.sourceUrl} alt={book.title} class="w-full h-full object-cover" />
                    ) : (
                      <span class="text-4xl">📖</span>
                    )}
                  </div>
                  <h2 class="text-sm font-bold text-slate-900 line-clamp-2">
                    <Link href={`/sach-dau-tu/${book.slug}`} class="hover:text-red-600 transition-colors">{book.title}</Link>
                  </h2>
                </div>
                <div class="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                  <span class="text-xs font-black text-red-600">{priceFormatted}</span>
                  <Link href={`/sach-dau-tu/${book.slug}`} class="text-[10px] bg-slate-900 text-white font-bold px-2.5 py-1.5 rounded-lg">Xem chi tiết</Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
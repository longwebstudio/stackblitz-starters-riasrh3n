import { getAllBooks } from '@/lib/wordpress';
import Link from 'next/link';
import Image from 'next/image'; // Tải cấu phần Image của Next.js
import FadeIn from '@/components/FadeIn';
import HoverCard from '@/components/HoverCard';

// Cấu hình SEO Metadata tĩnh cho trang danh mục sách
export const metadata = {
  title: 'Thư Viện Sách Đầu Tư | Blog Long Web Studio',
  description: 'Tổng hợp và review chi tiết tủ sách đầu tư tài chính chọn lọc, cập nhật ưu đãi và liên kết mua hàng tốt nhất.',
};

export default async function BooksArchivePage() {
  const books = await getAllBooks();

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 flex-grow">
      
      {/* Tiêu đề trang - Xuất hiện mượt mà bằng FadeIn */}
      <FadeIn delay={0.1}>
        <header className="mb-12 text-center">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-2">
            Thư viện tủ sách
          </span>
          <h1 className="text-3xl font-black text-slate-950 sm:text-4xl tracking-tight">
            Tất Cả Sách Đầu Tư
          </h1>
          <p className="text-slate-500 text-sm mt-3 max-w-md mx-auto leading-relaxed">
            Nơi tổng hợp các bài review chất lượng và cập nhật bảng giá ưu đãi tốt nhất của những cuốn sách tài chính gối đầu giường.
          </p>
        </header>
      </FadeIn>

      {/* Kiểm tra và hiển thị danh sách sách */}
      {books.length === 0 ? (
        <FadeIn delay={0.2}>
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm max-w-md mx-auto">
            <span className="text-5xl block mb-4">📭</span>
            <p className="text-slate-500 text-sm">Hiện chưa có đầu sách nào được đăng tải.</p>
          </div>
        </FadeIn>
      ) : (
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {books.map((book) => {
              const priceFormatted = book.giaBan
                ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.giaBan)
                : 'Liên hệ';
              return (
                // Bọc từng thẻ sách bằng hiệu ứng tương tác HoverCard
                <HoverCard key={book.slug}>
                  <article className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow h-full">
                    <div>
                      
                      {/* Ảnh bìa sách sử dụng Next.js Image tối ưu qua Jetpack Photon CDN */}
                      <div className="aspect-[3/4] bg-slate-50 rounded-xl overflow-hidden mb-3 flex items-center justify-center relative border border-slate-50">
                        {book.featuredImage?.node?.sourceUrl ? (
                          <Image 
                            src={book.featuredImage.node.sourceUrl} 
                            alt={book.title} 
                            width={300} // Next.js truyền tham số này vào custom loader để tự căn tỷ lệ qua Photon CDN
                            height={400} // Đảm bảo tỷ lệ khung hình 3:4 tránh hiện tượng xê dịch bố cục (CLS)
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-3xl rounded-lg">
                            📖
                          </div>
                        )}
                      </div>
                      
                      {/* Danh mục thẻ tag của sách */}
                      {book.sachTags?.nodes?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {book.sachTags.nodes.map((tag) => (
                            <span key={tag.slug} className="text-[9px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-bold uppercase">
                              #{tag.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Tiêu đề cuốn sách */}
                      <h2 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug hover:text-red-600 transition-colors">
                        <Link href={`/sach-dau-tu/${book.slug}`}>
                          {book.title}
                        </Link>
                      </h2>
                      
                      {/* Trích dẫn tóm tắt ngắn từ WordPress */}
                      <div 
                        className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: book.excerpt }}
                      />
                    </div>

                    {/* Phần chân của thẻ sách */}
                    <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-xs font-black text-red-600">{priceFormatted}</span>
                      <Link href={`/sach-dau-tu/${book.slug}`} className="text-[10px] bg-slate-900 text-white font-bold px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition-colors">
                        Xem chi tiết
                      </Link>
                    </div>

                  </article>
                </HoverCard>
              );
            })}
          </div>
        </FadeIn>
      )}
    </div>
  );
}
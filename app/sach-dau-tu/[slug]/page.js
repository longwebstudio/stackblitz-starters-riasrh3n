import { getBookBySlug, getAllBooks } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'; // Tải cấu phần Image của Next.js
import FadeIn from '@/components/FadeIn';

// 1. Khởi tạo Dynamic SEO Metadata sử dụng trường lwsSeo từ GraphQL của bạn
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) return {};

  return {
    title: book.lwsSeo?.title || `${book.title} | Tủ Sách Đầu Tư`,
    description: book.lwsSeo?.metaDesc || `${book.title} - Bản đánh giá nội dung chi tiết và chia sẻ đường dẫn đặt mua ưu đãi từ Long Web Studio.`,
  };
}

// 2. Định nghĩa Static Paths (SSG) để Next.js build trước mã HTML tăng tốc độ hiển thị
export async function generateStaticParams() {
  const books = await getAllBooks();
  return books.map((book) => ({
    slug: book.slug,
  }));
}

export default async function BookDetailPage({ params }) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  const priceFormatted = book.giaBan
    ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.giaBan)
    : 'Liên hệ';

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 flex-grow">
      
      {/* Điều hướng Breadcrumbs */}
      <FadeIn delay={0.1}>
        <nav className="mb-8 text-xs text-slate-400">
          <Link href="/" className="hover:text-red-600 transition-colors">Trang chủ</Link> &rsaquo;{' '}
          <Link href="/sach-dau-tu" className="hover:text-red-600 transition-colors">Sách Đầu Tư</Link> &rsaquo;{' '}
          <span className="text-slate-900 font-medium">{book.title}</span>
        </nav>
      </FadeIn>

      {/* Thông tin chi tiết cuốn sách */}
      <FadeIn delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 bg-white p-6 sm:p-10 rounded-2xl border border-slate-100 shadow-sm">
          
          {/* Cột trái: Ảnh bìa sách sử dụng Next.js Image tối ưu qua Jetpack Photon CDN */}
          <div className="md:col-span-5 flex justify-center">
            <div className="w-full max-w-xs bg-slate-50 p-2 rounded-xl border border-slate-100 overflow-hidden shadow-sm h-fit">
              {book.featuredImage?.node?.sourceUrl ? (
                <Image
                  src={book.featuredImage.node.sourceUrl}
                  alt={book.title}
                  width={400} // Cấu hình chiều rộng chuyển tới Jetpack CDN để resize tự động
                  height={533} // Tỷ lệ chuẩn 3:4 giúp triệt tiêu hiện tượng xê dịch bố cục (CLS)
                  className="w-full rounded-lg object-cover"
                  priority // Ưu tiên tải hình ảnh bìa lớn trước (LCP Optimization)
                />
              ) : (
                <div className="aspect-[3/4] flex items-center justify-center text-6xl text-slate-200 py-20 bg-slate-50 rounded-lg">
                  📖
                </div>
              )}
            </div>
          </div>

          {/* Cột phải: Thông tin, Thẻ tags & Nội dung review */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              {/* Danh sách thẻ tag */}
              {book.sachTags?.nodes?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {book.sachTags.nodes.map((tag) => (
                    <span key={tag.slug} className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded-full font-bold uppercase">
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-2xl md:text-3xl font-black text-slate-950 leading-tight">
                {book.title}
              </h1>

              {/* Hộp hành động: Giá bán và nút Affiliate Shopee */}
              <div className="mt-6 bg-red-50/70 border border-red-100 p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[9px] text-red-600 font-bold uppercase tracking-wider block mb-0.5">Giá bán ưu đãi</span>
                  <span className="text-2xl font-black text-red-600">{priceFormatted}</span>
                </div>
                {book.linkAffiliate && (
                  <a
                    href={book.linkAffiliate}
                    target="_blank"
                    rel="nofollow"
                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-xs text-center transition-colors shadow-sm"
                  >
                    🛒 Đặt Mua Tại Shopee
                  </a>
                )}
              </div>
            </div>

            {/* Nội dung Review chi tiết nạp trực tiếp từ WordPress */}
            <div className="mt-8 pt-8 border-t border-slate-100">
              <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
                <span>📝</span> Review &amp; Nhận Xét Chi Tiết
              </h3>
              {/* Class prose kế thừa style định dạng từ tệp globals.css */}
              <div
                className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: book.content }}
              />
            </div>

          </div>
        </div>
      </FadeIn>
    </div>
  );
}
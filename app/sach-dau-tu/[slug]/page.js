import { getBookBySlug, getAllBooks } from '@/lib/wordpress';
import { notFound } from 'next/navigation';

// 1. Khởi tạo Dynamic SEO Metadata sử dụng trực tiếp trường lwsSeo từ GraphQL
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) return {};

  return {
    title: book.lwsSeo?.title || `${book.title} | Tủ Sách Đầu Tư`,
    description: book.lwsSeo?.metaDesc || `${book.title} - Bản đánh giá chi tiết nội dung cuốn sách và chia sẻ đường dẫn mua sách ưu đãi.`,
  };
}

// 2. Định nghĩa Static Paths (SSG) để Next.js biên dịch sẵn mã HTML, tăng tối đa tốc độ hiển thị
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
    <div class="max-w-4xl mx-auto px-4 py-12 flex-grow">
      <!-- Breadcrumbs -->
      <nav class="mb-8 text-xs text-slate-400">
        <Link href="/" class="hover:text-red-600">Trang chủ</Link> &rsaquo;{' '}
        <span class="text-slate-900 font-medium">{book.title}</span>
      </nav>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-10 bg-white p-6 sm:p-10 rounded-2xl border border-slate-100 shadow-sm">
        
        <!-- Cột trái: Ảnh bìa sách -->
        <div class="md:col-span-5 flex justify-center">
          <div class="w-full max-w-xs bg-slate-50 p-2 rounded-xl border border-slate-100 overflow-hidden shadow-sm h-fit">
            {book.featuredImage?.node?.sourceUrl ? (
              <img
                src={book.featuredImage.node.sourceUrl}
                alt={book.title}
                class="w-full rounded-lg object-cover"
              />
            ) : (
              <div class="aspect-[3/4] flex items-center justify-center text-6xl text-slate-200">
                📖
              </div>
            )}
          </div>
        </div>

        <!-- Cột phải: Thông tin, Thẻ tags & Nội dung review -->
        <div class="md:col-span-7 flex flex-col justify-between">
          <div>
            <!-- Thẻ tags nếu có -->
            {book.sachTags?.nodes?.length > 0 && (
              <div class="flex flex-wrap gap-1.5 mb-4">
                {book.sachTags.nodes.map((tag) => (
                  <span key={tag.slug} class="text-[10px] bg-red-50 text-red-600 px-2.5 py-1 rounded-full font-bold uppercase">
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}

            <h1 class="text-2xl md:text-3xl font-black text-slate-950 leading-tight">
              {book.title}
            </h1>

            <!-- Hộp hành động: Hiển thị giá & Nút mua affiliate Shopee -->
            <div class="mt-6 bg-red-50/70 border border-red-100 p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span class="text-[9px] text-red-600 font-bold uppercase tracking-wider block mb-0.5">Giá bán ưu đãi</span>
                <span class="text-2xl font-black text-red-600">{priceFormatted}</span>
              </div>
              {book.linkAffiliate && (
                <a
                  href={book.linkAffiliate}
                  target="_blank"
                  rel="nofollow"
                  class="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-xs text-center transition-colors shadow-sm"
                >
                  🛒 Đặt Mua Tại Shopee
                </a>
              )}
            </div>
          </div>

          <!-- Nội dung Review chi tiết -->
          <div class="mt-8 pt-8 border-t border-slate-100">
            <h3 class="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
              <span>📝</span> Review & Nhận Xét Chi Tiết
            </h3>
            {/* Class prose giúp định dạng nội dung HTML từ WordPress đẹp đẽ và chuẩn chỉ */}
            <div
              class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: book.content }}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
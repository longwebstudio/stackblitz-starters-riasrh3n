import { getBookBySlug, getAllBooks } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/components/FadeIn';

// 1. CẤU HÌNH DYNAMIC METADATA & OPEN GRAPH (XUẤT SẮC CHO SEO)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) return {};

  const title = book.lwsSeo?.title || `${book.title} | Tủ Sách Đầu Tư`;
  const description = book.lwsSeo?.metaDesc || `${book.title} - Review chi tiết và cập nhật liên kết đặt mua Shopee ưu đãi.`;
  const url = `https://blog.longwebstudio.io/sach-dau-tu/${slug}`;
  const ogImage = book.featuredImage?.node?.sourceUrl || 'https://i0.wp.com/longwebstudio.io.vn/wordpress/wp-content/uploads/2026/07/default-og.jpg';

  return {
    title,
    description,
    alternates: {
      canonical: url, // Thẻ Canonical ngăn chặn trùng lặp link
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Long Web Studio Blog',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'vi_VN',
      type: 'books',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

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

  // 2. KHAI BÁO DỮ LIỆU CẤU TRÚC JSON-LD (SCHEMA.ORG) CHO SÁCH
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    'name': book.title,
    'image': book.featuredImage?.node?.sourceUrl || '',
    'description': book.lwsSeo?.metaDesc || `${book.title} - Tủ sách đầu tư tài chính chọn lọc.`,
    'offers': {
      '@type': 'Offer',
      'price': book.giaBan || 0,
      'priceCurrency': 'VND',
      'url': book.linkAffiliate || `https://blog.longwebstudio.io/sach-dau-tu/${slug}`,
      'availability': 'https://schema.org/InStock',
    },
  };

  const priceFormatted = book.giaBan
    ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.giaBan)
    : 'Liên hệ';

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 flex-grow">
      {/* Nhúng đoạn mã Schema JSON-LD vào đầu trang một cách an toàn */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <FadeIn delay={0.1}>
        <nav className="mb-8 text-xs text-slate-400">
          <Link href="/" className="hover:text-red-600 transition-colors">Trang chủ</Link> &rsaquo;{' '}
          <Link href="/sach-dau-tu" className="hover:text-red-600 transition-colors">Sách Đầu Tư</Link> &rsaquo;{' '}
          <span className="text-slate-900 font-medium">{book.title}</span>
        </nav>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 bg-white p-6 sm:p-10 rounded-2xl border border-slate-100 shadow-sm">
          {/* Cột trái: Ảnh bìa */}
          <div className="md:col-span-5 flex justify-center">
            <div className="w-full max-w-xs bg-slate-50 p-2 rounded-xl border border-slate-100 overflow-hidden shadow-sm h-fit">
              {book.featuredImage?.node?.sourceUrl ? (
                <Image
                  src={book.featuredImage.node.sourceUrl}
                  alt={book.title}
                  width={400}
                  height={533}
                  className="w-full rounded-lg object-cover"
                  priority
                />
              ) : (
                <div className="aspect-[3/4] flex items-center justify-center text-6xl text-slate-200 py-20 bg-slate-50 rounded-lg">
                  📖
                </div>
              )}
            </div>
          </div>

          {/* Cột phải: Thông tin */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
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

            <div className="mt-8 pt-8 border-t border-slate-100">
              <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
                <span>📝</span> Review &amp; Nhận Xét Chi Tiết
              </h3>
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
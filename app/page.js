import { getAllPosts, getAllBooks } from '@/lib/wordpress';
import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/components/FadeIn';
import HoverCard from '@/components/HoverCard';

// 1. ĐỊNH NGHĨA METADATA & OPEN GRAPH CHO TRANG CHỦ
export const metadata = {
  title: 'Blog Long Web Studio | Kiến Thức Lập Trình & Sách Đầu Tư',
  description: 'Trang chia sẻ kiến thức thiết kế website WordPress chuyên nghiệp, lập trình Headless CMS Next.js và tổng hợp tủ sách đầu tư tài chính chọn lọc.',
  alternates: {
    canonical: 'https://blog.longwebstudio.io', // Link gốc chuẩn hóa của trang chủ
  },
  openGraph: {
    title: 'Blog Long Web Studio | Kiến Thức Lập Trình & Sách Đầu Tư',
    description: 'Trang chia sẻ kiến thức thiết kế website WordPress chuyên nghiệp, lập trình Headless CMS Next.js và tổng hợp tủ sách đầu tư tài chính chọn lọc.',
    url: 'https://blog.longwebstudio.io',
    siteName: 'Long Web Studio Blog',
    images: [
      {
        url: 'https://i0.wp.com/longwebstudio.io.vn/wordpress/wp-content/uploads/2026/07/logo-og.jpg', // Thay thế bằng ảnh đại diện mạng xã hội của bạn
        width: 1200,
        height: 630,
      }
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Long Web Studio | Kiến Thức Lập Trình & Sách Đầu Tư',
    description: 'Trang chia sẻ kiến thức thiết kế website WordPress chuyên nghiệp, lập trình Headless CMS Next.js và tổng hợp tủ sách đầu tư tài chính chọn lọc.',
    images: ['https://i0.wp.com/longwebstudio.io.vn/wordpress/wp-content/uploads/2026/07/logo-og.jpg'],
  }
};

export default async function HomePage() {
  const [posts, books] = await Promise.all([getAllPosts(), getAllBooks()]);

  const latestPosts = posts.slice(0, 4);
  const latestBooks = books.slice(0, 4);

  // 2. KHAI BÁO DỮ LIỆU CẤU TRÚC JSON-LD (WEBSITE & ORGANIZATION)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://blog.longwebstudio.io/#website',
        'url': 'https://blog.longwebstudio.io',
        'name': 'Blog Long Web Studio',
        'description': 'Kiến Thức Lập Trình & Sách Đầu Tư',
        'publisher': {
          '@id': 'https://blog.longwebstudio.io/#organization'
        }
      },
      {
        '@type': 'Organization',
        '@id': 'https://blog.longwebstudio.io/#organization',
        'name': 'Long Web Studio',
        'url': 'https://longwebstudio.io.vn',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://blog.longwebstudio.io/logo.png' // Thay thế bằng đường dẫn ảnh logo thực tế
        },
        'sameAs': [
          'https://zalo.me/0966570913' // Liên kết mạng xã hội/kênh liên lạc để định danh thực thể
        ]
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-20">
      {/* Nhúng mã Schema JSON-LD định danh thương hiệu */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 1. Hero Section */}
      <FadeIn delay={0.1}>
        <section className="text-center max-w-2xl mx-auto py-10">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-2">
            Không gian chia sẻ
          </span>
          <h1 className="text-3xl font-black md:text-5xl text-slate-950 tracking-tight leading-tight">
            Kiến Thức Lập Trình <br /> &amp; Sách Đầu Tư Tinh Hoa
          </h1>
          <p className="text-slate-500 text-sm mt-4 leading-relaxed">
            Nơi Long chia sẻ các trải nghiệm thực tế về tối ưu WordPress, xây dựng hệ thống Headless Next.js và review các đầu sách đầu tư tài chính giá trị.
          </p>
        </section>
      </FadeIn>

      {/* 2. Highlighted Books Showcase */}
      <FadeIn delay={0.3}>
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-950 flex items-center gap-2">
              <span>📚</span> Sách Đầu Tư Mới Nhất
            </h2>
            <Link href="/sach-dau-tu" className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors">
              Xem tất cả &rarr;
            </Link>
          </div>

          {latestBooks.length === 0 ? (
            <p className="text-sm text-slate-400">Chưa có đầu sách nào.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {latestBooks.map((book) => {
                const priceFormatted = book.giaBan
                  ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.giaBan)
                  : 'Liên hệ';
                return (
                  <HoverCard key={book.slug}>
                    <div className="flex flex-col justify-between h-full bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">
                      <div className="aspect-[3/4] rounded-lg overflow-hidden mb-3 relative border border-slate-100">
                        {book.featuredImage?.node?.sourceUrl ? (
                          <Image 
                            src={book.featuredImage.node.sourceUrl} 
                            alt={book.title} 
                            width={300}
                            height={400}
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-3xl rounded-lg">
                            📖
                          </div>
                        )}
                      </div>
                      <h3 className="text-xs font-bold text-slate-900 line-clamp-2 mb-2">
                        <Link href={`/sach-dau-tu/${book.slug}`} className="hover:text-red-600 transition-colors">
                          {book.title}
                        </Link>
                      </h3>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100/50">
                        <span className="text-xs font-black text-red-600">{priceFormatted}</span>
                        <Link href={`/sach-dau-tu/${book.slug}`} className="text-[10px] bg-slate-900 text-white font-bold px-2 py-1 rounded-md">
                          Xem
                        </Link>
                      </div>
                    </div>
                  </HoverCard>
                );
              })}
            </div>
          )}
        </section>
      </FadeIn>

      {/* 3. Latest Blog Posts */}
      <FadeIn delay={0.5}>
        <section className="space-y-6">
          <h2 className="text-lg font-black text-slate-950 flex items-center gap-2">
            <span>📝</span> Bài Viết Mới Trên Blog
          </h2>

          {latestPosts.length === 0 ? (
            <p className="text-sm text-slate-400">Chưa có bài viết nào.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {latestPosts.map((post) => (
                <HoverCard key={post.slug}>
                  <article className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow h-full">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                        <span className="font-bold text-red-600 uppercase">
                          {post.categories?.nodes?.[0]?.name || 'Blog'}
                        </span>
                        <span>&bull;</span>
                        <time>{new Date(post.date).toLocaleDateString('vi-VN')}</time>
                      </div>

                      {post.featuredImage?.node?.sourceUrl && (
                        <div className="aspect-video rounded-xl overflow-hidden mb-4 relative border border-slate-100">
                          <Image
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.title}
                            width={600}
                            height={338}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <h3 className="text-lg font-bold text-slate-900 hover:text-red-600 transition-colors leading-snug">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <div className="text-xs text-slate-500 leading-relaxed mt-2 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                    </div>
                    <Link href={`/blog/${post.slug}`} className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors flex items-center gap-1 mt-4 pt-4 border-t border-slate-50">
                      Đọc chi tiết bài viết <span>&rarr;</span>
                    </Link>
                  </article>
                </HoverCard>
              ))}
            </div>
          )}
        </section>
      </FadeIn>

    </div>
  );
}
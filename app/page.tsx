import { getAllPosts, getAllBooks } from '@/lib/wordpress';
import Link from 'next/link';

export default async function HomePage() {
  // Lấy song song danh sách bài viết và sách để tối ưu thời gian tải trang
  const [posts, books] = await Promise.all([getAllPosts(), getAllBooks()]);

  // Giới hạn hiển thị mới nhất ở trang chủ
  const latestPosts = posts.slice(0, 4);
  const latestBooks = books.slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-20">
      
      {/* 1. Hero Section */}
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

      {/* 2. Highlighted Books Showcase (Tủ sách đầu tư nổi bật) */}
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
                <div key={book.slug} className="flex flex-col justify-between h-full bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">
                  <div className="aspect-[3/4] rounded-lg overflow-hidden mb-3">
                    {book.featuredImage?.node?.sourceUrl ? (
                      <img 
                        src={book.featuredImage.node.sourceUrl} 
                        alt={book.title} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-3xl rounded-lg">
                        📖
                      </div>
                    )}
                  </div>
                  <h3 class="text-xs font-bold text-slate-900 line-clamp-2 mb-2">
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
              );
            })}
          </div>
        )}
      </section>

      {/* 3. Latest Blog Posts (Bài viết blog mới nhất) */}
      <section className="space-y-6">
        <h2 className="text-lg font-black text-slate-950 flex items-center gap-2">
          <span>📝</span> Bài Viết Mới Trên Blog
        </h2>

        {latestPosts.length === 0 ? (
          <p className="text-sm text-slate-400">Chưa có bài viết nào.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestPosts.map((post) => (
              <article key={post.slug} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                    <span className="font-bold text-red-600 uppercase">
                      {post.categories?.nodes?.[0]?.name || 'Blog'}
                    </span>
                    <span>&bull;</span>
                    <time>{new Date(post.date).toLocaleDateString('vi-VN')}</time>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 hover:text-red-600 transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <div className="text-xs text-slate-500 leading-relaxed mt-2 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                </div>
                <Link href={`/blog/${post.slug}`} className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors flex items-center gap-1 mt-4 pt-4 border-t border-slate-50">
                  Đọc chi tiết bài viết <span>&rarr;</span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
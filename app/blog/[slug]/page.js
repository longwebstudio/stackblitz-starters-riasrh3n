import { getPostBySlug, getAllPosts } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'; // Tải cấu phần Image của Next.js
import FadeIn from '@/components/FadeIn';

// 1. Khởi tạo Dynamic SEO Metadata sử dụng trường lwsSeo từ WPGraphQL
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.lwsSeo?.title || `${post.title} | Blog Long Web Studio`,
    description: post.lwsSeo?.metaDesc || `${post.title} - Bài viết chia sẻ kiến thức hữu ích từ freelancer Long Web Studio.`,
  };
}

// 2. Định nghĩa Static Paths (SSG) để Next.js biên dịch sẵn mã HTML, tăng tối đa tốc độ hiển thị
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 flex-grow">
      
      {/* Tiêu đề & Thông tin Meta của bài viết */}
      <FadeIn delay={0.1}>
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-3">
            <span className="font-bold text-red-600 uppercase">
              {post.categories?.nodes?.[0]?.name || 'Blog'}
            </span>
            <span>&bull;</span>
            <time>{new Date(post.date).toLocaleDateString('vi-VN')}</time>
          </div>
          <h1 className="text-3xl font-black text-slate-950 leading-tight md:text-4xl">
            {post.title}
          </h1>
        </header>
      </FadeIn>

      {/* Ảnh đại diện nổi bật của bài viết */}
      <FadeIn delay={0.2}>
        {post.featuredImage?.node?.sourceUrl && (
          <div className="rounded-2xl overflow-hidden shadow-sm mb-10 relative border border-slate-100">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.title}
              width={800} // Chiều rộng tối đa của vùng chứa nội dung (max-w-3xl)
              height={450} // Tỷ lệ khung hình chuẩn 16:9 cho ảnh blog
              className="w-full h-auto"
              priority // Ưu tiên tải hình ảnh lớn này trước (LCP Optimization)
            />
          </div>
        )}
      </FadeIn>

      {/* Nội dung chi tiết của bài viết */}
      <FadeIn delay={0.3}>
        <article
          className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </FadeIn>

      {/* Khung thông tin tác giả của Long Web Studio */}
      <FadeIn delay={0.4}>
        <section className="mt-16 p-6 sm:p-8 bg-slate-950 text-white rounded-2xl flex flex-col sm:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-800 flex items-center justify-center border-2 border-red-500 text-3xl flex-shrink-0">
            👨‍💻
          </div>
          <div className="text-center sm:text-left">
            <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider block">Tác giả bài viết</span>
            <h4 className="text-base font-bold text-white mt-0.5">Long Web Studio</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Tôi là một Freelancer chuyên phát triển WordPress và Headless Next.js. Hy vọng các bài viết chia sẻ kinh nghiệm thực tế này sẽ mang lại giá trị cho dự án tiếp theo của bạn.
            </p>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
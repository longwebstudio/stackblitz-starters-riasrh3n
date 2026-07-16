import { getPostBySlug, getAllPosts } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/components/FadeIn';

// 1. CẤU HÌNH DYNAMIC METADATA & OPEN GRAPH CHO BÀI VIẾT BLOG
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const title = post.lwsSeo?.title || `${post.title} | Blog Long Web Studio`;
  const description = post.lwsSeo?.metaDesc || `${post.title} - Bài viết chia sẻ kiến thức hữu ích từ freelancer Long Web Studio.`;
  const url = `https://blog.longwebstudio.io/blog/${slug}`;
  const ogImage = post.featuredImage?.node?.sourceUrl || 'https://blog.longwebstudio.io/default-og.jpg';

  return {
    title,
    description,
    alternates: {
      canonical: url,
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
      type: 'article',
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

  // 2. KHAI BÁO DỮ LIỆU CẤU TRÚC JSON-LD (SCHEMA.ORG) CHO BÀI VIẾT BLOG
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'image': post.featuredImage?.node?.sourceUrl || '',
    'datePublished': post.date,
    'description': post.lwsSeo?.metaDesc || `${post.title} - Bài viết chia sẻ kiến thức.`,
    'author': {
      '@type': 'Person',
      'name': 'Long Web Studio',
      'url': 'https://longwebstudio.io.vn',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Long Web Studio',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://i0.wp.com/longwebstudio.io.vn/wordpress/wp-content/uploads/2026/07/logo.png', // Thay đổi thành logo thực tế của bạn
      },
    },
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 flex-grow">
      {/* Nhúng đoạn mã Schema JSON-LD của bài viết */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <FadeIn delay={0.1}>
        <header className="mb-10 text-center">
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

      <FadeIn delay={0.2}>
        {post.featuredImage?.node?.sourceUrl && (
          <div className="rounded-2xl overflow-hidden shadow-sm mb-10 border border-slate-100 relative aspect-video">
            <Image 
              src={post.featuredImage.node.sourceUrl} 
              alt={post.title} 
              width={800}
              height={450}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        )}

        <article className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-6">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* Khung thông tin tác giả */}
        <section className="mt-16 p-6 sm:p-8 bg-slate-950 text-white rounded-2xl flex flex-col sm:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-800 flex items-center justify-center border border-red-500 text-3xl">
            👨‍💻
          </div>
          <div className="text-center sm:text-left">
            <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider block">Tác giả</span>
            <h4 className="text-base font-bold text-white mt-0.5">Long Web Studio</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Tôi là một Freelancer phát triển WordPress và Headless Next.js. Hy vọng các bài viết này mang lại giá trị cho dự án tiếp theo của bạn.
            </p>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
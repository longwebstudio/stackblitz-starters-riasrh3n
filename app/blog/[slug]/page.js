import { getPostBySlug, getAllPosts } from '@/lib/wordpress';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.lwsSeo?.title || `${post.title} | Blog Long Web Studio`,
    description: post.lwsSeo?.metaDesc || `${post.title} - Bài viết chia sẻ kiến thức hữu ích từ freelancer Long Web Studio.`,
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

  return (
    <div class="max-w-3xl mx-auto px-4 py-12 flex-grow">
      <header class="mb-8 text-center">
        <div class="flex items-center justify-center gap-2 text-xs text-slate-400 mb-3">
          <span class="font-bold text-red-600 uppercase">
            {post.categories?.nodes?.[0]?.name || 'Blog'}
          </span>
          <span>&bull;</span>
          <time>{new Date(post.date).toLocaleDateString('vi-VN')}</time>
        </div>
        <h1 class="text-3xl font-black text-slate-950 leading-tight md:text-4xl">
          {post.title}
        </h1>
      </header>

      {post.featuredImage?.node?.sourceUrl && (
        <div class="rounded-2xl overflow-hidden shadow-sm mb-10">
          <img src={post.featuredImage.node.sourceUrl} alt={post.title} class="w-full h-auto" />
        </div>
      )}

      <!-- Bài viết chi tiết -->
      <article class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-6">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>

      <!-- Khung thông tin tác giả -->
      <section class="mt-16 p-6 sm:p-8 bg-slate-950 text-white rounded-2xl flex flex-col sm:flex-row items-center gap-6">
        <div class="w-16 h-16 rounded-full overflow-hidden bg-slate-800 flex items-center justify-center border border-red-500 text-3xl">
          👨‍💻
        </div>
        <div class="text-center sm:text-left">
          <span class="text-[10px] text-red-500 font-bold uppercase tracking-wider block">Tác giả</span>
          <h4 class="text-base font-bold text-white mt-0.5">Long Web Studio</h4>
          <p class="text-xs text-slate-400 mt-2 leading-relaxed">
            Tôi là một Freelancer phát triển WordPress và Headless Next.js. Hy vọng các bài viết này mang lại giá trị cho dự án tiếp theo của bạn.
          </p>
        </div>
      </section>
    </div>
  );
}
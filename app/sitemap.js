import { getAllPosts, getAllBooks } from '@/lib/wordpress';

export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.longwebstudio.io';

  // Khởi tạo mảng trống đề phòng trường hợp kết nối API gặp lỗi
  let posts = [];
  let books = [];

  try {
    // Gọi song song hai hàm lấy dữ liệu để tối ưu thời gian xử lý
    [posts, books] = await Promise.all([getAllPosts(), getAllBooks()]);
  } catch (error) {
    console.error('[Sitemap Generator Error] Lỗi tải dữ liệu sitemap:', error.message);
  }

  // 1. Các trang tĩnh cố định của hệ thống
  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/sach-dau-tu`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // 2. Danh sách sitemap động cho các bài viết Blog
  const postPages = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date || new Date()),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 3. Danh sách sitemap động cho các cuốn Sách Đầu Tư
  const bookPages = books.map((book) => ({
    url: `${siteUrl}/sach-dau-tu/${book.slug}`,
    lastModified: new Date(), // Vì CPT sách không trả về ngày chỉnh sửa trực tiếp, mặc định lấy thời gian hiện tại
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Hợp nhất toàn bộ trang tĩnh và trang động để trả về sitemap chuẩn
  return [...staticPages, ...postPages, ...bookPages];
}
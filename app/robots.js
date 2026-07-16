export default function robots() {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.longwebstudio.io.vn';
  
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',       // Không cho bot quét các route xử lý nội bộ API
          '/*?*',        // Hạn chế bot cào các đường dẫn chứa tham số tìm kiếm/lọc để tránh trùng lặp nội dung (Duplicate Content)
        ],
      },
      sitemap: `${siteUrl}/sitemap.xml`,
    };
  }
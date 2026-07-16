const API_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  'https://longwebstudio.io.vn/wordpress/5ryt3z3skdlf';
const privateToken =
  process.env.LWS_GRAPHQL_PRIVATE_TOKEN ||
  'LongWebStudio_GraphQL_Secure_Key_2026';

async function fetchAPI(query, variables = {}) {
  // Bỏ qua lỗi SSL nếu chạy local (tuỳ chọn)
  // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  // 2. Tự động bỏ qua lỗi SSL khi chạy ở môi trường Development (hữu ích cho Local WP / Laragon)
  // if (process.env.NODE_ENV === 'development') {
  //   process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  // }

  const headers = {
    'Content-Type': 'application/json',
    'lws-secret-token': privateToken,
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 }, // ISR: Cache 60 giây
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();

    if (json.errors) {
      console.error('GraphQL Errors:', json.errors);
      throw new Error('Lỗi truy vấn từ WPGraphQL API');
    }

    return json.data;
  } catch (error) {
    console.error(`[WPGraphQL Fetch Error] Không thể kết nối tới: ${API_URL}`);
    console.error(error.message);

    // Trả về dữ liệu rỗng để trang web không bị crash hoàn toàn (Graceful degradation)
    return null;
  }
}

// 1. Lấy danh sách toàn bộ bài viết blog
export async function getAllPosts() {
  const data = await fetchAPI(`
    query GetPosts {
      posts(first: 100) {
        nodes {
          databaseId
          title
          slug
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `);
  return data?.posts?.nodes || [];
}

// 2. Lấy chi tiết một bài viết blog kèm lwsSeo
export async function getPostBySlug(slug) {
  const data = await fetchAPI(
    `
    query GetPostBySlug($id: ID!) {
      post(id: $id, idType: SLUG) {
        databaseId
        title
        slug
        content
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        lwsSeo {
          title
          metaDesc
        }
      }
    }
  `,
    { id: slug }
  );
  return data?.post || null;
}

// 3. Lấy danh sách toàn bộ sách đầu tư
export async function getAllBooks() {
  const data = await fetchAPI(`
    query GetBooks {
      danhSachSachDauTu(first: 100) {
        nodes {
          databaseId
          title
          slug
          excerpt
          giaBan
          linkAffiliate
          featuredImage {
            node {
              sourceUrl
            }
          }
          sachTags {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `);
  return data?.danhSachSachDauTu?.nodes || [];
}

// 4. Lấy chi tiết một cuốn sách kèm lwsSeo
export async function getBookBySlug(slug) {
  const data = await fetchAPI(
    `
    query GetBookBySlug($id: ID!) {
      sachDauTu(id: $id, idType: SLUG) {
        databaseId
        title
        slug
        content
        giaBan
        linkAffiliate
        featuredImage {
          node {
            sourceUrl
          }
        }
        sachTags {
          nodes {
            name
            slug
          }
        }
        lwsSeo {
          title
          metaDesc
        }
      }
    }
  `,
    { id: slug }
  );
  return data?.sachDauTu || null;
}

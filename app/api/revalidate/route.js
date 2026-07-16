import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// Hàm xử lý chung cho cả GET và POST
async function handleRevalidate(request, path, secret) {
  const expectedSecret = process.env.LWS_REVALIDATE_SECRET;

  // 1. Xác thực tính hợp lệ của mã khoá bảo mật
  if (!secret || secret !== expectedSecret) {
    return NextResponse.json({ message: 'Mã khóa bảo mật (secret) không chính xác' }, { status: 401 });
  }

  // 2. Kiểm tra xem có đường dẫn cần revalidate hay không
  if (!path) {
    return NextResponse.json({ message: 'Thiếu tham số "path" cần cập nhật' }, { status: 400 });
  }

  try {
    // Thực hiện xóa bộ nhớ đệm và cập nhật lại đường dẫn được chỉ định
    revalidatePath(path);

    // Tự động cập nhật lại trang chủ (vì trang chủ chứa danh mục tổng hợp sách và bài viết)
    if (path !== '/') {
      revalidatePath('/');
    }

    // Tự động cập nhật lại trang danh sách sách nếu bài viết thuộc loại sách
    if (path.startsWith('/sach-dau-tu/')) {
      revalidatePath('/sach-dau-tu');
    }

    return NextResponse.json({ 
      revalidated: true, 
      path,
      message: `Đã cập nhật (revalidated) bộ nhớ đệm thành công cho: ${path}` 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: `Lỗi xử lý: ${error.message}` }, { status: 500 });
  }
}

// Handler cho yêu cầu POST (Thường dùng cho Webhook)
export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  
  let path = searchParams.get('path');
  
  // Thử đọc thêm dữ liệu từ body nếu gửi dạng JSON
  try {
    const body = await request.json();
    if (body.path) {
      path = body.path;
    }
  } catch (e) {
    // Bỏ qua lỗi nếu yêu cầu không có body JSON
  }

  return handleRevalidate(request, path, secret);
}

// Handler cho yêu cầu GET (Tiện lợi để test nhanh trên trình duyệt)
// Ví dụ test: https://blog.longwebstudio.io/api/revalidate?secret=khoa_bao_mat_cua_ban_123&path=/blog/bai-viet-test
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const path = searchParams.get('path');

  return handleRevalidate(request, path, secret);
}
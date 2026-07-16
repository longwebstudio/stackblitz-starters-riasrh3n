// lib/wpImageLoader.js
export default function wpImageLoader({ src, width }) {
    // Kiểm tra xem liên kết có phải là đường dẫn tuyệt đối bắt đầu bằng https:// không
    if (src.startsWith('https://')) {
        // Cắt bỏ chuỗi 'https://' ở đầu (8 ký tự)
        const imageUrl = src.substring(8);
        return `https://i0.wp.com/${imageUrl}?fit=${width}%2C${width}&ssl=1`;
    }
    // Trả về liên kết gốc đối với ảnh nội bộ (local) hoặc các trường hợp khác
    return src;
}
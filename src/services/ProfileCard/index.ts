import { User } from "../../models/ProfileCard";

/**
 * Giả lập API lấy thông tin người dùng từ server.
 * Thêm cơ chế caching để tối ưu hiệu suất.
 */

// Biến lưu cache tạm thời để tránh gọi API nhiều lần
let cachedUser: User | null = null;

export const getUser = async (): Promise<User> => {
  // Nếu đã có dữ liệu trong cache, trả về ngay
  if (cachedUser) {
    return Promise.resolve(cachedUser);
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Dữ liệu giả lập
        const userData: User = {
          id: 1,
          name: "Nguyễn Văn A",
          avatar: "https://via.placeholder.com/150",
          bio: "Lập trình viên React với đam mê xây dựng ứng dụng web.",
        };

        // Lưu vào cache để tối ưu lần gọi tiếp theo
        cachedUser = userData;

        resolve(userData);
      } catch (error) {
        reject(new Error("Không thể tải dữ liệu người dùng."));
      }
    }, 1000); // Giả lập độ trễ API (1 giây)
  });
};

/**
 * Hàm xóa cache để lấy dữ liệu mới (nếu cần)
 */
export const clearUserCache = () => {
  cachedUser = null;
};

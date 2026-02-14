import axios from "axios";
import { API_BASE_URL } from "./constant";
import { getToken } from "../util/jwt-helper";
import { jwtDecode } from "jwt-decode";

// Lấy userId từ token (nếu đã đăng nhập)
const getUserId = () => {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.userId || decoded.sub || decoded.id || null;
  } catch {
    return null;
  }
};

// Lấy gợi ý sản phẩm Collaborative Filtering
export const getCollaborativeRecommendations = async(limit = 12) => {
  const userId = getUserId();
  let url = `${API_BASE_URL}/api/recommendations/collaborative?limit=${limit}`;
  if (userId) {
    url += `&userId=${userId}`;
  }

  try {
    const result = await axios.get(url, { withCredentials: true });
    return result?.data || [];
  } catch (err) {
    console.error("Lỗi khi lấy gợi ý collaborative:", err);
    return [];
  }
};

// Lấy sản phẩm phổ biến
export const getPopularProducts = async(limit = 12) => {
  try {
    const result = await axios.get(
      `${API_BASE_URL}/api/recommendations/popular?limit=${limit}`,
      { withCredentials: true }
    );
    return result?.data || [];
  } catch (err) {
    console.error("Lỗi khi lấy sản phẩm phổ biến:", err);
    return [];
  }
};

// Ghi nhận tương tác xem sản phẩm
export const trackProductView = async(productId) => {
  const userId = getUserId();
  try {
    let url = `${API_BASE_URL}/api/recommendations/interactions/view?productId=${productId}`;
    if (userId) url += `&userId=${userId}`;
    await axios.post(url, null, { withCredentials: true });
  } catch (err) {
    // Silent fail - không ảnh hưởng UX
    console.debug("Track view failed:", err);
  }
};

// Ghi nhận tương tác thêm vào giỏ hàng
export const trackAddToCart = async(productId) => {
  const userId = getUserId();
  try {
    let url = `${API_BASE_URL}/api/recommendations/interactions/add-to-cart?productId=${productId}`;
    if (userId) url += `&userId=${userId}`;
    await axios.post(url, null, { withCredentials: true });
  } catch (err) {
    console.debug("Track add-to-cart failed:", err);
  }
};

// Ghi nhận tương tác mua hàng
export const trackPurchase = async(productId) => {
  const userId = getUserId();
  try {
    let url = `${API_BASE_URL}/api/recommendations/interactions/purchase?productId=${productId}`;
    if (userId) url += `&userId=${userId}`;
    await axios.post(url, null, { withCredentials: true });
  } catch (err) {
    console.debug("Track purchase failed:", err);
  }
};
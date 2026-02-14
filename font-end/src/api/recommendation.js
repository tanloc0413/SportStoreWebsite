// import axios from "axios";
// import { API_BASE_URL, getHeaders } from "./constant";
// import { getToken } from "../util/jwt-helper";
// import { jwtDecode } from "jwt-decode";
// import { v4 as uuidv4 } from 'uuid';

// // Lấy userId từ token (nếu đã đăng nhập)
// const getUserId = () => {
//   const token = getToken();
//   if (!token) return null;
//   try {
//     const decoded = jwtDecode(token);
//     return decoded.userId || decoded.sub || decoded.id || null;
//   } catch {
//     return null;
//   }
// };

// // Lấy gợi ý sản phẩm Collaborative Filtering
// export const getCollaborativeRecommendations = async(limit = 12) => {
//   const userId = getUserId();
//   let url = `${API_BASE_URL}/api/recommendations/collaborative?limit=${limit}`;
//   if (userId) {
//     url += `&userId=${userId}`;
//   }

//   try {
//     const result = await axios.get(url, { withCredentials: true });
//     return result?.data || [];
//   } catch (err) {
//     console.error("Lỗi khi lấy gợi ý collaborative:", err);
//     return [];
//   }
// };

// // Lấy sản phẩm phổ biến
// export const getPopularProducts = async(limit = 12) => {
//   try {
//     const result = await axios.get(
//       `${API_BASE_URL}/api/recommendations/popular?limit=${limit}`,
//       { withCredentials: true }
//     );
//     return result?.data || [];
//   } catch (err) {
//     console.error("Lỗi khi lấy sản phẩm phổ biến:", err);
//     return [];
//   }
// };

// // Ghi nhận tương tác xem sản phẩm
// export const trackProductView = async(productId) => {
//   const userId = getUserId();

//   try {
//     let url = `${API_BASE_URL}/api/recommendations/interactions/view?productId=${productId}`;

//     if (userId) url += `&userId=${userId}`;

//     await axios.post(url, null, { 
//       withCredentials: true 
//     });
//   } catch (err) {
//     // Silent fail - không ảnh hưởng UX
//     console.debug("Track view failed:", err);
//   }
// };

// // Ghi nhận tương tác thêm vào giỏ hàng
// export const trackAddToCart = async(productId) => {
//   const userId = getUserId();
//   try {
//     let url = `${API_BASE_URL}/api/recommendations/interactions/add-to-cart?productId=${productId}`;
//     if (userId) url += `&userId=${userId}`;
//     await axios.post(url, null, { withCredentials: true });
//   } catch (err) {
//     console.debug("Track add-to-cart failed:", err);
//   }
// };

// // Ghi nhận tương tác mua hàng
// export const trackPurchase = async(productId) => {
//   const userId = getUserId();
//   try {
//     let url = `${API_BASE_URL}/api/recommendations/interactions/purchase?productId=${productId}`;
//     if (userId) url += `&userId=${userId}`;
//     await axios.post(url, null, { withCredentials: true });
//   } catch (err) {
//     console.debug("Track purchase failed:", err);
//   }
// };

import axios from "axios";
import { API_BASE_URL } from "./constant";
import { getToken } from "../util/jwt-helper";
import { jwtDecode } from "jwt-decode";
import { v4 as uuidv4 } from 'uuid'; // Cần cài: npm install uuid

// 1. Hàm lấy UserId từ Token
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

// 2. Hàm lấy SessionId (Guest ID) ổn định
const getSessionId = () => {
  let sessionId = localStorage.getItem('guest_session_id');
  if (!sessionId) {
    sessionId = uuidv4(); // Tạo ID ngẫu nhiên duy nhất
    localStorage.setItem('guest_session_id', sessionId);
  }
  return sessionId;
};

// 3. Hàm chung để gửi tracking
const trackInteraction = async (endpoint, params) => {
  const userId = getUserId();
  const sessionId = getSessionId();

  // Gom params lại
  const queryParams = new URLSearchParams({
    ...params,
    sessionId: sessionId // Luôn gửi sessionId
  });

  if (userId) {
    queryParams.append('userId', userId);
  }

  try {
    await axios.post(`${API_BASE_URL}/api/recommendations/interactions/${endpoint}?${queryParams.toString()}`);
    // console.log(`Tracked ${endpoint} success`);
  } catch (err) {
    console.error(`Lỗi track ${endpoint}:`, err);
  }
};

// --- CÁC HÀM EXPORT ---

export const getCollaborativeRecommendations = async (limit = 12) => {
  const userId = getUserId();
  const sessionId = getSessionId();

  let url = `${API_BASE_URL}/api/recommendations/collaborative?limit=${limit}&sessionId=${sessionId}`;
  if (userId) url += `&userId=${userId}`;

  try {
    const result = await axios.get(url);
    return result?.data || [];
  } catch (err) {
    console.error("Lỗi recommendation:", err);
    return [];
  }
};

// Tracking: Xem sản phẩm
export const trackProductView = async (productId) => {
  await trackInteraction('view', { productId });
};

// Tracking: Thêm vào giỏ
export const trackAddToCart = async (productId) => {
  await trackInteraction('add-to-cart', { productId });
};

// Tracking: Mua hàng
export const trackPurchase = async (productId) => {
  await trackInteraction('purchase', { productId });
};

// Tracking: Tìm kiếm (Bổ sung thêm nếu cần)
export const trackSearch = async (keyword) => {
  await trackInteraction('search', { keyword });
};
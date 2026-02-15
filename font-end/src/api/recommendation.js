import axios from "axios";
import { API_BASE_URL } from "./constant";
import { getToken } from "../util/jwt-helper";
import { jwtDecode } from "jwt-decode";
import { v4 as uuidv4 } from 'uuid';

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

const getAuthConfig = () => {
  const token = getToken();

  if (!token) {
    return { withCredentials: true };
  }

  return {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

// 3. Hàm chung để gửi tracking
const trackInteraction = async (endpoint, params) => {
  const userId = getUserId();
  const sessionId = getSessionId();

  // Gom params lại
  const queryParams = new URLSearchParams({
    ...params,
    sessionId: sessionId
  });

  if (userId) {
    queryParams.append('userId', userId);
  }

  try {
    // await axios.post(`${API_BASE_URL}/api/recommendations/interactions/${endpoint}?${queryParams.toString()}`);
    await axios.post(
      `${API_BASE_URL}/api/recommendations/interactions/${endpoint}?${queryParams.toString()}`,
      null,
      getAuthConfig()
    );
    console.log(`Tracked ${endpoint} success`);
  } catch (err) {
    const status = err?.response?.status;
    if (status === 302 || status === 401 || status === 403) {
      return;
    }
    console.error(`Lỗi track ${endpoint}:`, err);
  }
};

export const getCollaborativeRecommendations = async (limit = 12) => {
  const userId = getUserId();
  const sessionId = getSessionId();

  const token = getToken();

  // Tránh bị redirect OAuth2 (302) khi chưa đăng nhập
  if (!token) {
    return [];
  }

  let url = `${API_BASE_URL}/api/recommendations/collaborative?limit=${limit}&sessionId=${sessionId}`;
  if (userId) url += `&userId=${userId}`;

  try {
    // const result = await axios.get(url);
    const result = await axios.get(url, getAuthConfig());
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

// Tracking: Tìm kiếm (debounced - chỉ track 1 lần cho mỗi từ khóa)
let _lastTrackedKeyword = '';
export const trackSearch = async (keyword) => {
  if (!keyword || keyword.trim() === '' || keyword.trim() === _lastTrackedKeyword) return;
  _lastTrackedKeyword = keyword.trim();
  await trackInteraction('search', { keyword: keyword.trim() });
};

// Lấy gợi ý dựa trên từ khóa tìm kiếm (Search-Based CF)
export const getSearchBasedRecommendations = async (keyword, limit = 12) => {
  const userId = getUserId();
  const sessionId = getSessionId();

  let url = `${API_BASE_URL}/api/recommendations/search-based?keyword=${encodeURIComponent(keyword)}&limit=${limit}&sessionId=${sessionId}`;
  if (userId) url += `&userId=${userId}`;

  try {
    const result = await axios.get(url);
    return result?.data || [];
  } catch (err) {
    console.error("Lỗi search-based recommendation:", err);
    return [];
  }
};

// Lấy sản phẩm phổ biến
export const getPopularProducts = async (limit = 12) => {
  try {
    const result = await axios.get(
      `${API_BASE_URL}/api/recommendations/popular?limit=${limit}`
    );
    return result?.data || [];
  } catch (err) {
    console.error("Lỗi popular products:", err);
    return [];
  }
};

// Lấy gợi ý Hybrid (kết hợp)
export const getHybridRecommendations = async (limit = 20) => {
  const userId = getUserId();
  const sessionId = getSessionId();

  let url = `${API_BASE_URL}/api/recommendations/hybrid?limit=${limit}&sessionId=${sessionId}`;
  if (userId) url += `&userId=${userId}`;

  try {
    const result = await axios.get(url);
    return result?.data || [];
  } catch (err) {
    console.error("Lỗi hybrid recommendation:", err);
    return [];
  }
};
import { jwtDecode } from "jwt-decode";

export const isTokenValid = () => {
  const token = localStorage.getItem('authToken');
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // Check if the token is expired
    return decoded.exp > currentTime;
  } catch(error) {
    console.error("Token không hợp lệ", error);
    return false;
  }
}

export const saveToken = (token) => {
  // console.log("TOKEN SAVE:", token);
  localStorage.setItem('authToken', token);
  window.dispatchEvent(new Event('auth-changed'));
}


export const logOut = () => {
  localStorage.removeItem('authToken');
  window.dispatchEvent(new Event('auth-changed'));
}

export const getToken = (token) => {
  return localStorage.getItem('authToken', token);
}
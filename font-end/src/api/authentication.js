import axios from "axios";
import { API_BASE_URL, getHeaders } from "./constant";

export const loginAPI = async(body) => {
  const url = API_BASE_URL + '/api/auth/login';

  try {
    const response = await axios(url,{
      method: "POST",
      data: body
    });
    
    return response?.data;
  } 
  catch(err) {
    throw new Error(err);
  }
}

export const registerAPI = async(body) => {
  const url = API_BASE_URL + '/api/auth/register';
  try {
    const response = await axios(url, {
      method: "POST",
      data: body
    });

    return response?.data;
  } 
  catch(err) {
    throw new Error(err);
  }
}

export const verifyAPI = async(body) => {
  const url = API_BASE_URL + '/api/auth/verify';
  try {
    const response = await axios(url, {
      method: "POST",
      data: body
    });
    return response?.data;
  } 
  catch(err) {
    throw new Error(err);
  }
}

export const changePasswordAPI = async(body) => {
  const url = API_BASE_URL + '/api/auth/change-password';
  
  try {
    const response = await axios(url,{
      method: "POST",
      data: body,
      headers: getHeaders()
    });

    return response?.data;
  }
  catch(err) {
    throw new Error(err);
  }
}

export const forgotPasswordAPI = async (email) => {
  const url = `${API_BASE_URL}/api/auth/forgot-password`;
  try {
    const response = await axios.post(url, { email });
    return response.data;
  } catch (err) {
    throw err.response ? err.response.data : new Error("Lỗi kết nối");
  }
};

export const resetPasswordAPI = async (data) => {
  const url = `${API_BASE_URL}/api/auth/reset-password`;
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (err) {
    throw err.response ? err.response.data : new Error("Lỗi kết nối");
  }
};
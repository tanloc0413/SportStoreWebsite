import axios from "axios";
import { API_BASE_URL, getHeaders } from "./constant";

export const fetchBrands = async() => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/brands`);
    return res.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const createBrandAPI = async(data) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/brands`, data, {
      headers: getHeaders()
    });
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const deleteBrandAPI = async(id) => {
  try {
    await axios.delete(`${API_BASE_URL}/api/brands/${id}`, {
      headers: getHeaders()
    });
    return true;
  } catch (e) {
    throw e;
  }
};
import axios from "axios";
import { API_BASE_URL, API_URLS } from "./constant";

export const getAllProducts = async (id, typeId) => {
  let url = API_BASE_URL + API_URLS.GET_PRODUCTS + `?categoryId=${id}`;

  if (typeId) {
    url = url + `&typeId=${typeId}`;
  }

  try {
    const result = await axios(url, {
      method: "GET"
    });
    return result?.data;
  } catch (err) {
    console.error(err);
  }
}

export const fetchProducts = async (page = 1, limit = 20, categoryTypeId = null) => {
  try {
    let url = `${API_BASE_URL}/api/products?page=${page}&limit=${limit}`;
    if (categoryTypeId) {
      url += `&categoryTypeId=${categoryTypeId}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductBySlug = async (slug) => {
  const url = API_BASE_URL + API_URLS.GET_PRODUCTS + `?slug=${slug}`;

  try {
    const result = await axios(url, {
      method: "GET",
    });
    return result?.data?.[0];
  } catch (err) {
    console.error(err);
  }
}

export const fetchProductDetail = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product detail:', error);
    throw error;
  }
};

export const searchProducts = async (keyword) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/products/search`, {
      params: { keyword }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};
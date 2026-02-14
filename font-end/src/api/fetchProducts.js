import axios from "axios";
import { API_BASE_URL, API_URLS, getHeaders } from "./constant";

// lấy tất cả sản phẩm
export const getAllProducts = async() => {
  let url = API_BASE_URL + API_URLS.GET_PRODUCTS;
  
  try {
    const result = await axios.get(url);
    // console.log("All products:", result?.data);
    return result?.data;
  } catch(err) {
    console.error("Lỗi khi gọi: ", err);
  }
}

// lấy sản phẩm theo thể loại
export const getAllProductByCategory = async(categoryId, typeId) => {
  let url = API_BASE_URL + API_URLS.GET_PRODUCTS + `?categoryId=${categoryId}`;

  if(typeId) {
    url = url + `&typeId=${typeId}`;
  }

  try {
    const result = await axios.get(url);
    // console.log("Products by category: ", result?.data);
    return result?.data;
  }
  catch(err){
    console.error(err);
  }
}

export const getProductBySlug = async(slug) => {
  const url = API_BASE_URL + API_URLS.GET_PRODUCTS + `?slug=${slug}`;
  try{
    const result = await axios(url,{
      method:"GET",
    });
    return result?.data?.[0];
  }
  catch(err){
    console.error(err);
  }
}

export const addProductAPI = async(data) => {
  const url = API_BASE_URL + "/api/products";

  const response = await axios(url, {
    method: "POST",
    data,
    headers: getHeaders()
  });

  return response.data;
};

export const addNewProductAPI = async(productData) => {
  const url = API_BASE_URL + '/api/products';
  const response = await axios(url, {
    method: "POST",
    data: productData,
    headers: getHeaders()
  });
  return response?.data;
}

// tìm kiếm
export const searchProductsAPI = async(keyword) => {
  let url = API_BASE_URL + API_URLS.GET_PRODUCTS + `?keyword=${keyword}`;
  try {
    const result = await axios.get(url);
    return result?.data || [];
  } catch(err) {
    console.error("Lỗi khi tìm kiếm sản phẩm: ", err);
    return [];
  }
}

// Cập nhật sản phẩm
export const updateProductAPI = async(id, productData) => {
  const url = `${API_BASE_URL}/api/products/${id}`;
  try {
    const response = await axios(url, {
      method: "PUT",
      data: productData,
      headers: getHeaders()
    });
    return response?.data;
  } catch (err) {
    console.error("Lỗi update product:", err);
    throw err;
  }
};

// Xóa sản phẩm
export const deleteProductAPI = async(id) => {
  const url = `${API_BASE_URL}/api/products/${id}`;
  try {
    await axios.delete(url, { headers: getHeaders() });
    return true;
  } catch (err) {
    console.error("Lỗi xóa product:", err);
    return false;
  }
};
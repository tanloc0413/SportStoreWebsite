import axios from "axios";
import { API_BASE_URL, API_URLS } from "./constant";

// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export const getProducts = async (params = {}) => {
//   try {
//     const response = await apiClient.get(API_URLS.GET_PRODUCTS, {
//       params, // ?categoryId=1&typeId=2 ...
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Get products error:", error);
//   }
// };

export const getAllProducts = async () => {
  let url = API_BASE_URL + API_URLS.GET_PRODUCTS;
  
  try {
    const result = await axios.get(url);
    // console.log("All products:", result?.data);
    return result?.data;
  } catch(err) {
    console.error("Lỗi khi gọi: ", err);
  }
}


export const getAllProductByCategory = async (categoryId, typeId)=>{
  let url = API_BASE_URL + API_URLS.GET_PRODUCTS + `?categoryId=${categoryId}`;

  if(typeId) {
    url = url + `&typeId=${typeId}`;
  }

  try {
    const result = await axios(url, {
      method:"GET"
    });
    return result?.data;
  }
  catch(err){
    console.error(err);
  }
}

export const getProductBySlug = async (slug) => {
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
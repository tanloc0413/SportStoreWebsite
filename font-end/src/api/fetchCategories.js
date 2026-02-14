import axios from 'axios';
import { API_BASE_URL, API_URLS, getHeaders } from './constant';

export const fetchCategories = async() => {
    const url = API_BASE_URL + API_URLS.GET_CATEGORIES;

    try {
        const result = await axios.get(url);
        return result?.data;
    } 
    catch(e) {
        console.log(e);
    }
}

export const createCategoryAPI = async(data) => {
  const url = API_BASE_URL + "/api/category";

  const response = await axios(url, {
    method: "POST",
    data: data,
    headers: getHeaders()
  });

  return response?.data;
};
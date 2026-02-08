import axios from "axios";
import { API_BASE_URL, getHeaders } from "./constant";
import { getToken } from "../util/jwt-helper";

export const fetchUserDetails = async() => {
    const url = 'http://localhost:8080/api/user/profile';
    
    try {
        const response = await axios(url,{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getToken()}`
            }
        });
        return response?.data;
    }
    catch(err) {
        // throw new Error(err);
        throw err;
    }
}

// export const fetchUserDetail = async () => {
//   const token = localStorage.getItem("authToken");

//   if (!token) {
//     console.log("Không có token");
//     return { addressList: [] };
//   }

//   const url = API_BASE_URL + '/api/user/profile';

//   const response = await axios(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     data: {
//       token: token
//     }
//   });

//   return response?.data;
//     return fetchUserDetails();
// };

export const fetchUserDetail2 = async() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        return { addressList: [] };
    }

    const url = API_BASE_URL + '/api/user/profile';
    
    try {
        const response = await axios(url,{
            method:"GET",
            headers: {
                ...getHeaders(),
                "Content-Type": "application/json"
            }
        });
        return response?.data;
    }
    catch(err) {
        const statusCode = err?.response?.status;
        const message = err?.response?.data?.message || err?.message || "Không thể lấy thông tin user";
        throw new Error(`[fetchUserDetails] ${statusCode ?? "UNKNOWN"}: ${message}`);
    }
}

export const fetchUserDetail1 = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        throw new Error("Chưa đăng nhập hoặc token không tồn tại");
    }

    const url = API_BASE_URL + '/api/user/profile';
    
    const normalizedToken = token.startsWith("Bearer ") ? token.slice(7) : token;

    try {
        const response = await axios(url, {
            method: "GET",
            headers: {
                ...getHeaders(),
                Authorization: `Bearer ${normalizedToken}`,
                "Content-Type": "application/json"
            }
        });

        return response?.data;
    }
    catch(err) {
        const message = err?.response?.data?.message || err?.message || "Không thể lấy thông tin người dùng";
        throw new Error(message);
    }
}


export const addAddressAPI = async(data) => {
    const url = API_BASE_URL + '/api/address';

    try {
        const response = await axios(url, {
            method: "POST",
            data: data,
            headers: getHeaders()
        });
        return response?.data;
    }
    catch(err) {
        throw new Error(err);
    }
}

export const deleteAddressAPI = async(id) => {
    const url = API_BASE_URL + `/api/address/${id}`;

    try {
        const response = await axios(url, {
            method: "DELETE",
            headers: getHeaders()
        });
        return response?.data;
    }
    catch(err) {
        throw new Error(err);
    }
}

export const fetchOrderAPI = async() => {
    const url = API_BASE_URL + `/api/order/user`;

    try{
        const response = await axios(url, {
            method: "GET",
            headers: getHeaders()
        });
        return response?.data;
    }
    catch(err) {
        throw new Error(err);
        // throw err;
    }
}

export const cancelOrderAPI = async(id) => {
    const url = API_BASE_URL + `/api/order/cancel/${id}`;

    try{
        const response = await axios(url, {
            method: "POST",
            headers: getHeaders()
        });
        return response?.data;
    }
    catch(err) {
        throw new Error(err);
        // throw err;
    }
}
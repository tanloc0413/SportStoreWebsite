import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { API_BASE_URL } from "../../api/constant"; // [cite: 1652]
import { getHeaders } from "../../api/constant"; // Import thêm getHeaders để có token
import { trackPurchase } from "../../api/recommendation";

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Lấy query string từ URL (vnp_Amount, vnp_ResponseCode, vnp_SecureHash...)
        // searchParams.toString() sẽ trả về chuỗi query đầy đủ
        const queryString = searchParams.toString();
        
        // Gọi về Backend để verify hash và cập nhật DB
        // Dùng getHeaders() để gửi kèm Token nếu API yêu cầu xác thực
        const res = await axios.get(`${API_BASE_URL}/api/order/vnpay/return?${queryString}`, {
          headers: getHeaders() 
        });

        if (res.data.status === 'success') {
          setStatus('success');

          if(res.data.data && res.data.data.orderItemList){
              res.data.data.orderItemList.forEach(item => {
                // Gọi API track purchase cho từng sản phẩm đã mua thành công
                trackPurchase(item.product.id); 
              });
          }
        } else {
          setStatus('failed');
        }
      } catch (error) {
        console.error("Lỗi xác thực thanh toán:", error);
        setStatus('failed');
      }
    };

    if (searchParams.toString()) {
      verifyPayment();
    }
  }, [searchParams]);

  return (
    <div className='confirmOrder' style={{textAlign: 'center', paddingTop: '50px'}}>
      {status === 'loading' && <p>Đang xử lý kết quả thanh toán...</p>}
      
      {status === 'success' && (
        <div className='confirmOrder_form'>
          <FaCheckCircle style={{fontSize: '60px', color: 'green', marginBottom: '20px'}} />
          <h2>Thanh toán thành công!</h2>
          <button className='confirmOrder_btn confirmOrder_btn1' onClick={() => navigate('/tai-khoan/don-hang')}>
            Xem đơn hàng
          </button>
        </div>
      )}

      {status === 'failed' && (
        <div className='confirmOrder_form'>
          <FaTimesCircle style={{fontSize: '60px', color: 'red', marginBottom: '20px'}} />
          <h2>Thanh toán thất bại</h2>
          <p>Có lỗi xảy ra hoặc giao dịch bị hủy.</p>
          <button className='confirmOrder_btn confirmOrder_btn2' onClick={() => navigate('/gio-hang')}>
            Quay lại giỏ hàng
          </button>
        </div>
      )}
    </div>
  )
};

export default PaymentPage;
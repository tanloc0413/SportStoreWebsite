import React, { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import '../../css/user/confirmOrder.css';
import { formatDateVN, formatMoney } from '../../component/FormatMoney/formatMoney';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/features/cart';

const ConfirmOrder = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const order = state?.order;
  const receiver = state?.receiver;
  const shippingFee = state?.shippingFee;

  return (
    <div className='confirmOrder'>
      <div className='confirmOrder_form'>
        <p className='confirmOrder_form-title'>
          Xác nhận đơn hàng
        </p>
        <div className='confirmOrder_text'>
          <p
            className='confirmOrder_text1'
          >
            Tên khách hàng: 
          </p>
          <p
            className='confirmOrder_text2'
          >
            {receiver?.fullName}
          </p>
        </div>
        <div className='confirmOrder_text'>
          <p
            className='confirmOrder_text1'
          >
            Số điện thoại: 
          </p>
          <p
            className='confirmOrder_text2'
          >
            {receiver?.phoneNumber}
          </p>
        </div>
        {/* <div className='confirmOrder_text'>
          <p
            className='confirmOrder_text1'
          >
            Mã đơn hàng: 
          </p>
          <p
            className='confirmOrder_text2'
          >
            #ORDER{order.orderId}
          </p>
        </div> */}
        <div className='confirmOrder_text'>
          <p
            className='confirmOrder_text1'
          >
            Ngày đặt hàng: 
          </p>
          <p
            className='confirmOrder_text2'
          >
            {formatDateVN(order.orderDate)}
          </p>
        </div>
        <div className='confirmOrder_text'>
          <p
            className='confirmOrder_text1'
          >
            Phương thức thanh toán: 
          </p>
          <p
            className='confirmOrder_text2'
          >
            {order.paymentMethod}
          </p>
        </div>
        <div className='confirmOrder_text'>
          <p
            className='confirmOrder_text1'
          >
            Phí ship: 
          </p>
          <p
            className='confirmOrder_text2'
          >
            {formatMoney(shippingFee)}
          </p>
        </div>
        <div className='confirmOrder_text confirmOrder_textDiv'>
          <p
            className='confirmOrder_text1'
          >
            Tổng tiền hàng: 
          </p>
          <p
            className='confirmOrder_text2'
          >
            {formatMoney(order.totalAmount)}
          </p>
        </div>
        <div className='confirmOrder_btnGr'>
          <button 
            className='confirmOrder_btn confirmOrder_btn1' 
            onClick={() => navigate('/tai-khoan/don-hang')}
          >
            Tiếp tục mua sắm
          </button>
          <button 
            className='confirmOrder_btn confirmOrder_btn2'
            onClick={() => navigate('/')}
          >
            Trang chủ
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmOrder;
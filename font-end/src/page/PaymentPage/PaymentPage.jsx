import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import '../../css/user/payment.css';
import { setLoading } from "../../store/features/common";
import { fetchUserDetails } from "../../api/userInfo";
import { selectCartItems } from "../../store/features/cart";

const PaymentPage = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    dispatch(setLoading(true))
    fetchUserDetails()
    .then(res => {
      setUserInfo(res);
    }).catch(err => {
      console.error("Không thể lấy thông tin người dùng:", err);
    }).finally(() => {
      dispatch(setLoading(false))
    })
  }, [dispatch]);

  return (
    <div className="paymentMethod">
      
    </div>
  )
};

export default PaymentPage;

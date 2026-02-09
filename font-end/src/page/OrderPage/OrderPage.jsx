import React, { useMemo, useState, useEffect } from "react";
import { FaShippingFast } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "../../css/user/orderPage.css";
import VoucherImg from "../../imgs/voucher-icon.svg";
import VNPayIcon from "../../imgs/vnpay-icon.png";
import { selectCartItems } from "../../store/features/cart";
import { formatMoney } from "../../component/FormatMoney/formatMoney";
import { fetchUserDetails } from "../../api/userInfo";
import { setLoading } from "../../store/features/common";

const OrderPage = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  // phương thức thanh toán
  const [paymentMethod,setPaymentMethod] = useState('COD');

  const [userInfo, setUserInfo] = useState([]);

  const navigate = useNavigate();

  const subTotal = useMemo(() => {
    let value = 0;
    cartItems?.forEach(element => {
      value += element?.subTotal 
    });
    // return value?.toFixed(2);
    return value;
  }, [cartItems]);

  useEffect(() => {
    dispatch(setLoading(true))
    fetchUserDetails()
    .then(res => {
      setUserInfo(res)
      console.log("USER: ", res)
    })
    .catch((err) => {
      console.error("Lỗi: ", err)
    })
  }, [dispatch]);
  
  const shippingFee = useMemo(() => {
    if (subTotal > 1_000_000) return 0;
    if (subTotal > 500_000) return 15_000;
    return 30_000;
  }, [subTotal]);

  const totalPayment = useMemo(() => {
    return subTotal + shippingFee;
  }, [subTotal, shippingFee]);

  const primaryAddress = userInfo?.addressList?.[0];

  return (
    <div id="orderPage">
      <div id="orderPage_shipping">
        <div id="orderPage_shipping1">
          <FaShippingFast className="shipping-icon" />
          <p id="shipping-title">Địa chỉ nhận hàng:</p>
        </div>
        <div id="orderPage_shipping2">
          {/* {userInfo?.addressList?.length > 0 && */}
          {/* {userInfo?.addressList &&  */}
          {primaryAddress ?
            <>
              <div id="shipping-contact">
                <p className="shipping-user shipping-text">
                  {userInfo?.fullName || "Chưa có thông tin người nhận"}
                </p>
                <p className="shipping-phone shipping-text">
                  <span>SĐT: </span>{primaryAddress?.phoneNumber || "Chưa có số điện thoại"}
                </p>
                <p className="shipping-address shipping-text">
                  {primaryAddress ? (
                    <>
                      <span>Địa chỉ: </span>
                      Đường {primaryAddress?.street},{" "}
                      {primaryAddress?.commune
                      ? `xã ${primaryAddress.commune}`
                      : `phường ${primaryAddress?.ward}`},{" "}
                      {primaryAddress?.cityOfProvince}
                    </>
                  ) : (
                    <span>Chưa có địa chỉ mặc định. Vui lòng thêm địa chỉ trong hồ sơ.</span>
                  )}
                </p>
              </div>
              <Link className="shipping_edit-btn" to={'/tai-khoan/dia-chi'}>
                <FaRegEdit className="shipping_edit-icon" />
              </Link>
            </>
          :
            <div id="shipping-contact">
              <p className="shipping-user shipping-text">
                {userInfo?.fullName || "Chưa có thông tin người nhận"}
              </p>
              <p className="shipping-phone shipping-text">
                {userInfo?.phoneNumber || "Chưa có số điện thoại"}
              </p>
              <p className="shipping-address shipping-text">
                <span>Địa chỉ: </span>
                Bạn chưa có địa chỉ mặc định. Vui lòng cập nhật địa chỉ trước khi đặt hàng.
              </p>
            </div>
          }
        </div>
      </div>
      <div id="orderPage_product">
        <div id="orderPage_product1">
          <p className="orderPage_product1-text orderPage-product">Sản phẩm</p>
          <div id="orderPage_product-total">
            <p className="orderPage_product1-text orderPage-price">Đơn giá</p>
            <p className="orderPage_product1-text orderPage-quantity">
              Số lượng
            </p>
            <p className="orderPage_product1-text orderPage-total">
              Thành tiền
            </p>
          </div>
        </div>
        <div id="orderPage_product2">
          {cartItems.map((item, index) => (
            <div id="orderPage_item" key={index}>
              <div id="orderPage_item1">
                <img
                  src={item?.image}
                  alt="sản phẩm"
                  id="orderPage_item1-img"
                />
                <div id="orderPage_item1-text">
                  <p id="orderPage_item1-name">{item?.name}</p>
                  <p id="orderPage_item1-cate">Loại:</p>
                </div>
              </div>
              <div id="orderPage_item2">
                <p className="orderPage_item2-text orderPage-price">
                  {formatMoney(item?.price)}
                </p>
                <p className="orderPage_item2-text orderPage-quantity">
                  {item?.quantity}
                </p>
                <p className="orderPage_item2-text orderPage-total">
                  {formatMoney(item?.subTotal)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div id="orderPage_payment">
        <div id="orderPage_voucher">
          <div id="orderPage_voucher1">
            <img
              src={VoucherImg}
              alt="icon voucher"
              className="block-select voucher-icon"
            />
            <p className="payment-text block-select">Mã voucher:</p>
          </div>
          <div id="orderPage_voucher2">Chọn mã</div>
        </div>
        <div id="orderPage_payMethod">
          <div id="orderPage_payMethod1">
            <FaRegCreditCard className="block-select payMethod-icon1" />
            <p className="payment-text block-select payMethod-title">
              Phương thức thanh toán:
            </p>
          </div>
          <div id="orderPage_payMethod2">
            <label id="payMethod_cod" className="payMethod-select">
              <input
                type="radio"
                className="payMethod-radio"
                name="payment_method"
                value={'COD'}
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod('COD')}
              />
              <p id="payMethod-text">Thanh toán bằng tiền mặt (COD)</p>
            </label>
            <label id="payMethod_vnpay" className="payMethod-select">
              <input
                type="radio"
                className="payMethod-radio"
                name="payment_method"
                value={'VNPay'}
                checked={paymentMethod === "VNPay"}
                onChange={() => setPaymentMethod('VNPay')}
              />
              <img src={VNPayIcon} alt="VNPay Icon" className="vnpay-icon" />
            </label>
          </div>
        </div>
        <div id="orderPage_total">
          <div className="orderPage_total-blk">
            <p className="total-text1">Tổng tiền hàng:</p>
            <p className="total-text2">{formatMoney(subTotal)}</p>
          </div>
          <div className="orderPage_total-blk">
            <p className="total-text1">Tổng phí vận chuyển:</p>
            <p className="total-text2">{formatMoney(shippingFee)}</p>
          </div>
          <div className="orderPage_total-blk">
            <p className="total-text1">Tổng số tiền giảm giá:</p>
            <p className="total-text2 total-text3">
              
            </p>
          </div>
          <div className="orderPage_total-blk">
            <p className="total-text4">Tổng thanh toán:</p>
            <p className="total-text5">{formatMoney(totalPayment)}</p>
          </div>
          <div className="orderPage_total-btn">
            {paymentMethod === 'CARD' && <button id="total-btn">Đặt hàng</button>}
            {paymentMethod !== 'CARD' && <button id="total-btn" onClick={() => navigate('/dat-hang-thanh-cong')}>Đặt hàng</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
import React, { useMemo, useState, useEffect } from "react";
import { FaShippingFast } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "../../css/user/orderPage.css";
import VoucherImg from "../../imgs/voucher-icon.svg";
import VNPayIcon from "../../imgs/vnpay-icon.png";
import { selectCartItems } from "../../store/features/cart";
import { formatMoney } from "../../component/FormatMoney/formatMoney";
import { fetchUserDetails } from "../../api/userInfo";
import { setLoading } from "../../store/features/common";
import { isTokenValid } from "../../util/jwt-helper";

const OrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [userInfo, setUserInfo] = useState({});
  const [payMethod, setPayMethod] = useState("cod");

  const normalizeProfile = (payload, depth = 0) => {
    if (!payload || depth > 3) return {};

    if (typeof payload === "string") {
      try {
        const parsed = JSON.parse(payload);
        return normalizeProfile(parsed, depth + 1);
      } catch (error) {
        console.error("Invalid profile payload format:", error);
        return {};
      }
    }

    if (typeof payload !== "object") {
      return {};
    }

    if (payload?.data) {
      return normalizeProfile(payload.data, depth + 1);
    }

    const normalizedAddressList = Array.isArray(payload?.addressList)
      ? payload.addressList
      : normalizeProfile(payload?.addressList, depth + 1);

    return {
      ...payload,
      addressList: Array.isArray(normalizedAddressList) ? normalizedAddressList : [],
    };
  };

  
  const subTotal = useMemo(() => {
    let value = 0;
    cartItems?.forEach((element) => {
      value += element?.subTotal;
    });
    return value?.toFixed(2);
  }, [cartItems]);

  // useEffect(() => {
  //   dispatch(setLoading(true));
  //   fetchUserDetails()
  //     .then((res) => {
  //       console.log("User info:", res);
  //       setUserInfo(res);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching user details:", err);
  //     })
  //     .finally(() => {
  //       dispatch(setLoading(false));
  //     });
  // }, [dispatch]);

  useEffect(() => {
    if (!isTokenValid()) {
      navigate("/dang-nhap");
      return;
    }

    dispatch(setLoading(true));
    fetchUserDetails()
      .then((res) => {
        // console.log("User info:", res);
        // const profile = res?.data ?? res ?? {};
        // setUserInfo(profile);
        const profile = normalizeProfile(res);
        setUserInfo(profile);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          navigate("/dang-nhap");
          return;
        }

        console.error("Error fetching user details:", err);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  // }, [dispatch]);
  }, [dispatch, navigate]);

  const primaryAddress = Array.isArray(userInfo?.addressList)
    ? userInfo?.addressList?.[0]
    : undefined;


  

  return (
    <div id="orderPage">
      <div id="orderPage_shipping">
        <div id="orderPage_shipping1">
          <FaShippingFast className="shipping-icon" />
          <p id="shipping-title">Địa chỉ nhận hàng:</p>
        </div>
        <div id="orderPage_shipping2">
          {/* {userInfo?.addressList && ( */}
          {/* {primaryAddress?.length > 0 && ( */}
          {primaryAddress ? (
            <>
              <div id="shipping-contact">
                <p className="shipping-user shipping-text">
                  {primaryAddress?.fullName}
                </p>
                <p className="shipping-phone shipping-text">
                  {primaryAddress?.phoneNumber}
                </p>
                <p className="shipping-address shipping-text">
                  <span>Địa chỉ: </span>
                  {primaryAddress?.street},{" "}
                  {primaryAddress?.ward},{" "}
                  {primaryAddress?.cityOfProvince}
                </p>
              </div>
              <button className="shipping_edit-btn">
                <FaRegEdit className="shipping_edit-icon" />
              </button>
            </>
          // )}
          ) : (
            <p className="shipping-address shipping-text">Bạn chưa có địa chỉ nhận hàng.</p>
          )}
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
                name="payMethod"
                checked={payMethod === "cod"}
                onChange={() => setPayMethod("cod")}
              />
              <p id="payMethod-text">Thanh toán bằng tiền mặt (COD)</p>
            </label>
            <label id="payMethod_vnpay" className="payMethod-select">
              <input
                type="radio"
                className="payMethod-radio"
                checked={payMethod === "vnpay"}
                onChange={() => setPayMethod("vnpay")}
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
            <p className="total-text2">1.000.000.000đ</p>
          </div>
          <div className="orderPage_total-blk">
            <p className="total-text1">Tổng số tiền giảm giá:</p>
            <p className="total-text2 total-text3">-1.000.000.000đ</p>
          </div>
          <div className="orderPage_total-blk">
            <p className="total-text4">Tổng thanh toán:</p>
            <p className="total-text5">{formatMoney(subTotal)}</p>
          </div>
          <div className="orderPage_total-btn">
            <button id="total-btn">Đặt hàng</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;

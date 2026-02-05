import { FaRegTrashCan } from "react-icons/fa6";
import { MdNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../../css/user/cartProduct.css";
import CartEmpty from "../../imgs/cart-empty.png";
import VoucherImg from "../../imgs/voucher-icon.svg";
import { useCallback, useMemo, useState, useEffect } from "react";
import { 
  delteItemFromCartAction, 
  updateItemToCartAction 
} from "../../store/actions/cartAction";
import { formatMoney } from "../../component/FormatMoney/formatMoney";
import { selectCartItems } from "../../store/features/cart";
import { isTokenValid } from "../../util/jwt-helper";

const CartPage = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState({});
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString("vi-VN"),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date().toLocaleDateString("vi-VN"));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const navigate = useNavigate();

  // tạo key
  const getItemKey = (item) => `${item.id || item.productId}-${item.variant?.id}`;

  const onChangeQuantity = useCallback(
    (value, productId, variantId) => {
      dispatch(
        updateItemToCartAction({
          productId: productId, // Đảm bảo action này truyền đủ productId
          variant_id: variantId,
          quantity: value,
        }),
      );
    },
    [dispatch],
  );

  const onDeleteProduct = useCallback((productId, variantId) => {
    setModalIsOpen(true);
    setDeleteItem({
      productId: productId,
      variantId: variantId,
    });
  }, []);

  const onCloseModal = useCallback(() => {
    setDeleteItem({});
    setModalIsOpen(false);
  }, []);

  const onDeleteItem = useCallback((productId, variantId) => {
    dispatch(
      delteItemFromCartAction({ productId, variantId }) 
    );
    setModalIsOpen(false);
  }, [deleteItem, dispatch]);

  const subTotal = useMemo(()=>{
    let value = 0;
    cartItems?.forEach(element => {
       value += element?.subTotal 
    });
    return value?.toFixed(2);
  },[cartItems]);

  const isLoggedIn = useMemo(() => {
    return isTokenValid();
  }, []);
  console.log("isLoggedIn ", isLoggedIn, isTokenValid());

  // tích chọn tất cả
  const isSelectAll = cartItems.length > 0 && selectedItems.length === cartItems.length;
  
  const onSelectAll = (e) => {
    if (e.target.checked) {
      // FIX: Chọn tất cả thì lưu danh sách các key duy nhất
      setSelectedItems(cartItems.map(item => getItemKey(item)));
    } else {
      setSelectedItems([]);
    }
  };  

  // tích chọn từng sản phẩm
  const onSelectItem = (key) => {
    setSelectedItems(prev =>
      prev.includes(key)
        ? prev.filter(k => k !== key)
        : [...prev, key]
    );
  };

  // xóa theo lựa chọn hoặc xóa hết
  const onDeleteSelected = () => {
    if (selectedItems.length === 0) {
      return;
    }

    // nếu không chọn gì hoặc đã chọn tất cả
    if (isSelectAll) {
      cartItems.forEach(item => {
        dispatch(delteItemFromCartAction({
          productId: item.productId,
          variantId: item.variant.id
        }));
      });

      setSelectedItems([]);
      return;
    }

    // xóa theo lựa chọn
    selectedItems.forEach(key => {
      const item = cartItems.find(
        i => getItemKey(i) === key
      );

      if (!item) return;

      dispatch(delteItemFromCartAction({
        productId: item.productId,
        variantId: item.variant.id
      }));
    });

    setSelectedItems([]);
  };

  console.log("Cart items:", cartItems);


  return (
    <div id="cartPage">
      <div id="cart_content">
        <div id="cart_header">
          <div id="cart_title">
            <p id="cart_title-text">Giỏ hàng</p>
            <p id="cart_time">
              {currentDate}
            </p>
          </div>
          <div id="cart_description">
            <div id="cart_description1">
              <input 
                type="checkbox"
                id="cart_description1-check"
                onChange={onSelectAll}
                checked={
                  cartItems.length > 0 &&
                  selectedItems.length === cartItems.length
                }
              />
              <p className="cartPage_title-text1 cartPage_title-product">
                Sản phẩm
              </p>
            </div>
            <div id="cart_description2">
              <p className="cartPage_title-text2 cartPage-price">Đơn giá</p>
              <p className="cartPage_title-text2 cartPage-quatityProduct">
                Số lượng
              </p>
              <p className="cartPage_title-text2 cartPage-money">Thành tiền</p>
              <p className="cartPage_title-text2 cartPage-action">Thao tác</p>
            </div>
          </div>
        </div>
        <div id="cart_container">
          {
            !cartItems?.length &&  (
              <div className="cart_empty">
                <img src={CartEmpty} alt="Giỏ hàng trống" id="cart_empty-img" />
                <p id="cart_empty-text">Chưa có sản phẩm trong giỏ hàng của bạn!</p>
              </div>
            )
          }
          <ul id="cart_list">
            {
              cartItems?.map((item,index) => (
                <li id="cart_list-item" key={index}>
                  <div id="cart_list-item1">
                    <input 
                      type="checkbox" 
                      id="cart_list-check"
                      checked={selectedItems.includes(getItemKey(item))}
                      onChange={() => onSelectItem(getItemKey(item))}
                    />
                    <div id="cart_list-product">
                      <img
                        src={item?.image || CartEmpty}
                        alt="sản phẩm"
                        id="cart_list-img"
                      />
                      <div id="cart_list-text">
                        <p id="cart_list-title">
                          {item?.name || 'Name'}
                        </p>
                        <p id="cart_list-cate">
                          Loại hàng:
                        </p>
                      </div>
                    </div>
                  </div>
                  <div id="cart_list-item2">
                    <p id="cart_list-price" className="cart_product">
                      {formatMoney(item?.price)}
                    </p>
                    <div className="cart_list-quantity">
                      <button 
                        className="cart_list-btn1"
                        onClick={() =>
                          onChangeQuantity(
                            item.quantity > 1 ? item.quantity - 1 : 1,
                            item.productId,
                            item.variant?.id
                          )
                        }
                      >
                        -
                      </button>
                      <input 
                        type="number"
                        className="cart_list-input"
                        value={item.quantity}
                        onChange={(e) =>
                          onChangeQuantity(
                            Number(e.target.value),
                            item.productId,
                            item.variant?.id
                          )
                        }
                      />
                      <button 
                        className="cart_list-btn2"
                        onClick={() =>
                          onChangeQuantity(
                            item.quantity + 1,
                            item.productId,
                            item.variant?.id
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <p id="cart_list-money" className="cart_product">
                      {formatMoney(item.subTotal)}
                    </p>
                    <div 
                      id="cart_list-linkIcon"
                      className="cart_product"
                      onClick={() =>
                        onDeleteItem(item?.productId, item?.variant?.id)
                      }
                    >
                      <FaRegTrashCan className="cart_list-icon" />
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
      <div id="cart_payment">
        <div id="voucher">
          <div id="voucher_item1">
            <img src={VoucherImg} alt="icon voucher" id="voucher_item1-img" />
            <p id="voucher_item1-text">Mã khuyến mãi</p>
          </div>
          <div id="voucher_item2">
            <p id="voucher_item2-text">Chọn mã</p>
            <MdNavigateNext className="voucher_item2-icon" />
          </div>
        </div>
        {/* <hr id='cart_payment-line'/> */}
        <div id="amount">
          <div 
            id="amount1"
          >
            <p id="amount_count">
              Số sản phẩm: {cartItems.length}
            </p>
            <div 
              onClick={onDeleteSelected}
              className={`amount_remove ${
                selectedItems.length === 0 ? "donRemove" : ""
              }`}
            >
              <FaRegTrashCan className="amount_remove-icon" />
              <p id="amount_remove-text">
                {
                  selectedItems.length === 0
                    ? "Xóa hết"
                    : isSelectAll
                    ? "Xóa hết"
                    : "Xóa theo lựa chọn"
                }
              </p>
            </div>
          </div>
          <div id="amount2">
            <div id="amount_title1">
              <p id="amount_title1-text">
                Thành tiền:
              </p>
              <p id="amount_title1-money">
                {formatMoney(subTotal)}
              </p>
            </div>
            <div id="amount_title2">
              <p id="amount_title2-text">Tổng tiền (Bao gồm VAT):</p>
              <p id="amount_title2-money">
                {formatMoney(subTotal)}
              </p>
            </div>
            {
              isLoggedIn && (
                <button 
                  className="amount_btn" 
                  onClick={() => navigate('/thanh-toan')}
                >
                  Thanh toán
                </button>
              )
            }
            {
              !isLoggedIn && (
                <>
                  <button 
                    className="amount_btn amount-noClick"
                  >
                    Thanh toán
                  </button>
                  <p className="amount_notifi">
                    ❗️Vui lòng đăng nhập để thanh toán
                  </p>
                </>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

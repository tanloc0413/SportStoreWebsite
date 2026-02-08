import React, { useCallback, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiMinus, FiPlus } from "react-icons/fi";

import "../../css/user/addCart.css";
import { addItemToCartAction } from "../../store/actions/cartAction";
import { API_BASE_URL } from "../../api/constant";

const AddToCart = ({ product, selectedSize, selectedColor, onReset }) => {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  // tăng sản phẩm
  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  // giảm sản phẩm
  const decrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // thay đổi số lượng
  const onChangeQty = (e) => {
    let val = Number(e.target.value);
    if (val < 1) val = 1;
    setQuantity(val);
  };

  // thêm vào giỏ hàng
  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Bạn chưa chọn kích cỡ");
      return;
    }

    if (!selectedColor) {
      setError("Bạn chưa chọn màu sắc");
      return;
    }

    const variant = product?.variants?.find(
      (v) => v.size === selectedSize && v.color === selectedColor,
    );

    if (!variant || variant.quantity < quantity) {
      setError("Hết hàng");
      return;
    }

    setError("");

    dispatch(
      addItemToCartAction({
        productId: product?.id,
        name: product?.name,
        variant,
        quantity,
        subTotal: quantity * product?.price,
        price: product?.price,
        image:
          product?.productImage?.find((i) => i.isPrimary)?.url ||
          product?.productImage?.[0]?.url
        // image:
        //   API_BASE_URL +
        //   (
        //     product?.productImage?.find(i => i.isPrimary)?.url ||
        //     product?.productImage?.[0]?.url ||
        //     ""
        //   )
      }),
    );

    setQuantity(1);
    onReset && onReset();
  };

  // image:
  //         product?.productImage?.find(i => i.isPrimary)?.url ? API_BASE_URL + product.productImage.find(i => i.isPrimary).url
  //           : product?.productImage?.[0]?.url ? API_BASE_URL + product.productImage[0].url
  //             : null

  return (
    <>
      <div id="order_block">
        <div id="order_block-buy">
          <div id="order_addQuantity-text">
            <p id="order_addQuantity-title">Số lượng</p>
          </div>
          <div id="order_addQuantity">
            <div id="order_addQuantity-btn" onClick={decrease}>
              <FiMinus className="order_addQuantity-text order_addQuantity-text1" />
            </div>
            <input
              type="number"
              id="order_addQuantity-input"
              min={1}
              max={product?.quantity}
              onChange={onChangeQty}
              value={quantity}
            />
            <div id="order_addQuantity-btn" onClick={increase}>
              <FiPlus className="order_addQuantity-text order_addQuantity-text2" />
            </div>
          </div>
        </div>
        <div
          id="order_addToCart"
          onClick={handleAddToCart}
          //   onClick={addItemToCart}
        >
          <div className="addToCart">
            <IoCartOutline className="addToCart-icon" />
            <p className="addToCart-text">Thêm vào giỏ hàng</p>
          </div>
        </div>
        {error && (
          <div className="order_error">
            <p className="addToCart-error">{error}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default AddToCart;

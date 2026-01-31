import { FaRegTrashCan } from "react-icons/fa6";
import { MdNavigateNext } from "react-icons/md";

import '../../css/user/cartProduct.css';
import CartEmpty from '../../imgs/cart-empty.png';
import VoucherImg from '../../imgs/voucher-icon.svg';
import { Link } from "react-router-dom";

const CartPage = () => {

  return (
    <div id='cartPage'>
      <div id='cart_content'>
        <div id='cart_header'>
          <div id='cart_title'>
            <p id='cart_title-text'>
              Giỏ hàng
            </p>
            <p id='cart_time'>
              {new Date().toLocaleDateString('vi-VN')}
            </p>
          </div>
          <div id='cart_description'>
            <div id='cart_description1'>
              <input type="checkbox" id='cart_description1-check'/>
              <p className='cartPage_title-text1 cartPage_title-product'>
                Sản phẩm
              </p>
            </div>
            <div id='cart_description2'>
              <p className='cartPage_title-text2 cartPage-price'>
                Đơn giá
              </p>
              <p className='cartPage_title-text2 cartPage-quatityProduct'>
                Số lượng
              </p>
              <p className='cartPage_title-text2 cartPage-money'>
                Thành tiền
              </p>
              <p className='cartPage_title-text2 cartPage-action'>
                Thao tác
              </p>
            </div>
          </div>
          </div>
        <div id='cart_container'>
          <div className='cart_empty'>          
            <p id='cart_empty-text'>
              Chưa có sản phẩm trong giỏ hàng của bạn!
            </p>
            <img src={CartEmpty} alt="Giỏ hàng trống" id='cart_empty-img'/>
          </div>
          <ul id='cart_list'>
            <li id='cart_list-item'>
              <div id='cart_list-item1'>
                <input type="checkbox" id='cart_list-check'/>
                <div id='cart_list-product'>
                  <img 
                    src="https://supersports.com.vn/cdn/shop/files/1127890-RUM-1.jpg?v=1766113572&width=1000" 
                    alt="sản phẩm"
                    id='cart_list-img'
                  />
                  <div id='cart_list-text'>
                    <Link id='cart_list-title' to='#'>
                      Ehon - Mọt Sách Mogu - Giống Nhau Nhỉ!? (Từ 3 - 6 Tuổi) (Tái Bản)
                    </Link>
                    <p id='cart_list-cate'>
                      Loại hàng: 
                    </p>
                  </div>
                </div>
              </div>
              <div id='cart_list-item2'>
                <p id='cart_list-price' className='cart_product'>
                  130.000đ
                </p>
                <div className='cart_list-quantity'>
                  <button className='cart_list-btn1'>-</button>
                  <input 
                    type="text"
                    className='cart_list-input'
                  />
                  <button className='cart_list-btn2'>+</button>
                </div>
                <p id='cart_list-money' className='cart_product'>
                  1.120.000.000đ
                </p>
                <a href="#" id='cart_list-linkIcon' className='cart_product'>
                  <FaRegTrashCan className='cart_list-icon'/>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div id='cart_payment'>
        <div id='voucher'>
          <div id='voucher_item1'>
            <img 
              src={VoucherImg} 
              alt="icon voucher"
              id='voucher_item1-img'
            />
            <p id='voucher_item1-text'>
              Mã khuyến mãi
            </p>
          </div>
          <div id='voucher_item2'>
            <p id='voucher_item2-text'>Chọn mã</p>
            <MdNavigateNext className='voucher_item2-icon'/>
          </div>
        </div>
        {/* <hr id='cart_payment-line'/> */}
        <div id='amount'>
          <div id='amount1'>
            <p id='amount_count'>
              Số sản phẩm: 
            </p>
            <div id='amount_remove'>
              <FaRegTrashCan className='amount_remove-icon'/>
              <p id='amount_remove-text'>Xóa hết</p>
            </div>
          </div>
          <div id='amount2'>
            <div id='amount_title1'>
              <p id='amount_title1-text'>
                Thành tiền:
              </p>
              <p id='amount_title1-money'>
                0đ
              </p>
            </div>
            <div id='amount_title2'>
              <p id='amount_title2-text'>
                Tổng tiền (Bao gồm VAT):
              </p>
              <p id='amount_title2-money'>
                1.000.000.000đ
              </p>
            </div>
            <button id='amount_btn'>
              Thanh toán
            </button>
          </div>
        </div>

        </div>
    </div>
  )
}

export default CartPage;
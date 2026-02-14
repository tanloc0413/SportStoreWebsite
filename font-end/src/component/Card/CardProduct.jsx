import React from 'react';
import { MdFavoriteBorder } from 'react-icons/md';
import { 
    IoHeartDislikeOutline, 
    IoHeartOutline, 
    IoHeartSharp,
    IoCartOutline
} from 'react-icons/io5';
import { Link } from 'react-router-dom';

import '../../css/user/cardPropose.css';
import { formatMoney } from '../../component/FormatMoney/formatMoney'
import BGNImg from '../../imgs/bgn-product.png';
import { API_BASE_URL } from '../../api/constant';

const CardProduct = ({products}) => {
  // Lấy ảnh sản phẩm
  const imageUrl =
    products.productImage?.find(img => img.isPrimary)?.url ||
    products.productImage?.[0]?.url || BGNImg;

  // console.log("Image URL:", imageUrl);

  // Nếu imageUrl bắt đầu bằng /images, ghép với API_BASE_URL
  const fullImageUrl = imageUrl && imageUrl.startsWith('/images') 
    ? `${API_BASE_URL}${imageUrl}` 
    : imageUrl;

  return (
    <div id="item1">
      <div id="item1_image">
        <Link to={`/chi-tiet-san-pham/${products?.slug}`} id="item1_image-link">
          <img
            // src={imageUrl ? imageUrl : BGNImg}
            src={fullImageUrl ? fullImageUrl : BGNImg}
            alt={`Ảnh ${products?.name}`}
            className="item1_img"
          />
        </Link>
        <IoHeartOutline className='item1_image-icon'/>
        {/* <IoHeartSharp /> */}
      </div>
      <div id="item1_content">
        <Link to={`/chi-tiet-san-pham/${products?.slug}`} id="item1_content-link">
          <p className="item1_content-title">
            {products?.name}
          </p>
        </Link>
        <div id='item1_content-priceBrand'>
          <p id='item1_content-brand'>
            {products?.brand}
          </p>
          <p id='item1_content-price'>
            {formatMoney(products?.price)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CardProduct;
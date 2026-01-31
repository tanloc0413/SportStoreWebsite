import React from 'react';
import { MdFavoriteBorder } from 'react-icons/md';
import { 
    IoHeartDislikeOutline, 
    IoHeartOutline, 
    IoHeartSharp,
    IoCartOutline
} from 'react-icons/io5';
import { BsCartPlus } from 'react-icons/bs';
import { FaRegHeart } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

import '../../css/user/cardPropose.css';

const CardProduct = () => {
  return (
    <div id="item1">
      <div id="item1_image">
        <Link to={`#`} id="item1_image-link">
          <img
            // src={`${listImgBook[0].dataImage}`}
            // src={products.image}
            alt="Ảnh sản phẩm"
            className="item1_img"
          />
        </Link>
        <IoHeartOutline className='item1_image-icon'/>
        {/* <IoHeartSharp /> */}
      </div>
      <div id="item1_content">
        <a href={`#`} id="item1_content-link">
          <p className="item1_content-title">
            {/* {products.name} */}
          </p>
        </a>
        <div id='item1_content-priceBrand'>
          <p id='item1_content-brand'>
            {/* {products.brand} */}
          </p>
          <p id='item1_content-price'>
            {/* {products.price} */}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CardProduct;
import React from 'react';
import {
  Box

} from '@mui/material';

import NewProductImg from '../../imgs/flash_sale_background_image.jpg';
import '../../css/user/homePage.css';
import ListProductHome from './ListProductHome';


const HomePage = () => {

  
  return (
    <div id='homePage'>
      <div id='carouse-home'>
        {/* <CarouselHome/> */}
      </div>
      <div id='newProduct'>
        <div id='blk_newBook'>
          <div id='newBook_title'>
            <div id='newBook_title1'>
              <p id='newBook_title1-text'>
                Đồ Thể Thao Hot Nhất
              </p>
            </div>
            <div id='newBook_title2'>
              <a href='/san-pham' id='newBook_title2-link'>
                <p className='title2_link-text'>Xem tất cả</p>
                <i className="fa-solid fa-angle-right title2_link-icon"></i>
              </a>
            </div>
          </div>
        </div>
        <div id='newBook_block'>
          <div id='blk_listBook'>
            <div id='blk_listBook-card'>
              {
                // listProduct
                // .map((products) => (
                //   <CardProductHome
                //     key={products.productId}
                //     products={products} 
                //   />
                // )) 
              }
            </div>
            <div id='blk_listBook-seeMore'>
              <a href='/san-pham' id='btn_listBook-seeMore'>
                Xem thêm
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id='list-books'>
        <ListProductHome/>
      </div>
    </div>
  )
}

export default HomePage;
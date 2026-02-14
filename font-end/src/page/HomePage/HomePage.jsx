import React, { useEffect, useState } from 'react';
import {
  Box

} from '@mui/material';

import NewProductImg from '../../imgs/flash_sale_background_image.jpg';
import '../../css/user/homePage.css';
import ListProductHome from './ListProductHome';
import { getAllProducts } from '../../api/fetchProducts';
import CardProduct from '../../component/Card/CardProduct';

const HomePage = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    getAllProducts()
    .then(res => {
      if (!res || res.length === 0) return;

      // shuffle
      const shuffled = [...res].sort(() => Math.random() - 0.5);

      // lấy đúng 30 sản phẩm
      const random30 = shuffled.slice(0, 28);

      setProductData(random30);
      // console.log("Product data", random30.);
    })
    .catch(err => {
      console.error("Lỗi khi lấy sản phẩm: ", err);
    });
  }, []);


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
                productData.slice(0,6)
                .map((products) => (
                  <CardProduct
                    products={products}
                  />
                )) 
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
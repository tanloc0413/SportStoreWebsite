import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import '../../css/user/listProductHome.css';

const ListProductHome = () => {
  return (
    <>
      <div id='product1'>
        <p id='product1_title'>
          Đồ thể thao đề xuất
        </p>
        <div id='product1_items'>
          {/* {
            productData
            .slice(0, 24).map((products) => (
              <CardTest
                key={products.id}
                products={products}
              />
            ))
          } */}
        </div>
      </div>
      <div id='product2'>
        <div id='product2_name'>
          <p id='product2_title'>
            Đồ Thể Thao
          </p>
          <a id='product2_link' href='/san-pham'>
            Xem thêm <span id="product2_arrow"> &gt;</span>
          </a>
        </div>
        <div id='product2_items'>
          {/* {
            productData
            .slice(0, 40).map((products) => (
              <CardTest
                key={products.id}
                products={products}
              />
            ))
          } */}
        </div>
      </div>
    </>
  )
}

export default ListProductHome;
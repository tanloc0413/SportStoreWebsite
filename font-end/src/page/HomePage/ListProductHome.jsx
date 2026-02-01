import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import '../../css/user/listProductHome.css';
import { getAllProducts } from '../../api/fetchProducts';
import CardProduct from '../../component/Card/CardProduct';

const ListProductHome = () => {
  const [productData, setProductData] = useState([]);
  

  useEffect(() => {
    getAllProducts()
    .then(res => {
      if (!res || res.length === 0) return;

      // shuffle
      const shuffled = [...res].sort(() => Math.random() - 0.5);

      // lấy đúng 30 sản phẩm
      const random30 = shuffled.slice(0, 30);

      setProductData(random30);
      console.log("Product data", random30);
    })
    .catch(err => {
      console.error("Lỗi khi lấy sản phẩm: ", err);
    });
  }, []);

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
          {
            productData
            .map((products) => (
              <CardProduct
                key={products.id}
                products={products}
              />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default ListProductHome;
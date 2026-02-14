import React, { useEffect, useState } from 'react';

import '../../css/user/listProductHome.css';
import { getAllProducts } from '../../api/fetchProducts';
import CardProduct from '../../component/Card/CardProduct';
import { getCollaborativeRecommendations } from '../../api/recommendation';


const ListProductHome = () => {
  const [productData, setProductData] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
    .then(res => {
      if (!res || res.length === 0) return;

      // shuffle
      const shuffled = [...res].sort(() => Math.random() - 0.5);

      // lấy đúng 30 sản phẩm
      const random30 = shuffled.slice(0, 30);

      setProductData(random30);
      // console.log("Product data", random30.);
    })
    .catch(err => {
      console.error("Lỗi khi lấy sản phẩm: ", err);
    });
  }, []);

  
  // Lấy gợi ý Collaborative Filtering
  useEffect(() => {
    getCollaborativeRecommendations(6)
      .then(res => {
        if (res && res.length > 0) {
          // Chuyển đổi format từ recommendation DTO sang format card
          const mapped = res.map(item => ({
            id: item.productId,
            name: item.productName,
            price: item.price,
            slug: item.slug,
            productImage: item.imageUrl ? [{ url: item.imageUrl, isPrimary: true }] : [],
            _reason: item.reason,
            _score: item.recommendationScore
          }));
          setRecommendedProducts(mapped);
        }
      })
      .catch(err => console.error("Lỗi khi lấy gợi ý:", err));
    }, []);

  return (
    <>
      <div id='product1'>
        <p id='product1_title'>
          Đồ thể thao đề xuất
        </p>
        <div id='product1_items'>
          {
            (recommendedProducts.length > 0 ? recommendedProducts : productData.slice(0,6))
            .map((products) => (
              <CardProduct
                key={products?.id}
                products={products}
              />
            ))
          }
        </div>
      </div>
      <div id='product2'>
        <div id='product2_name'>
          <p id='product2_title'>
            Đồ Thể Thao
          </p>
          <a id='product2_link' href='/the-loai/nam'>
            Xem thêm <span id="product2_arrow"> &gt;</span>
          </a>
        </div>
        <div id='product2_items'>
          {
            productData
            .map((products) => (
              <CardProduct
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
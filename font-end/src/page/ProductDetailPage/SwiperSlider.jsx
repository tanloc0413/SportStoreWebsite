import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Keyboard } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import "../../css/user/productDetail.css";

const SwiperSlider = ({product}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
    
  // Get images from productImage array
  const images = product?.productImage?.map(img => img?.url)?.filter(Boolean) || [];

  // If no images, show placeholder
  if (!images || images.length === 0) {
    return (
      <div className='blk1_img-big'>
        <div style={{
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
          minHeight: '450px'
        }}>
          Không có hình ảnh
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='blk1_img-big'>
          <Swiper
            style={{
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-color': '#fff',
            }}
            loop={images.length > 1}
            spaceBetween={10}
            navigation={images.length > 1}
            thumbs={{ swiper: thumbsSwiper && images.length > 1 ? thumbsSwiper : null }}
            modules={[FreeMode, Navigation, Thumbs, Keyboard]}
            className="mySwiper2 mySwiper2_blk"
            keyboard={{
              enabled: true,
              onlyInViewport: true,
            }}
          >
            {
              images.map((item, index) => (
                <SwiperSlide key={index} className='mySwiper2_item-big'>
                  <img 
                    src={item}
                    alt={`${product?.name || 'Product'} ${index + 1}`}
                    className='mySwiper2-img'
                  />
                </SwiperSlide>
              ))
            }
          </Swiper>
      </div>
      {
        images.length > 1 && (
          <div className='blk1_img-small'>
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={false}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs, Keyboard]}
              className="mySwiper"
            >
              {
                images.map((item, index) => (
                  <SwiperSlide key={index} className='mySwiper2_item-small'>
                    <img 
                      src={item} 
                      alt={`${product?.name || 'Product'} ${index + 1}`}
                      className='mySwiper2-img'
                      style={{cursor: 'pointer'}}
                    />
                  </SwiperSlide>
                ))
              }
            </Swiper>
          </div>
        )
      }
    </>
  );
}

export default SwiperSlider;
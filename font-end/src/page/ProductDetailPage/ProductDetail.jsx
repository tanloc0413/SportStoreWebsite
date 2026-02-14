import React, { useCallback, useEffect, useMemo, useState } from "react";
import _ from 'lodash';
import Link from "@mui/material/Link";
import Rating from "@mui/material/Rating";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

import "../../css/user/productDetail.css";
import SwiperSlider from "./SwiperSlider";
import AddToCart from './AddToCart';
import { formatMoney } from "../../component/FormatMoney/formatMoney";
import SizeFilter from '../../component/Filter/SizeFilter';
import ColorFilter from '../../component/Filter/ColorFilter';
import { useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductByCategory } from "../../api/fetchProducts";

const ProductDetail = () => {
  // state get value product
  const {product} = useLoaderData();

  // loading
  const dispatch = useDispatch();

  // chọn kích cỡ
  const [selectedSize,setSelectedSize] = useState('');

  // lấy hình ảnh
  const [image,setImage] = useState();

  // báo lỗi
  const [error,setError] = useState('');

  // cart items
  const cartItems = useSelector((state) => state.cartState?.cart);

  //
  const [selectedColor, setSelectedColor] = useState('');

  const categories = useSelector((state)=> state?.categoryState?.categories);

  // const productCategory = useMemo(() => {
  //   return categories?.find((category) => category?.id === product?.categoryId);
  // }, [product, categories]);

  const productCategory = useMemo(() => {
    if (!Array.isArray(categories)) return null;
    
    return categories.find(
      (category) => category?.id === product?.categoryId
    );
  }, [product, categories]);


  useEffect(() => {
    getAllProductByCategory(product?.categoryId,product?.categoryTypeId)
    .then(res => {
      const excludedProduct = res?.filter((item)=> item?.id !== product?.id);
      // setSimilarProducts(excludedProduct);
    })
    .catch(() => [
    ])
  },[product?.categoryId, product?.categoryTypeId, product?.id]);

  useEffect(() => {
    setImage(product?.thumbnail);
    // setBreadCrumbLink([]);
    const arrayLinks = [{ title: 'Shop', path: '/' }, {
      title: productCategory?.name,
      path: productCategory?.name
    }];
    const productType = productCategory?.categoryTypes?.find((item)=> item?.id === product?.categoryTypeId);
    
    if(productType) {
      arrayLinks?.push({
        title: productType?.name,
        path: productType?.name
      })
    }
    // setBreadCrumbLink(arrayLinks);
  }, [productCategory, product]);

  useEffect(()=>{
    if(selectedSize){
      setError('');
    }
  },[selectedSize]);

  // chọn kích cỡ
  const sizes = useMemo(() => {
    const sizeSet = _.uniq(_.map(product?.variants, 'size'));
    return sizeSet
  }, [product]);

  // chọn màu sắc
  const colors = useMemo(() => {
    const colorSet = _.uniq(_.map(product?.variants, 'color'));
    return colorSet
  }, [product]);



  return (
    <div id="productDetail">
      <div id="productDetail_blk0">
        <Breadcrumbs aria-label="breadcrumb" className="blk0">
          <Link
            href="/"
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            className="blk0_home-text blk0-text"
          >
            Trang Chủ
          </Link>
          <Typography
            sx={{
              color: "text.primary",
              display: "flex",
              alignItems: "center",
            }}
            className="blk0_product-text blk0-text"
          >
            Chi Tiết Sản Phẩm
          </Typography>
          <Typography
            sx={{
              color: "text.primary",
              display: "flex",
              alignItems: "center",
            }}
            className="blk0_product-text blk0-text"
          >
            {product?.name}
          </Typography>
        </Breadcrumbs>
      </div>
      <div id="productDetail_blk1">
        <div id="productDetail_blk1-img">
          <SwiperSlider 
            product={product}
          />
        </div>
        <div id="productDetail_blk1-info">
          <p className="blk1_title-big">
            {product?.name}
          </p>
          <div className='blk1_evalute'>
            <Rating
              name="half-rating-read"
              value={product?.rating || 0}
              precision={0.25}
              readOnly
              className="blk1_evalute-icon"
            />
          </div>
          <div className='blk1_price'>
            <p className='blk1_price-text'>
              {formatMoney(product?.price)}
            </p>
          </div>
          {sizes?.length > 0 && (
            <div className='blk1_size'>
              <p className="blk1_size-title">
                Kích cỡ
              </p>
              <div className="blk1_sizeList">
                <SizeFilter 
                  sizes={sizes} 
                  // selectedSize={selectedSize}
                  onChange={(val) => setSelectedSize(val?.[0])}
                />
              </div>
            </div>
          )}
          {colors?.length > 0 && (
            <div className='blk1_color'>
              <p className="blk1_color-title">
                Màu sắc
              </p>
              <div className="blk1_colorList">
                <ColorFilter 
                  colors={colors}
                  // selectedColor={selectedColor}
                  // onColorChange={setSelectedColor}
                  onChange={(val) => setSelectedColor(val)}
                />
              </div>
            </div>
          )}
          <div className="blk1_addCart">
            <AddToCart 
              product={product}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              onReset={() => {
                setSelectedSize('');
                setSelectedColor('');
              }}
            />
          </div>
        </div>
      </div>
      <div id="productDetail_blk2">
        <p className="productDetail_blk2-title">
          Mô tả:
        </p>
        <div className='productDetail_blk2-content'>
          <p className="blk2_content-text">
            {product?.description}
          </p>
        </div>
      </div>
      {/* <div id="productDetail_blk3">
        <p className="productDetail_blk3-title">
          Bình luận:
        </p>
      </div> */}
    </div>
  );
};

export default ProductDetail;
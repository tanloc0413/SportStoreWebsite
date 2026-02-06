import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import { Checkbox } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { MdFilterAlt } from "react-icons/md";

import "../../css/user/listProduct.css";
import FilterProduct from "../../component/Filter/FilterProduct";
import CardProduct from "../../component/Card/CardProduct";
import PaginationPage from "./PaginationPage";
import content from "../../data/content.json";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductByCategory, getAllProducts } from "../../api/fetchProducts";
import { setLoading } from "../../store/features/common";

const ProductListPage = ({ categoryType }) => {
    const categories = content?.categories;
    const [product, setProduct] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const params = useParams();
    const [searchParams] = useSearchParams();
    
    // Use params.category if available, otherwise use prop
    const effectiveCategoryType = params?.category || categoryType;
    const searchQuery = searchParams.get('search');

    const dispatch = useDispatch();
    const categoryData = useSelector((state) => state?.categoryState?.categories);

    // lọc theo thể loại
    const categoryContent = useMemo(() => {
        return categories?.find((category) => category.code === effectiveCategoryType);
    }, [effectiveCategoryType]);

    // const productListItems = useMemo(()=>{
    //     return content?.products?.filter((product) => product?.category_id === categoryContent?.id );
    // }, [categoryContent]);

    const category = useMemo(() => {
        return categoryData?.find(element => element?.code === effectiveCategoryType);
    }, [categoryData, effectiveCategoryType])

    // Filter products by search query
    const filteredProducts = useMemo(() => {
        if (!searchQuery) return product;
        return allProducts.filter(item => 
            item?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item?.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [product, allProducts, searchQuery]);

    // lấy tất cả sản phẩm
    useEffect(() => {
        dispatch(setLoading(true));
        
        if (searchQuery) {
            // If searching, get all products
            getAllProducts()
                .then(res => {
                    setAllProducts(res || []);
                    setProduct(res || []);
                    console.log("All products for search: ", res);
                })
                .finally(() => {
                    dispatch(setLoading(false));
                });
        } else if (category?.id) {
            // If browsing by category
            getAllProductByCategory(category.id)
                .then(res => {
                    setProduct(res || []);
                    console.log("Product List Page - products by category: ", res);
                })
                .finally(() => {
                    dispatch(setLoading(false));
                });
        } else {
            // Default: get all products if no category
            getAllProducts()
                .then(res => {
                    setProduct(res || []);
                    console.log("Product List Page - all products: ", res);
                })
                .finally(() => {
                    dispatch(setLoading(false));
                });
        }
    }, [category?.id, searchQuery, dispatch]);

    return (
        <div id="productPage">
            <div id="listProduct">
                <div id="listProduct_header">
                    <div id="listProduct_header-nav">
                        <Link className="listProduct_title" to="/">
                            Trang chủ
                        </Link>
                        <span className="raquo"> &raquo; </span>
                        <p className="listProduct_title listProduct_text-none">
                            Sản phẩm
                        </p>
                        <span className="raquo"> &raquo; </span>
                        <a
                            className="listProduct_title listProduct_title-link"
                            href={`${categoryContent?.path || '#'}`}
                        >
                            {searchQuery ? `Kết quả tìm kiếm: "${searchQuery}"` : (categoryContent?.name || 'Tất cả sản phẩm')}
                        </a>
                    </div>
                    <div>

                    </div>
                </div>
                <div id="listProduct_content">
                    <div id="listProduct_category">
                        <FilterProduct
                            types={categoryContent?.types}
                            metaData={categoryContent?.meta_data}
                            // onApplyFilter={setFilters}
                        />
                    </div>
                    <div id="listProduct_items">
                        <div className="listProductGrid">
                            {(searchQuery ? filteredProducts : product)?.map((item,index)=>(
                                <CardProduct
                                    key={item?.id+"_"+index} 
                                    {...item}
                                    title={item?.name}
                                />
                            ))}
                            {(searchQuery ? filteredProducts : product)?.length === 0 && (
                                <div className="no-products">
                                    <p>Không tìm thấy sản phẩm nào.</p>
                                </div>
                            )}
                        </div>
                        <div className="paginationDiv">
                            <PaginationPage/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListPage;

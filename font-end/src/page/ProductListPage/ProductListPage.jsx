import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import { getAllProducts } from "../../api/fetchProducts";
import { setLoading } from "../../store/features/common";

const ProductListPage = ({ categoryType }) => {
    const categories = content?.categories;
    const [product,setProduct] = useState([]);

    const dispatch = useDispatch();
    const categoryData = useSelector((state) => state?.categoryState?.categories);

    // lọc theo thể loại
    const categoryContent = useMemo(() => {
        return categories?.find((category) => category.code === categoryType);
    }, [categoryType]);

    // const productListItems = useMemo(()=>{
    //     return content?.products?.filter((product) => product?.category_id === categoryContent?.id );
    // }, [categoryContent]);

    const category = useMemo(() => {
        return categoryData?.find(element => element?.code === categoryType);
    }, [categoryData, categoryType])

    // lấy tất cả sản phẩm
    useEffect(() => {      
        dispatch(setLoading(true));
        getAllProducts(category?.id)
        .then(res => {
            setProduct(res);
            console.log("Product: ", res);
        })
        .catch(err => {
            console.log("Product: ", err);
        })
        .finally(() => {
            dispatch(setLoading(false));
        })
    }, [category?.id, dispatch]);

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
                            href={`${categoryContent.path}`}
                        >
                            {categoryContent.name}
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
                            {product?.map((item,index)=>(
                                <CardProduct
                                    key={item?.id+"_"+index} 
                                    {...item}
                                    title={item?.name}
                                />
                            ))}
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

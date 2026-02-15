import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import _ from 'lodash';
import CircularProgress from '@mui/material/CircularProgress';


import "../../css/user/listProduct.css";
import FilterProduct from "../../component/Filter/FilterProduct";
import CardProduct from "../../component/Card/CardProduct";
import PaginationPage from "./PaginationPage"; // Import component phân trang
import content from "../../data/content.json";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductByCategory } from "../../api/fetchProducts";
import { setLoading } from "../../store/features/common";
import { getCollaborativeRecommendations } from "../../api/recommendation";

const ProductListPage = ({ categoryType }) => {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [recommendedProducts, setRecommendedProducts] = useState([]);

    // Phân trang
    // const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 25;

    const dispatch = useDispatch();
    const categoryData = useSelector((state) => state?.categoryState?.categories);

    const category = useMemo(() => {
        return categoryData?.find(element => element?.code === categoryType);
    }, [categoryData, categoryType]);

    const categoryContent = useMemo(() => {
        return content?.categories?.find((cat) => cat.code === categoryType);
    }, [categoryType]);

    // useEffect(() => {
    //     if (!category?.id) return;
        
    //     dispatch(setLoading(true));
    //     // Reset về trang 1 khi đổi danh mục
    //     setCurrentPage(1); 

    //     getAllProductByCategory(category.id)
    //         .then(res => {
    //             if (Array.isArray(res)) {
    //                 setProducts(res);
    //             } else {
    //                 setProducts([]); 
    //             }
    //         })
    //         .catch(err => {
    //             console.error("Lỗi lấy sản phẩm:", err);
    //             setProducts([]);
    //         })
    //         .finally(() => {
    //             dispatch(setLoading(false));
    //         });

    // }, [category?.id, dispatch]);

    // Lấy dữ liệu sản phẩm từ API
    useEffect(() => {
        if (!category?.id) return;
        
        dispatch(setLoading(true));
        setCurrentPage(1); 

        getAllProductByCategory(category.id)
            .then(res => {
                // if (Array.isArray(res)) {
                //     setAllProducts(res);
                //     setFilteredProducts(res);
                // } else {
                //     setAllProducts([]); 
                //     setFilteredProducts([]);
                // }
                setAllProducts(res);
                setFilteredProducts(res);
            })
            .catch(err => console.error("Lỗi lấy sản phẩm:", err))
            .finally(() => dispatch(setLoading(false)));

    }, [category?.id, dispatch]);

    // Lấy gợi ý CF cho trang danh mục
    useEffect(() => {
        getCollaborativeRecommendations(6)
            .then(res => {
                if (res && res.length > 0) {
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
            .catch(err => console.error("Lỗi gợi ý:", err));
    }, []);

    // Trích xuất danh sách Size và Color từ tất cả sản phẩm để truyền cho bộ lọc
    const metaData = useMemo(() => {
        const allVariants = allProducts.flatMap(p => p.variants || []);
        const colors = _.uniq(allVariants.map(v => v.color).filter(Boolean));
        const sizes = _.uniq(allVariants.map(v => v.size).filter(Boolean));
        return { colors, sizes };
    }, [allProducts]);

    // --- LOGIC XỬ LÝ LỌC SẢN PHẨM Ở FRONTEND ---
    const handleApplyFilter = (filters) => {
        const { types, prices, colors, sizes } = filters;
        
        let result = allProducts;

        // Lọc theo thể loại
        if (types.length > 0) {
            result = result.filter(p => types.includes(p.categoryTypeId));
        }

        // Lọc theo giá (Lọc OR trong các khung giá)
        if (prices.length > 0) {
            result = result.filter(p => {
                const pPrice = Number(p.price || 0);
                if (prices.includes('P1') && pPrice <= 500000) return true;
                if (prices.includes('P2') && pPrice <= 1500000) return true;
                if (prices.includes('P3') && pPrice <= 2500000) return true;
                if (prices.includes('P4') && pPrice > 2500000) return true;
                return false;
            });
        }

        // Lọc theo màu sắc (Sản phẩm có CHỨA biến thể màu được chọn)
        if (colors.length > 0) {
            result = result.filter(p => 
                p.variants?.some(v => colors.includes(v.color))
            );
        }

        // Lọc theo kích cỡ (Sản phẩm có CHỨA biến thể size được chọn)
        if (sizes.length > 0) {
            result = result.filter(p => 
                p.variants?.some(v => sizes.includes(v.size))
            );
        }

        setFilteredProducts(result);
        setCurrentPage(1); // Reset về trang 1 sau khi lọc
    };

    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
    
    // const totalPages = Math.ceil(products.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentProducts = filteredProducts.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };



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
                            Thể loại sản phẩm
                        </p>
                        <span className="raquo"> &raquo; </span>
                        <Link
                            className="listProduct_title listProduct_title-link"
                            to={`/the-loai/${categoryType}`}
                        >
                            {category?.name || categoryContent?.name || "Danh mục"}
                        </Link>
                    </div>
                </div>
                <div id="listProduct_content">
                    <div id="listProduct_category">
                        <FilterProduct
                            types={category?.categoryTypes || []}
                            metaData={metaData}
                            onApplyFilter={handleApplyFilter}
                        />
                    </div>
                    <div id="listProduct_items">
                        <div className="listProductGrid">
                            {currentProducts?.length > 0 ? (
                                currentProducts.map((item, index) => (
                                    <CardProduct
                                        key={item?.id || index} 
                                        products={item} 
                                    />
                                ))
                            ) : (
                                <div className="listProductError">
                                    <svg width={0} height={0}>
                                        <defs>
                                            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor="#e01cd5" />
                                                <stop offset="100%" stopColor="#1CB5E0" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
                                </div>
                            )}
                        </div>
                        {/* 4. Truyền Props vào PaginationPage */}
                        <div className="paginationDiv">
                            <PaginationPage 
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListPage;
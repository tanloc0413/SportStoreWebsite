import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/user/listProduct.css";
import FilterProduct from "../../component/Filter/FilterProduct";
import CardProduct from "../../component/Card/CardProduct";
import PaginationPage from "./PaginationPage"; // Import component phân trang
import content from "../../data/content.json";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductByCategory } from "../../api/fetchProducts";
import { setLoading } from "../../store/features/common";

const ProductListPage = ({ categoryType }) => {
    // 1. Khai báo State và biến cho phân trang
    const [products, setProducts] = useState([]); // Chứa TẤT CẢ sản phẩm lấy về
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 25; // Yêu cầu: 25 card mỗi trang

    const dispatch = useDispatch();
    const categoryData = useSelector((state) => state?.categoryState?.categories);

    const category = useMemo(() => {
        return categoryData?.find(element => element?.code === categoryType);
    }, [categoryData, categoryType]);

    const categoryContent = useMemo(() => {
        return content?.categories?.find((cat) => cat.code === categoryType);
    }, [categoryType]);

    useEffect(() => {
        if (!category?.id) return;
        
        dispatch(setLoading(true));
        // Reset về trang 1 khi đổi danh mục
        setCurrentPage(1); 

        getAllProductByCategory(category.id)
            .then(res => {
                if (Array.isArray(res)) {
                    setProducts(res);
                } else {
                    setProducts([]); 
                }
            })
            .catch(err => {
                console.error("Lỗi lấy sản phẩm:", err);
                setProducts([]);
            })
            .finally(() => {
                dispatch(setLoading(false));
            });

    }, [category?.id, dispatch]);

    // 2. Logic tính toán sản phẩm cho trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
    
    // Tính tổng số trang
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Hàm xử lý khi user bấm chuyển trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Tùy chọn: Cuộn lên đầu trang khi bấm chuyển
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
                            Sản phẩm
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
                        />
                    </div>
                    <div id="listProduct_items">
                        <div className="listProductGrid">
                            {/* 3. Render currentProducts thay vì products gốc */}
                            {currentProducts?.length > 0 ? (
                                currentProducts.map((item, index) => (
                                    <CardProduct
                                        key={item?.id || index} 
                                        products={item} 
                                    />
                                ))
                            ) : (
                                <p>Không tìm thấy sản phẩm nào trong danh mục này.</p>
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
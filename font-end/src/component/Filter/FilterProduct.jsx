import React from 'react';
import { LuFilter } from "react-icons/lu";

import '../../css/user/filterProduct.css';
import ColorFilter from './ColorFilter';
import SizeFilter from './SizeFilter';

const FilterProduct = ({types, metaData}) => {

    return (
        <>
            <div className='filter_title1'>
                <p className='filter_title-text1'>
                    Lọc
                </p>
                <LuFilter className='filter_title-icon'/>
            </div>
            <hr className='filter-line'/>
            <div className='filter_title2'>
                <p className='filter_title-text2'>
                    Loại đồ thể thao
                </p>
                <div className='filter_content'>
                    {
                        types?.map((type, index) => (
                            <div key={type?.code || type?.id || index} className='filter_contentDiv'>
                                <input
                                    type='checkbox'
                                    id={type?.code}
                                    name={type?.code}
                                    className='filter_content-input'
                                />
                                <label 
                                    htmlFor={type?.code}
                                    className='filter_content-label'
                                >
                                    {type.name}
                                </label>
                            </div>
                        ))
                    }
                </div>
            </div>
            <hr />
            <div className='filter_title3'>
                <p className='filter_title-text2'>
                    Giá cả
                </p>
                <div id='listProduct_filter1-btnGroup1'>
                    <button className='listProduct_filter1-btn1'>
                        &le;500.000đ
                    </button>
                    <button className='listProduct_filter1-btn2'>
                        &le;1.500.000đ
                    </button>
                    <button className='listProduct_filter1-btn3'>
                        &le;2.500.000đ
                    </button>
                    <button className='listProduct_filter1-btn3'>
                        &gt;2.500.000đ
                    </button>
                </div>
            </div>
            <hr />
            <div className='filter_title3'>
                <p className='filter_title-text2'>
                    Màu sắc
                </p>
                <ColorFilter
                    colors={metaData?.colors}
                />
            </div>
            <hr />
            <div className='filter_title4'>
                <p className='filter_title-text2'>
                    Kích cỡ
                </p>
                <SizeFilter
                    sizes={metaData?.sizes}
                />
            </div>
            <div className='filter_grBtn'>
                <button className='filter_grBtn-btn1 filter-btnDiv'>
                    Đặt lại
                </button>
                <button className='filter_grBtn-btn2 filter-btnDiv'>
                    Lọc sản phẩm
                </button>
            </div>
        </>
    )
}

export default FilterProduct;
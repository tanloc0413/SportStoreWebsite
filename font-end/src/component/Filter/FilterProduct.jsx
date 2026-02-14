import { useState } from 'react';
import { LuFilter } from "react-icons/lu";

import '../../css/user/filterProduct.css';
import ColorFilter from './ColorFilter';
import SizeFilter from './SizeFilter';

const FilterProduct = ({types, metaData, onApplyFilter}) => {
    // Trạng thái tạm thời của các bộ lọc
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);

    // Xử lý chọn loại
    const handleTypeToggle = (typeId) => {
        setSelectedTypes(prev => 
            prev.includes(typeId) ? prev.filter(id => id !== typeId) : [...prev, typeId]
        );
    };

    // Xử lý chọn giá
    const handlePriceToggle = (priceLevel) => {
        setSelectedPrices(prev => 
            prev.includes(priceLevel) ? prev.filter(p => p !== priceLevel) : [...prev, priceLevel]
        );
    };

    // Reset bộ lọc
    const handleReset = () => {
        setSelectedTypes([]);
        setSelectedPrices([]);
        setSelectedColors([]);
        setSelectedSizes([]);
        onApplyFilter({ types: [], prices: [], colors: [], sizes: [] });
    };

    // Áp dụng bộ lọc
    const handleApply = () => {
        onApplyFilter({
            types: selectedTypes,
            prices: selectedPrices,
            colors: selectedColors,
            sizes: selectedSizes
        });
    };

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
                        types?.map(type => (
                            <div className='filter_contentDiv'>
                                <input
                                    type='checkbox'
                                    name={type?.code}
                                    className='filter_content-input'
                                    checked={selectedTypes.includes(type?.id)}
                                    onChange={() => handleTypeToggle(type?.id)}
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
                    <button 
                        // className='listProduct_filter1-btn1'
                        className={`listProduct_filter1-btn1 ${selectedPrices.includes('P1') ? 'active-price' : ''}`}
                        onClick={() => handlePriceToggle('P1')}
                        style={{ border: selectedPrices.includes('P1') ? '2px solid red' : '' }}
                    >
                        &le;500.000đ
                    </button>
                    <button 
                        // className='listProduct_filter1-btn2'
                        className={`listProduct_filter1-btn2 ${selectedPrices.includes('P2') ? 'active-price' : ''}`}
                        onClick={() => handlePriceToggle('P2')}
                        style={{ border: selectedPrices.includes('P2') ? '2px solid red' : '' }}
                    >
                        &le;1.500.000đ
                    </button>
                    <button 
                        // className='listProduct_filter1-btn3'
                        className={`listProduct_filter1-btn3 ${selectedPrices.includes('P3') ? 'active-price' : ''}`}
                        onClick={() => handlePriceToggle('P3')}
                        style={{ border: selectedPrices.includes('P3') ? '2px solid red' : '' }}
                    >
                        &le;2.500.000đ
                    </button>
                    <button 
                        // className='listProduct_filter1-btn3'
                        className={`listProduct_filter1-btn3 ${selectedPrices.includes('P4') ? 'active-price' : ''}`}
                        onClick={() => handlePriceToggle('P4')}
                        style={{ border: selectedPrices.includes('P4') ? '2px solid red' : '' }}
                    >
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
                    selectedColors={selectedColors}
                    onChange={setSelectedColors}
                />
            </div>
            <hr />
            <div className='filter_title4'>
                <p className='filter_title-text2'>
                    Kích cỡ
                </p>
                <SizeFilter
                    sizes={metaData?.sizes}
                    selectedSizes={selectedSizes}
                    onChange={setSelectedSizes}
                />
            </div>
            <div className='filter_grBtn'>
                <button 
                    className='filter_grBtn-btn1 filter-btnDiv'
                    onClick={handleReset}
                >
                    Đặt lại
                </button>
                <button 
                    className='filter_grBtn-btn2 filter-btnDiv'
                    onClick={handleApply}
                >
                    Lọc sản phẩm
                </button>
            </div>
        </>
    )
}

export default FilterProduct;
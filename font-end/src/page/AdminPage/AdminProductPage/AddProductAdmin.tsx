// import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Select from 'react-select';

import '../../../css/admin/adminAddProduct.css';

const AddProductAdmin: React.FC  = () => {
    

    return (
        <>
            <div className="add-product-page">
                {/* Header */}
                <div className="add-product-header">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                            Admin
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/material-ui/getting-started/installation/"
                        >
                            Sản phẩm
                        </Link>
                        <Typography sx={{ color: 'text.primary' }}>
                            Thêm sản phẩm
                        </Typography>
                    </Breadcrumbs>
                    <p className='addProduct-title'>
                        Thêm sản phẩm
                    </p>
                    <p className="sub-text">
                        Thêm một sản phẩm mới vào cửa hàng của bạn
                    </p>
                </div>
                <div className="addProduct-content">
                    <div className="left-col">
                        <div className="addProduct_card">
                            <p className="addProduct_card-title">
                                Tên và mô tả
                            </p>
                            <label className='addProduct_label-text addProduct-name'>
                                Tên sản phẩm
                            </label>
                            <input
                                type="text"
                                placeholder="Nhập tên sản phẩm"
                                className='addProduct-input'
                            />
                            <label className='addProduct_label-text'>
                                Mô tả sản phẩm
                            </label>
                            <textarea
                                rows={15}
                                placeholder="Viết mô tả"
                                className='addProduct-textarea'
                            />
                        </div>
                        <div className="addProduct_card">
                            <p className="addProduct_card-title">
                                Thể loại
                            </p>
                            <label className='addProduct_label-text'>
                                Thể loại sản phẩm
                            </label>
                            <Select
                                isMulti
                                name="category"
                                // options={}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder='Chọn thể loại'
                                noOptionsMessage={() => ""}
                            />
                            {/* <label className='addProduct_label-text'>
                                Thể loại
                            </label>
                            <Select
                                isMulti
                                name="colors"
                                // options={}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder='Chọn thể loại'
                                noOptionsMessage={() => ""}
                            /> */}
                        </div>
                    </div>
                    <div className="right-col">
                    <div className="addProduct_card">
                        <p className='addProduct_card-title'>
                            Chi tiết sản phẩm
                        </p>
                        <div className="row-2">
                            <div>
                                <label className='addProduct_label-text'>
                                    Thương hiệu
                                </label>
                                <Select
                                    isMulti
                                    name="colors"
                                    // options={}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    placeholder='Thương hiệu sản phẩm'
                                    noOptionsMessage={() => ""}
                                />
                            </div>
                            <div>
                                <label className='addProduct_label-text'>
                                    Kích cỡ
                                </label>
                                <Select
                                    isMulti
                                    name="colors"
                                    // options={}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    placeholder='Kích cỡ sản phẩm'
                                    noOptionsMessage={() => ""}
                                />
                            </div>
                        </div>
                        <label className='addProduct_label-text'>
                            Màu sắc
                        </label>
                        <Select
                            isMulti
                            name="colors"
                            // options={}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder='Kích cỡ sản phẩm'
                            noOptionsMessage={() => ""}
                        />
                    </div>
                    <div className="addProduct_card">
                        <p className='addProduct_card-title'>
                            Giá sản phẩm
                        </p>
                        <div className="row-2">
                            <div>
                                <label className='addProduct_label-text'>
                                    Giá niêm yết
                                </label>
                                <input
                                    type="number"
                                    className='addProduct_number-input'
                                />
                            </div>
                            <div>
                                <label className='addProduct_label-text'>
                                    Phần trăm giảm giá
                                </label>
                                <Select
                                    isMulti
                                    name="colors"
                                    // options={}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    placeholder='Chọn phần trăm giảm giá'
                                    noOptionsMessage={() => ""}
                                />
                            </div>
                        </div>
                        <div className="row-2">
                            <div>
                                <label className='addProduct_label-text'>
                                    Giá bán được giảm
                                </label>
                                <input
                                    type="number"
                                    className='addProduct_number-input'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="addProduct_card">
                        <p className='addProduct_card-title'>
                            Hình ảnh sản phẩm
                        </p>
                        <div className="image-upload">
                            <div className="upload-box">
                                <p className='upload-text'>
                                    Click để tải ảnh
                                </p>
                                <input 
                                    type="file"
                                    className='upload-input'
                                    // hidden
                                />
                            </div>
                            <div className="preview-box"></div>
                            <div className="preview-box"></div>
                        </div>
                    </div>
                    <div className="actions">
                        <button className="btn-outline">
                            Lưu sản phẩm
                        </button>
                        <button className="btn-primary">
                            + Thêm sản phẩm
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            
        </>
    )
}

export default AddProductAdmin;
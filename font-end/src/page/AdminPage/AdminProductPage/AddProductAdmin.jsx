import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Select from 'react-select';
import { useDispatch } from 'react-redux';

// Import CSS và API
import '../../../css/admin/adminAddProduct.css';
import { multipleFileUploadAPI } from '../../../api/fileUpload'; // [cite: 651]
import { addNewProductAPI } from '../../../api/fetchProducts'; // [cite: 645]
import { fetchCategories } from '../../../api/fetchCategories'; // [cite: 632]
import { setLoading } from '../../../store/features/common'; // [cite: 701]
import axios from 'axios';

// Cấu hình URL host ảnh (Backend trả về tên file, cần ghép với host để hiển thị)
// Dựa vào cấu hình Backend [cite: 1] và[cite: 247], URL ảnh là /images/{filename}
const IMAGE_HOST_URL = "http://localhost:8080/images"; 

const AddProductAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // --- State dữ liệu ---
    const [categories, setCategories] = useState([]);
    const [categoryTypes, setCategoryTypes] = useState([]);
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    // Variants
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);

    // Images
    const [imageFiles, setImageFiles] = useState([]); // File gốc để upload
    const [previews, setPreviews] = useState([]);     // URL preview để hiển thị

    // --- 1. Load Categories ---
    useEffect(() => {
        const loadCats = async () => {
            try {
                const res = await fetchCategories();
                if(res) {
                    const options = res.map(cat => ({
                        value: cat.id,
                        label: cat.name,
                        types: cat.categoryTypes // [cite: 338]
                    }));
                    setCategories(options);
                }
            } catch (error) {
                console.error("Lỗi load category:", error);
            }
        }
        loadCats();
    }, []);

    // --- 2. Xử lý thay đổi Category ---
    const handleCategoryChange = (selected) => {
        setSelectedCategory(selected);
        setSelectedType(null);
        if(selected?.types) {
            const typeOptions = selected.types.map(type => ({
                value: type.id,
                label: type.name
            }));
            setCategoryTypes(typeOptions);
        } else {
            setCategoryTypes([]);
        }
    };

    // --- 3. Xử lý chọn ảnh (Preview & Lưu File) ---
    // const handleMultipleImagesChange = (e) => {
    //     const files = Array.from(e.target.files);
    //     if (files.length === 0) return;

    //     // Lưu file để upload sau
    //     setImageFiles(prev => [...prev, ...files]);

    //     // Tạo preview
    //     // const newPreviews = files.map(file => URL.createObjectURL(file));
    //     // setPreviews(prev => [...prev, ...newPreviews]);
    //     const newPreviews = files.map(file => URL.createObjectURL(file));
    //     setPreviews(prev => [...prev, ...newPreviews]);
    // };
    const handleMultipleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        
        setImageFiles(prev => [...prev, ...files]);
        
        const newPreviews = files.map(file =>
            URL.createObjectURL(file)
        );
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    const removeImage = (index) => {
        const updatedFiles = [...imageFiles];
        updatedFiles.splice(index, 1);
        setImageFiles(updatedFiles);

        const updatedPreviews = [...previews];
        URL.revokeObjectURL(updatedPreviews[index]); // Cleanup memory
        updatedPreviews.splice(index, 1);
        setPreviews(updatedPreviews);
    };

    // --- 4. Xử lý Submit Form ---
    const handleSubmit = async () => {
        // Validate cơ bản
        if (!name || !price || !selectedCategory) {
            alert("Vui lòng nhập tên, giá và chọn thể loại!");
            return;
        }

        dispatch(setLoading(true));

        try {
            let uploadedImages = [];

            // BƯỚC 1: Upload ảnh (nếu có) 
            if (imageFiles.length > 0) {
                const formData = new FormData();
                imageFiles.forEach(file => {
                    formData.append("files", file); 
                });

                // Gọi API upload trả về danh sách tên file
                const fileNames = await multipleFileUploadAPI(formData); 
                // const uploadedImageNames = await multipleFileUploadAPI(formData);

                // Map sang cấu trúc ProductImageDto [cite: 323]
                uploadedImages = fileNames.map((fileName, index) => ({
                    url: `${IMAGE_HOST_URL}/${fileName}`,
                    name: fileName,
                    isPrimary: index === 0,
                    type: "IMAGE"
                }));
            }

            // BƯỚC 2: Tạo Variants 
            // Logic: Nếu chọn nhiều size/màu, tạo variant cho từng sự kết hợp
            let variants = [];
            
            // Nếu người dùng chọn Size và Màu
            if (selectedSizes.length > 0 && selectedColors.length > 0) {
                selectedSizes.forEach(s => {
                    selectedColors.forEach(c => {
                        variants.push({
                            size: s.value,
                            color: c.label, // Hoặc c.value tùy db
                            quantity: parseInt(quantity) || 0 // Chia đều hoặc set chung
                        });
                    });
                });
            } 

            // Nếu chỉ chọn Size
            else if (selectedSizes.length > 0) {
                selectedSizes.forEach(s => {
                    variants.push({
                        size: s.value,
                        color: "Default",
                        quantity: parseInt(quantity) || 0
                    });
                });
            }

            // Nếu không chọn gì (Sản phẩm đơn giản)
            else {
                variants.push({
                    size: "Free Size",
                    color: "Default",
                    quantity: parseInt(quantity) || 0
                });
            }

            // BƯỚC 3: Tạo Payload 
            const payload = {
                name: name,
                description: description,
                price: parseFloat(price),
                isNewArrival: true,
                rating: 0,
                slug: name.toLowerCase()
                        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        .replace(/ /g, '-')
                        .replace(/[^\w-]+/g, ''),
                categoryId: selectedCategory.value,
                categoryTypeId: selectedType?.value || null,
                variants: variants,
                productImage: uploadedImages.map((img, index) => ({
                    name: img.name,
                    url: img.url,
                    type: img.type,
                    isPrimary: index === 0 // Ảnh đầu tiên là ảnh chính
                })),
            };

            console.log("Payload gửi đi:", payload);

            // BƯỚC 4: Gọi API Add Product [cite: 261]
            await addNewProductAPI(payload);
            
            alert("Thêm sản phẩm thành công!");
            navigate('/admin/quan-ly-san-pham');

        } catch (error) {
            console.error("Lỗi thêm sản phẩm:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại.");
        } finally {
            dispatch(setLoading(false));
        }
    };


    // Options giả lập (Bạn có thể gọi API lấy size/color nếu cần)
    const sizeOptions = [
        { value: 'S', label: 'S' },
        { value: 'M', label: 'M' },
        { value: 'L', label: 'L' },
        { value: 'XL', label: 'XL' },
        { value: '38', label: '38' },
        { value: '39', label: '39' },
        { value: '40', label: '40' },
        { value: '41', label: '41' },
        { value: '42', label: '42' }
    ];

    const colorOptions = [
        { value: 'Red', label: 'Đỏ' },
        { value: 'Blue', label: 'Xanh' },
        { value: 'Black', label: 'Đen' },
        { value: 'White', label: 'Trắng' },
        { value: 'Yellow', label: 'Vàng' }
    ];

    return (
        <div className="add-product-page">
            <div className="add-product-header">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link to="/admin" style={{textDecoration:'none', color:'inherit'}}>Admin</Link>
                    <Typography color="text.primary">Thêm sản phẩm</Typography>
                </Breadcrumbs>
                <p className='addProduct-title'>Thêm sản phẩm mới</p>
            </div>

            <div className="addProduct-content">
                {/* --- Cột Trái --- */}
                <div className="left-col">
                    <div className="addProduct_card">
                        <p className="addProduct_card-title">Thông tin chung</p>
                        
                        <label className='addProduct_label-text'>Tên sản phẩm <span style={{color:'red'}}>*</span></label>
                        <input 
                            type="text" 
                            className='addProduct-input' 
                            placeholder="Nhập tên sản phẩm"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label className='addProduct_label-text'>Mô tả</label>
                        <textarea 
                            rows={5} 
                            className='addProduct-textarea' 
                            placeholder="Mô tả chi tiết sản phẩm..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="addProduct_card">
                        <p className="addProduct_card-title">Phân loại</p>
                        
                        <label className='addProduct_label-text'>Danh mục chính <span style={{color:'red'}}>*</span></label>
                        <Select
                            options={categories}
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder='Chọn danh mục (Nam, Nữ...)'
                            onChange={handleCategoryChange}
                            value={selectedCategory}
                        />

                        <label className='addProduct_label-text' style={{marginTop:'15px'}}>Loại chi tiết</label>
                        <Select
                            options={categoryTypes}
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder='Chọn loại (Áo, Quần...)'
                            onChange={setSelectedType}
                            value={selectedType}
                            isDisabled={!selectedCategory}
                            noOptionsMessage={() => "Vui lòng chọn danh mục chính trước"}
                        />
                    </div>
                </div>

                {/* --- Cột Phải --- */}
                <div className="right-col">
                    <div className="addProduct_card">
                        <p className='addProduct_card-title'>Biến thể & Kho</p>
                        
                        <label className='addProduct_label-text'>Số lượng nhập (Mỗi biến thể)</label>
                        <input 
                            type="number" 
                            className="input_numberQ" 
                            style={{width: '100%', marginBottom: '15px'}}
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="0"
                        />

                        <div className="row-2">
                            <div style={{width: '48%'}}>
                                <label className='addProduct_label-text'>Kích cỡ</label>
                                <Select
                                    isMulti
                                    options={sizeOptions}
                                    className="basic-multi-select"
                                    placeholder='Chọn Size'
                                    onChange={setSelectedSizes}
                                    value={selectedSizes}
                                />
                            </div>
                            <div style={{width: '48%'}}>
                                <label className='addProduct_label-text'>Màu sắc</label>
                                <Select
                                    isMulti
                                    options={colorOptions}
                                    className="basic-multi-select"
                                    placeholder='Chọn Màu'
                                    onChange={setSelectedColors}
                                    value={selectedColors}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="addProduct_card">
                        <p className='addProduct_card-title'>Giá cả</p>
                        <label className='addProduct_label-text'>Giá bán (VNĐ) <span style={{color:'red'}}>*</span></label>
                        <input 
                            type="number" 
                            className='addProduct_number-input' 
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="VD: 100000"
                        />
                    </div>

                    <div className="addProduct_card">
                        <p className='addProduct_card-title'>Hình ảnh</p>
                        <div className="image-upload">
                            {/* Hiển thị danh sách ảnh đã chọn */}
                            <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
                                {previews.map((src, index) => (
                                    <div key={index} style={{position: 'relative', width: '80px', height: '80px'}}>
                                        <img src={src} alt="Preview" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius:'4px', border:'1px solid #ddd'}} />
                                        <span 
                                            onClick={() => removeImage(index)}
                                            style={{
                                                position: 'absolute', top: '-5px', right: '-5px', 
                                                background: 'red', color: 'white', borderRadius: '50%', 
                                                width: '20px', height: '20px', textAlign: 'center', 
                                                lineHeight: '20px', cursor: 'pointer', fontSize:'12px'
                                            }}
                                        >
                                            X
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="upload-box" style={{position: 'relative', border: '2px dashed #ccc', padding: '20px', textAlign: 'center'}}>
                                <p className='upload-text'>Click để tải thêm ảnh</p>
                                <input 
                                    type="file" 
                                    multiple 
                                    className='upload-input'
                                    onChange={handleMultipleImagesChange}
                                    style={{opacity: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer'}}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="actions">
                        <button className="btn-outline" onClick={() => navigate('/admin/quan-ly-san-pham')}>
                            Hủy bỏ
                        </button>
                        <button className="btn-primary" onClick={handleSubmit}>
                            + Lưu sản phẩm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProductAdmin;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Select from 'react-select';
import { useDispatch } from 'react-redux';

import '../../../css/admin/adminAddProduct.css';
import { multipleFileUploadAPI } from '../../../api/fileUpload';
import { getProductBySlug, updateProductAPI, getAllProducts } from '../../../api/fetchProducts'; // Cần thêm getProductById trong api
import { fetchCategories } from '../../../api/fetchCategories';
import { setLoading } from '../../../store/features/common';
import axios from 'axios';
import { API_BASE_URL } from '../../../api/constant';

const EditProductAdmin = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State
    const [categories, setCategories] = useState([]);
    const [categoryTypes, setCategoryTypes] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    
    // Hình ảnh
    const [imageFiles, setImageFiles] = useState([]); // File mới upload
    const [oldImages, setOldImages] = useState([]); // Ảnh cũ từ server
    const [previews, setPreviews] = useState([]); // Preview ảnh mới

    // 1. Load Categories và Product Data
    useEffect(() => {
        const initData = async () => {
            dispatch(setLoading(true));
            try {
                // Load danh mục
                const catRes = await fetchCategories();
                const catOptions = catRes.map(cat => ({
                    value: cat.id,
                    label: cat.name,
                    types: cat.categoryTypes
                }));
                setCategories(catOptions);

                // Load sản phẩm theo ID
                const prodRes = await axios.get(`${API_BASE_URL}/api/products/${id}`);
                const product = prodRes.data;

                // Fill dữ liệu vào form
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price.toString());
                
                // Set Category & Type
                const currentCat = catOptions.find(c => c.value === product.categoryId);
                setSelectedCategory(currentCat);
                if (currentCat && currentCat.types) {
                    const typeOptions = currentCat.types.map(t => ({ value: t.id, label: t.name }));
                    setCategoryTypes(typeOptions);
                    const currentType = typeOptions.find(t => t.value === product.categoryTypeId);
                    setSelectedType(currentType);
                }

                // Set ảnh cũ
                if (product.productImage) {
                    setOldImages(product.productImage);
                }
                
                // Set quantity (Lấy từ biến thể đầu tiên cho đơn giản, hoặc tổng)
                if(product.variants && product.variants.length > 0) {
                     setQuantity(product.variants[0].quantity);
                }

            } catch (error) {
                console.error("Lỗi loading data:", error);
            } finally {
                dispatch(setLoading(false));
            }
        };
        initData();
    }, [id, dispatch]);

    // Xử lý thay đổi Category
    const handleCategoryChange = (selected) => {
        setSelectedCategory(selected);
        setSelectedType(null);
        if(selected?.types) {
            setCategoryTypes(selected.types.map(t => ({ value: t.id, label: t.name })));
        } else {
            setCategoryTypes([]);
        }
    };

    // Xử lý ảnh mới
    const handleMultipleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        setImageFiles(prev => [...prev, ...files]);
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    // Xóa ảnh cũ
    const removeOldImage = (imgId) => {
        setOldImages(prev => prev.filter(img => img.id !== imgId));
    };

    // Submit Update
    const handleSubmit = async () => {
        dispatch(setLoading(true));
        try {
            let newUploadedImages = [];
            // 1. Upload ảnh mới nếu có
            if (imageFiles.length > 0) {
                const formData = new FormData();
                imageFiles.forEach(file => formData.append("files", file));
                const fileNames = await multipleFileUploadAPI(formData);
                
                newUploadedImages = fileNames.map((fileName) => ({
                    url: fileName,
                    name: name,
                    isPrimary: false,
                    type: fileName.split('.').pop().toUpperCase()
                }));
            }

            // 2. Gộp ảnh cũ (giữ nguyên cấu trúc) và ảnh mới
            const finalImages = [
                ...oldImages, 
                ...newUploadedImages
            ].map((img, index) => ({
                ...img,
                isPrimary: index === 0 // Reset ảnh đầu tiên là chính
            }));

            // 3. Tạo Payload (Lưu ý: Logic Variants đang để đơn giản hóa)
            const payload = {
                id: id, // Quan trọng cho Update
                name: name,
                description: description,
                price: parseFloat(price),
                isNewArrival: true,
                slug: name.toLowerCase().replace(/ /g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                categoryId: selectedCategory?.value,
                categoryTypeId: selectedType?.value || null,
                // Giả sử giữ nguyên variants cũ hoặc cập nhật quantity đơn giản
                variants: [{
                    size: "Free Size", // Bạn có thể mở rộng logic này như AddProduct
                    color: "Default",
                    quantity: parseInt(quantity) || 0
                }],
                productImage: finalImages
            };

            await updateProductAPI(id, payload);
            alert("Cập nhật sản phẩm thành công!");
            navigate('/admin/quan-ly-san-pham');

        } catch (error) {
            console.error(error);
            alert("Lỗi cập nhật sản phẩm");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="add-product-page">
            <div className="add-product-header">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link to="/admin/quan-ly-san-pham">Sản phẩm</Link>
                    <Typography color="text.primary">Sửa sản phẩm</Typography>
                </Breadcrumbs>
                <p className='addProduct-title'>Chỉnh sửa: {name}</p>
            </div>

            <div className="addProduct-content">
                <div className="left-col">
                    <div className="addProduct_card">
                        <label className='addProduct_label-text'>Tên sản phẩm</label>
                        <input 
                          type="text" 
                          className='addProduct-input' 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                        />
                        
                        <label className='addProduct_label-text'>Giá (VNĐ)</label>
                        <input 
                          type="number" 
                          className='addProduct-input' 
                          value={price} 
                          onChange={(e) => setPrice(e.target.value)} 
                        />
                        
                        <label className='addProduct_label-text'>Mô tả</label>
                        <textarea rows={5} className='addProduct-textarea' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div className="addProduct_card">
                         <label className='addProduct_label-text'>Danh mục</label>
                        <Select options={categories} value={selectedCategory} onChange={handleCategoryChange} placeholder="Chọn danh mục" />
                        
                        <label className='addProduct_label-text' style={{marginTop:'10px'}}>Loại</label>
                        <Select options={categoryTypes} value={selectedType} onChange={setSelectedType} placeholder="Chọn loại" />
                    </div>
                </div>

                <div className="right-col">
                    <div className="addProduct_card">
                        <label className='addProduct_label-text'>Số lượng kho</label>
                        <input
                          type="number" 
                          className='input_numberQ' 
                          value={quantity} 
                          onChange={(e) => setQuantity(e.target.value)} 
                        />
                    </div>

                    <div className="addProduct_card">
                        <p className='addProduct_card-title'>Hình ảnh</p>
                        <div className="image-upload">
                            {/* Ảnh Cũ */}
                            <div style={{display:'flex', gap:'10px', flexWrap:'wrap'}}>
                                {oldImages.map((img) => (
                                    <div key={img.id} style={{position:'relative', width:'80px', height:'80px'}}>
                                        <img src={img.url.startsWith("http") ? img.url : API_BASE_URL + img.url} style={{width:'100%', height:'100%'}} alt=""/>
                                        <span onClick={() => removeOldImage(img.id)} style={{position:'absolute', top:-5, right:-5, background:'red', color:'white', cursor:'pointer', borderRadius:'50%', width:'20px', textAlign:'center'}}>X</span>
                                    </div>
                                ))}
                                {/* Ảnh Mới (Preview) */}
                                {previews.map((src, idx) => (
                                    <div key={idx} style={{width:'80px', height:'80px'}}>
                                         <img src={src} style={{width:'100%', height:'100%', border:'2px dashed green'}} alt=""/>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="upload-box" style={{marginTop:'15px', position:'relative', padding:'20px', border:'1px dashed #ccc'}}>
                                <p>Tải thêm ảnh mới</p>
                                <input
                                  type="file"
                                  multiple 
                                  onChange={handleMultipleImagesChange} 
                                  style={{
                                    position:'absolute', 
                                    top:0, 
                                    left:0, 
                                    width:'100%', 
                                    height:'100%', 
                                    opacity:0
                                  }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="actions">
                        <button className="btn-primary" onClick={handleSubmit}>Cập nhật</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProductAdmin;
import React, { useState } from 'react';
import { createBrandAPI } from '../../../api/fetchBranch';
import { multipleFileUploadAPI } from '../../../api/fileUpload'; 
import { API_BASE_URL } from '../../../api/constant'; 
import '../../../css/admin/adminAdd.css'; 

const AddBrandAdmin = ({ onReload }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    
    // State cho hình ảnh
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);

    // Xử lý khi chọn ảnh
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // Xóa ảnh đã chọn
    const removeImage = () => {
        setImageFile(null);
        setPreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let thumbnailUrl = "";

            // 1. Upload ảnh nếu có
            if (imageFile) {
                const formData = new FormData();
                formData.append("files", imageFile);
                // Gọi API upload, nó trả về mảng tên file
                const res = await multipleFileUploadAPI(formData); 
                if (res && res.length > 0) {
                    thumbnailUrl = res[0]; // Lấy tên file đầu tiên
                }
            }

            // 2. Tạo object Brand với thumbnail
            const brandData = {
                name: name,
                description: description,
                thumbnail: thumbnailUrl // Gửi tên ảnh lên server
            };

            await createBrandAPI(brandData);
            
            alert("Thêm thương hiệu thành công!");
            
            // Reset form
            setName('');
            setDescription('');
            removeImage();
            
            if(onReload) onReload(); 

        } catch (error) {
            console.error(error);
            alert("Lỗi khi thêm thương hiệu");
        }
    };

    return (
        <div className='addCate'>
            <div className='addCate2' style={{display:'block'}}>
                <h3 className='addProduct-title'>Thêm thương hiệu mới</h3>
                <form className='addCate2_form' onSubmit={handleSubmit}>
                    {/* Tên thương hiệu */}
                    <label className='addProduct_label-text'>Tên thương hiệu</label>
                    <input 
                        type="text"
                        placeholder='Nhập tên thương hiệu (VD: Nike)'
                        className='addCate2_input1'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    {/* Mô tả */}
                    <label className='addProduct_label-text' style={{marginTop: '15px'}}>Mô tả</label>
                    <input 
                        type="text"
                        placeholder='Mô tả ngắn gọn'
                        className='addCate2_input1'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    {/* Upload Ảnh */}
                    <label className='addProduct_label-text' style={{marginTop: '15px'}}>Logo thương hiệu</label>
                    <div className="image-upload" style={{marginTop:'5px'}}>
                        {preview ? (
                            <div style={{position: 'relative', width: '100px', height: '100px', border:'1px solid #ddd', borderRadius:'8px'}}>
                                <img 
                                    src={preview} 
                                    alt="Preview" 
                                    style={{width: '100%', height: '100%', objectFit: 'contain', borderRadius:'8px'}} 
                                />
                                <span 
                                    onClick={removeImage}
                                    style={{
                                        position: 'absolute', top: '-8px', right: '-8px', 
                                        background: 'red', color: 'white', borderRadius: '50%', 
                                        width: '20px', height: '20px', textAlign: 'center', 
                                        lineHeight: '20px', cursor: 'pointer', fontSize:'12px', fontWeight:'bold'
                                    }}
                                >
                                    X
                                </span>
                            </div>
                        ) : (
                            <div className="upload-box" style={{border: '2px dashed #ccc', padding: '10px', textAlign: 'center', width:'100%', cursor:'pointer', position:'relative'}}>
                                <p className='upload-text' style={{margin:0}}>Click để tải logo</p>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{opacity: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer'}}
                                />
                            </div>
                        )}
                    </div>

                    <button className='addCate2_btn' type="submit" style={{marginTop:'20px'}}>
                        Lưu thương hiệu
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBrandAdmin;
import React, { useEffect, useState } from 'react';
import { MdEdit, MdSave, MdCancel } from "react-icons/md"; // Import thêm icon Save, Cancel
import { IoCameraOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';

import '../../css/user/profile.css';
import { loadUserInfo, selectIsUserAdmin, selectUserInfo } from '../../store/features/user';
import { setLoading } from '../../store/features/common';
import { fetchUserDetails, updateUserInfoAPI } from '../../api/userInfo';

const MyProfilePage = () => {
    const userInfo = useSelector(selectUserInfo);
    const isUserAdmin = useSelector(selectIsUserAdmin);
    const dispatch = useDispatch();
    
    // State cho form chỉnh sửa
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: ''
    });
    const [message, setMessage] = useState({ type: '', content: '' });

    // Khi load trang hoặc userInfo thay đổi, cập nhật dữ liệu vào form
    useEffect(() => {
        if (userInfo) {
            setFormData({
                fullName: userInfo.fullName || '',
                phoneNumber: userInfo.phoneNumber || ''
            });
        }
    }, [userInfo]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Hàm xử lý khi nhấn nút Chỉnh sửa
    const handleEditClick = () => {
        setIsEditing(true);
        // Reset form data về giá trị hiện tại để tránh trường hợp sửa dở rồi hủy
        setFormData({
            fullName: userInfo.fullName || '',
            phoneNumber: userInfo.phoneNumber || ''
        });
    };

    // Hàm hủy bỏ chỉnh sửa
    const handleCancelClick = () => {
        setIsEditing(false);
        setFormData({
            fullName: userInfo.fullName || '',
            phoneNumber: userInfo.phoneNumber || ''
        });
        setMessage({ type: '', content: '' });
    };

    const handleUpdate = async () => {
        // Validate cơ bản
        if (!formData.fullName.trim()) {
            setMessage({ type: 'error', content: 'Họ tên không được để trống' });
            return;
        }

        try {
            dispatch(setLoading(true));
            // Gọi API cập nhật
            await updateUserInfoAPI(formData);
            
            // Cập nhật thành công -> Load lại thông tin mới vào Redux
            const updatedUser = await fetchUserDetails();
            dispatch(loadUserInfo(updatedUser));

            setMessage({ type: 'success', content: 'Cập nhật thành công!' });
            setIsEditing(false); // Tắt chế độ sửa sau khi lưu thành công
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', content: typeof error === 'string' ? error : 'Cập nhật thất bại' });
        } finally {
            dispatch(setLoading(false));
            // Tự động ẩn thông báo sau 3s
            setTimeout(() => setMessage({ type: '', content: '' }), 3000);
        }
    };

    return (  
        <>
            <div id='profile-user'>
                {/* Hiển thị thông báo nếu có */}
                {message.content && (
                    <div style={{ 
                        padding: '10px', 
                        marginBottom: '15px', 
                        borderRadius: '4px',
                        textAlign: 'center',
                        backgroundColor: message.type === 'error' ? '#ffebee' : '#e8f5e9',
                        color: message.type === 'error' ? '#c62828' : '#2e7d32'
                    }}>
                        {message.content}
                    </div>
                )}

                <div id='profile_avt'>
                    <div id='profile_avt-blk'>
                        <img 
                            src="https://images4.alphacoders.com/127/thumb-1920-1272717.png"
                            alt="avatar user"
                            id='profile_avt-img'
                        />
                    </div>
                    {/* Nút đổi avatar có thể ẩn khi đang edit hoặc giữ nguyên tùy ý */}
                    <button id='profile_avt-btn' disabled={isEditing}>
                        <IoCameraOutline className='profile-edit'/>
                    </button>
                </div>

                <div id='profile_info'>
                    {/* HỌ VÀ TÊN */}
                    <div className='profile_info-item'>
                        <p className='info-text1'>
                            Họ và tên:
                        </p>
                        {isEditing ? (
                            <input 
                                type="text" 
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="info-input" // Bạn có thể style class này trong CSS
                                style={{ padding: '5px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                        ) : (
                            <p className='info-text2'>
                                {userInfo?.fullName}
                            </p>
                        )}
                    </div>    
                    
                    {/* EMAIL (Không cho sửa) */}
                    <div className='profile_info-item'>
                        <p className='info-text1'>
                            Email:
                        </p>
                        <p className='info-text2' style={{ color: isEditing ? '#888' : 'inherit' }}>
                            {userInfo?.email} 
                            {isEditing && <span style={{fontSize: '12px', marginLeft: '5px'}}></span>}
                        </p>
                    </div>

                    {/* SỐ ĐIỆN THOẠI */}
                    <div className={`profile_info-item ${isUserAdmin ? "" : 'info_noneBorder'}`}>
                        <p className='info-text1'>
                            Số điện thoại:
                        </p>
                        {isEditing ? (
                            <input 
                                type="text" 
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="info-input"
                                style={{ padding: '5px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                        ) : (
                            <p className='info-text2'>
                                {userInfo?.phoneNumber || 'Chưa có SĐT'}
                            </p>
                        )}
                    </div>

                    {/* QUYỀN (Chỉ hiển thị, không sửa) */}
                    {isUserAdmin && 
                        <div className='profile_info-item info_noneBorder'>
                            <p className='info-text1'>
                                Quyền:
                            </p>
                            <p className='info-text2'>
                                Quản trị viên (Admin)
                            </p>
                        </div>
                    }

                    {/* BUTTON ACTIONS */}
                    <div className='profile_info-btn' style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                        {!isEditing ? (
                            // Nút Chỉnh sửa
                            <button className='info_btn' onClick={handleEditClick}>
                                <MdEdit className='info_btn-icon'/>
                                <p className='info_btn-text'>
                                    Chỉnh sửa hồ sơ
                                </p>
                            </button>
                        ) : (
                            // Nút Lưu và Hủy
                            <>
                                <button 
                                    className='info_btn' 
                                    onClick={handleUpdate}
                                    style={{ backgroundColor: '#28a745', color: 'white', border: 'none' }}
                                >
                                    <MdSave className='info_btn-icon'/>
                                    <p className='info_btn-text'>
                                        Lưu thay đổi
                                    </p>
                                </button>
                                <button 
                                    className='info_btn' 
                                    onClick={handleCancelClick}
                                    style={{ backgroundColor: '#dc3545', color: 'white', border: 'none' }}
                                >
                                    <MdCancel className='info_btn-icon'/>
                                    <p className='info_btn-text'>
                                        Hủy
                                    </p>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfilePage;
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { SiKeepassxc } from "react-icons/si";
import React, { useState } from 'react';

import '../../css/user/profile.css';
import { changePasswordAPI } from '../../api/authentication';

const ChangePassword = () =>  {
  // State lưu dữ liệu form
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // State quản lý ẩn/hiện password cho từng ô
  const [showPass, setShowPass] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // State thông báo
  const [message, setMessage] = useState({ type: '', text: '' });

  // Xử lý khi nhập liệu
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Xử lý ẩn/hiện password
  const toggleShow = (field) => {
    setShowPass({
      ...showPass,
      [field]: !showPass[field]
    });
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    const { currentPassword, newPassword, confirmPassword } = formData;

    // 1. Validate cơ bản ở Frontend
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({ type: 'error', text: 'Vui lòng điền đầy đủ thông tin.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Mật khẩu xác nhận không khớp.' });
      return;
    }

    if (newPassword.length < 5) {
      setMessage({ type: 'error', text: 'Mật khẩu mới phải có ít nhất 5 ký tự.' });
      return;
    }

    // 2. Gọi API
    try {
      const body = {
        currentPassword: currentPassword,
        newPassword: newPassword
      };

      // Gọi API từ file auth.js 
      await changePasswordAPI(body); 

      setMessage({ type: 'success', text: 'Đổi mật khẩu thành công!' });
      
      // Reset form
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

    } catch (error) {
      console.error(error);
      // Backend trả về message lỗi dạng string hoặc object tùy cấu hình
      const errorMsg = error.response?.data || "Đổi mật khẩu thất bại. Vui lòng kiểm tra lại mật khẩu cũ.";
      setMessage({ type: 'error', text: typeof errorMsg === 'string' ? errorMsg : "Có lỗi xảy ra" });
    }
  };

  return (  
    <div id='profile-changePassword'>
      <p className='changePassword-title'>
        Đổi mật khẩu
      </p>
      <form 
        className='changePassword-form' 
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {/* Mật khẩu hiện tại */}
        <div className='changePassword-blk'>
          <label htmlFor="currentPassword" className='changePassword-text'>
            Mật khẩu hiện tại:
          </label>
          <div className='changePassword-inputDiv'>
            <input
              type={showPass.current ? "text" : "password"}
              name="currentPassword"
              className='changePassword-input'
              placeholder="Nhập mật khẩu hiện tại"
              // value={formData.currentPassword}
              value={formData.currentPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {showPass.current ? (
              <FaEyeSlash
                className='changePassword-icon'
                onClick={() => toggleShow('current')}
              />
            ) : (
              <FaRegEye
                className='changePassword-icon'
                onClick={() => toggleShow('current')}
              />
            )}
          </div>
        </div>
        {/* Mật khẩu mới */}
        <div className='changePassword-blk changePassword-reNewPass'>
          <label 
            htmlFor="newPass"
            className='changePassword-text'
          >
            Mật khẩu mới:
          </label>
          <div className='changePassword-inputDiv'>
            <input
              type={showPass.new ? "text" : "password"}
              name="newPassword"
              className='changePassword-input'
              value={formData.newPassword}
              onChange={handleChange}
              autoComplete="new-password"
              placeholder="Ít nhất 5 ký tự"
            />
            {showPass.new ? (
              <FaEyeSlash
                className='changePassword-icon'
                onClick={() => toggleShow('new')}
              />
            ) : (
              <FaRegEye
                className='changePassword-icon'
                onClick={() => toggleShow('new')}
              />
            )}
          </div>
        </div>
        {/* Nhập lại mật khẩu mới */}
        <div className='changePassword-blk changePassword-reNewPass'>
          <label 
            htmlFor="reNewPass"
            className='changePassword-text'
          >
            Nhập lại mật khẩu:
          </label>
          <div className='changePassword-inputDiv'>
            <input
              type={showPass.confirm ? "text" : "password"}
              name="confirmPassword"
              className='changePassword-input'
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              placeholder="Nhập lại mật khẩu mới"
            />
            {showPass.confirm ? (
              <FaEyeSlash
                className='changePassword-icon'
                onClick={() => toggleShow('confirm')}
              />
            ) : (
              <FaRegEye
                className='changePassword-icon'
                onClick={() => toggleShow('confirm')}
              />
            )}
          </div>
        </div>
        {message.text && (
          <p>
            {message.text}
          </p>
        )}
        <div id='changePassword-btnDiv'>
          <button 
            type='submit'
            className='changePassword-btn'
          >
            Cập nhật mật khẩu
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword;
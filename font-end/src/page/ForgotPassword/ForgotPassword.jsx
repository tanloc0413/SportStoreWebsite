import React, { useState } from 'react';
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; // Dùng để chuyển trang sau khi xong
import { forgotPasswordAPI, resetPasswordAPI } from '../../api/authentication'; // Nhớ import đúng đường dẫn
import '../../css/user/forgotPass.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  
  // State quản lý bước: 1 (Nhập email) hoặc 2 (Nhập code & pass mới)
  const [step, setStep] = useState(1);
  
  // State dữ liệu
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  // State hiển thị
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Xử lý gửi Email (Bước 1)
  const handleSendCode = async () => {
    if (!email) {
      setMessage("Vui lòng nhập email.");
      return;
    }
    
    setIsLoading(true);
    setMessage("");

    try {
      await forgotPasswordAPI(email);
      setStep(2); // Chuyển sang bước 2
      setMessage("Mã xác nhận đã được gửi đến email của bạn.");
    } catch (error) {
      setMessage(typeof error === 'string' ? error : "Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý đổi mật khẩu (Bước 2)
  const handleResetPassword = async () => {
    if (!code || !newPassword) {
      setMessage("Vui lòng nhập đầy đủ mã code và mật khẩu mới.");
      return;
    }

    if (newPassword.length < 5) {
      setMessage("Mật khẩu phải có ít nhất 5 ký tự.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      await resetPasswordAPI({ email, code, newPassword });
      alert("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
      navigate('/dang-nhap'); // Chuyển về trang đăng nhập
    } catch (error) {
      setMessage(typeof error === 'string' ? error : "Mã xác nhận không đúng hoặc đã hết hạn.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='forgotPass'>
      {/* Bước 1: Nhập Email */}
      {step === 1 && (
        <div className='forgotPass1'>
          <p className='forgotPass1-title'>
            Quên mật khẩu
          </p>
          <label 
            htmlFor="email"
            className='forgotPass1-label'
          >
            Email
          </label>
          <input 
            type="email" 
            placeholder='Nhập email cần đổi mật khẩu'
            className='forgotPass1-input'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {message && <p style={{color: 'red', fontSize: '14px', marginTop: '10px'}}>{message}</p>}
          <button
            className='forgotPass1-btn'
            onClick={handleSendCode}
            disabled={isLoading}
          >
            {isLoading ? "Đang gửi..." : "Xác nhận"}
          </button>
        </div>
      )}

      {/* Bước 2: Nhập Code và Mật khẩu mới */}
      {step === 2 && (
        <div className='forgotPass2'>
          <p className='forgotPass2-title'>
            Đặt lại mật khẩu
          </p>
          <p style={{fontSize: '14px', color: '#666', marginBottom: '10px'}}>
            Mã xác nhận đã gửi tới: <strong>{email}</strong>
          </p>
          
          <input 
            type="text" 
            placeholder='Nhập mã 6 số'
            className='forgotPass2-input forgotPass2-inputC'
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          
          <div className='forgotPass2-grInput'>
            <input 
              type={showPass ? "text" : "password"}
              placeholder='Nhập mật khẩu mới'
              className='forgotPass2-input forgotPass2-inputR'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {showPass ? (
              <FaEyeSlash
                className='forgotPass2-eyeF'
                onClick={() => setShowPass(false)}
              />
            ) : (
              <FaRegEye
                className='forgotPass2-eyeF'
                onClick={() => setShowPass(true)}
              />
            )}
          </div>

          {message && <p style={{color: message.includes('thành công') ? 'green' : 'red', fontSize: '14px', marginTop: '10px'}}>{message}</p>}

          <button
            className='forgotPass1-btn'
            onClick={handleResetPassword}
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Đổi mật khẩu"}
          </button>
          
          <div 
            style={{marginTop: '15px', cursor: 'pointer', color: '#007bff', fontSize: '14px', textAlign:'center'}}
            onClick={() => setStep(1)}
          >
            Quay lại nhập email
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgotPassword;
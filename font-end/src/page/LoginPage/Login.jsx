import React, { useCallback, useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI } from '../../api/authentication';
import { saveToken } from '../../util/jwt-helper';
import { useDispatch } from 'react-redux';

import '../../css/user/login.css';
import { setLoading } from '../../store/features/common';
import GoogleIcon from '../../imgs/google.png';
import { API_BASE_URL } from '../../api/constant';

const Login = () => {
  // hiện mật khẩu
  const [showPassword, setShowPassword] = useState(false);

  // lấy giá trị
  const [values, setValues] = useState({
    userName: '',
    password: ''
  });

  // báo lỗi
  const [error, setError] = useState(''); 

  // loading
  const dispatch = useDispatch();

  // điều hướng
  const navigate = useNavigate();

  // gửi yêu cầu đăng nhập
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    setError('');
    dispatch(setLoading(true));

    if (!values.password || values.password.length < 5) {
      setError("Mật khẩu phải có ít nhất 5 ký tự!");
      // dispatch(setLoading(false));
      return;
    }

    loginAPI(values)
    .then(res => {
      if(res?.token) {
        saveToken(res?.token);
        navigate('/')
      } else {
        setError("Đã xảy ra lỗi!");
      }
    })
    .catch(() => {
      setError("Thông tin đăng nhập không hợp lệ!");
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
  }, [dispatch, navigate, values]);

  // thay đổi giá trị
  const handleOnChange = useCallback((e) => {
    e.persist();
    setValues(values => ({
      ...values,
      [e.target.name]: e.target?.value
    }))
  });

  // đăng nhập bằng Google
  const handleClick = useCallback(() => {
    window.location.href = API_BASE_URL + "/oauth2/authorization/google";
  },[])

  return (
    <div id="login">
      <div className="login-form">
        <p className='login-title'>Đăng nhập</p>
        <form 
          id='form-blockLogin' 
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <div className="input-box">
            <label htmlFor="userName" className='login_input-text'>Tài khoản</label>
            <input
              type="email"
              name="userName"
              placeholder="Vui lòng nhập email hoặc sdt"
              className='login-input login_username-input'
              autoComplete="off"
              onChange={handleOnChange}
              value={values?.userName}
            />
          </div>
          <div className="input-box password-box">
            <label htmlFor="password" className='login_input-text'>Mật khẩu</label>
            <div className='login_block-password'>
              <input
                name="password"
                placeholder="Mật khẩu"
                className="login-input login_password-input"
                type={showPassword ? "text" : "password"}
                onChange={handleOnChange}
                value={values?.password || ""}
                autoComplete="new-password"
              />
              <div
                className='login_block-eye'
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? (
                  <FaRegEyeSlash className='eye-icon'/>
                ) : (
                  <FaRegEye className='eye-icon'/>
                )}
              </div>
            </div>
          </div>
          <div className="input-box login_forgotPass-box">
            <Link to="/dang-ky" className='login_signup-text'>Đăng ký ngay!</Link>
            <a href="/quen-mat-khau" className='login_forgotPass-text'>Quên mật khẩu?</a>
          </div>
          <div className="input-box btn-box">
            <button
              className='login-btn'
            >
              Đăng nhập
            </button>
            {error && <div id="error-login">{error}</div>}
          </div>
          <div className="hr-box">
            <hr className='hr-block'/>
            <p className='hr-text'>Hoặc</p>
            <hr className='hr-block'/>
          </div>
          <div className='google-box'>
            <button 
              className='login-btn-google'
              onClick={handleClick}
            >
              <img src={GoogleIcon} alt="google" className='img-google'/>
              <p className='text-google'>Đăng nhập bằng Google</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;
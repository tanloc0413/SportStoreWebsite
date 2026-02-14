import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import '../../css/user/register.css';
import { setLoading } from '../../store/features/common';
import { registerAPI } from '../../api/authentication';
import VerifyCode from './VerifyCode';

const Register = () => {
  // điều hướng trang
  const navigate = useNavigate();

  // báo lỗi
  const [error, setError] = useState(''); 
  
  // loading
  const dispatch = useDispatch();

  // xác minh email
  const [enableVerify,setEnableVerify] =useState(false);

  // đổi hình nền
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // danh sách hình nền
  const bgrImg = [
    'https://images5.alphacoders.com/641/thumb-1920-641999.jpg',
    'https://www.galeriemichael.com/wp-content/uploads/2025/03/anh-anime-tet_57.jpg',
    'https://images5.alphacoders.com/130/thumb-1920-1305612.jpeg',
    'https://images6.alphacoders.com/132/thumb-1920-1326045.jpeg',
    'https://images4.alphacoders.com/137/thumb-1920-1377211.jpg'
  ];

  // xử lý thay đổi hình nền
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % bgrImg.length
      );
    }, 60000);
    return () => clearInterval(interval);
  }, [bgrImg.length]);

  // xử lý tốc độ load ảnh 
  useEffect(() => {
    bgrImg.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // lấy giá trị
  const [values,setValues] = useState({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: ''
  });

  // gửi yêu cầu đăng ký
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    setError('');
    dispatch(setLoading(true));

    if (!values.password || values.password.length < 5) {
      setError("Mật khẩu phải có ít nhất 5 ký tự!");
      dispatch(setLoading(false));
      return;
    }
    
    if(values.password !== values.rePassword) {
      setError("Mật khẩu nhập lại không khớp!");
      return;
    }

    registerAPI(values)
    .then(res => {
      setEnableVerify(true);
      if(res?.code === 200) {}
    })
    .catch(err => {
      setError("Địa chỉ email không hợp lệ hoặc đã tồn tại!", err)
    })
    .finally(() => {
      dispatch(setLoading(false));
    })
    console.log("Value:", values);
  }, [dispatch, values]);

  // thay đổi giá trị
  const handleOnChange = useCallback((e) => {
    e.persist();
    setValues(values => ({
      ...values,
      [e.target.name]: e.target?.value
    }))
  });

  return (
    <div
      id='block_register'
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      <div
        id='register'
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: `url(${bgrImg[currentImageIndex]})`,
          backgroundSize: 'cover',
        }}
      >
        {!enableVerify && (
          <div id='register_block'>
            <p id='register-title'>đăng ký</p>
            <form 
              id='register_blk'
              onSubmit={onSubmit}
              autoComplete='off'
            >
              <div id='register_input-blk'>
                <label
                  htmlFor='userName'
                  className='label_register'
                >
                  Email
                </label>
                <input
                  type='email'
                  id='input_register'
                  autoComplete="off"
                  name="email"
                  value={values?.email}
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div id='register_input-blk'>
                <label
                  htmlFor='fullName'
                  className='label_register'
                >
                  Họ và tên
                </label>
                <input
                  type='text'
                  id='input_register'
                  autoComplete="off"
                  name="fullName"
                  value={values?.fullName}
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div id='register_input-blk'>
                <label
                  htmlFor='phoneNumber'
                  className='label_register'
                >
                  Số điện thoại
                </label>
                <input
                  type='text'
                  id='input_register'
                  autoComplete="off"
                  name="phoneNumber"
                  value={values?.phoneNumber}
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div id='register_input-blk'>
                <label
                  htmlFor='password'
                  className='label_register'
                >
                  Mật khẩu
                </label>
                <input
                  type='password'
                  id='input_register'
                  name="password"
                  value={values?.password}
                  autoComplete="new-password"
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div id='register_input-blk'>
                <label
                  htmlFor='rePassword'
                  className='label_register'
                >
                  Nhập lại mật khẩu
                </label>
                <input
                  type='password'
                  id='input_register'       
                  name="rePassword"
                  autoComplete="new-password"
                  value={values?.rePassword}
                  onChange={handleOnChange}
                  required
                />
              </div>
              {error && <div id="error_register">{error}</div>}
              <button id='register_btn'>
                Đăng ký
              </button>
            </form>
            <div id='back_signin'>
              <p id='back_signin-text'>Đã có tài khoản? <span><Link to={'/dang-nhap'} className='back_signin-textLink'>Đăng nhập ngay!</Link></span></p>
            </div>
          </div>
        )}
        {enableVerify && <VerifyCode email={values?.email}/>}
      </div>
    </div>
  )
}

export default Register;
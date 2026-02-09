import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import '../../css/user/profile.css';
import { fetchUserDetails } from '../../api/userInfo';
import { setLoading } from '../../store/features/common';
import { selectUserInfo, loadUserInfo } from '../../store/features/user';

const ProfilePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true))
    fetchUserDetails()
    .then(res => {
      dispatch(loadUserInfo(res));
      console.log("USER: ", res)
    })
    .catch((err) => {
      console.error("Lỗi: ", err)
    })
    .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);
  
  return (
    <div id='profile'>
      <div id='profile-tabs'>
        <Link className='tab-text' to='ho-so'>
          Hồ sơ
        </Link>
        <Link className='tab-text' to='dia-chi'>
          Địa chỉ
        </Link>
        <Link className='tab-text' to='don-hang'>
          Đơn hàng
        </Link>
        <Link className='tab-text' to='doi-mat-khau'>
          Đổi mật khẩu
        </Link>
      </div>
      <div id='profile-content'>
        <Outlet/>
      </div>
    </div>
  )
}

export default ProfilePage;
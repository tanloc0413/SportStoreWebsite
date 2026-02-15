import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import '../../css/user/profile.css';
import { fetchUserDetails } from '../../api/userInfo';
import { setLoading } from '../../store/features/common';
import { loadUserInfo, selectIsUserAdmin } from '../../store/features/user';
import AddAddress from './AddAddress';

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

  const isUserAdmin = useSelector(selectIsUserAdmin);
  

  const [addAddress, setAddAddress] = useState(false);

  return (
    <div id='profile'>
      <div id='profile-tabs'>
        <Link className='tab-text' to='ho-so'>
          Hồ sơ
        </Link>
        {!isUserAdmin &&
          <>
            <Link className='tab-text' to='dia-chi'>
              Địa chỉ
            </Link>
            <Link className='tab-text' to='don-hang'>
              Đơn hàng
            </Link>
          </>
        }
        <Link className='tab-text' to='doi-mat-khau'>
          Đổi mật khẩu
        </Link>
      </div>
      {addAddress && 
        <AddAddress onCancel={() => setAddAddress(false)}/>
      }
      <div id='profile-content'>
        {/* <Outlet/> */}
        <Outlet context={{ setAddAddress }}/>
      </div>
    </div>
  )
}

export default ProfilePage;
import React from 'react'

import '../../css/user/profile.css';
import AddressUpdate from'./AddressUpdate';
import EditProfile from'./EditProfile';

const ProfilePage = () => {
  return (
    <div id='profile'>
      <div id='profile-tabs'>
        <div className='tab-text'>
          Hồ sơ
        </div>
        <div className='tab-text'>
          Địa chỉ
        </div>
        <div className='tab-text'>
          Đổi mật khẩu
        </div>
      </div>
      <div id='profile-content'>
        <EditProfile/>
        {/* <AddressUpdate/> */}
        {/* <ChangePassword/> */}
      </div>
    </div>
  )
}

export default ProfilePage;
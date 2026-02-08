import React, { useState, useMemo } from 'react'

import '../../css/user/profile.css';
import AddressUpdate from './AddressUpdate';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';

const tabs = [
  { key: 'profile', label: 'Hồ sơ' },
  { key: 'address', label: 'Địa chỉ' },
  { key: 'password', label: 'Đổi mật khẩu' }
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const content = useMemo(() => {
    if (activeTab === 'address') {
      return <AddressUpdate />;
    }

    if (activeTab === 'password') {
      return <ChangePassword />;
    }

    return <EditProfile />;
  }, [activeTab]);

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
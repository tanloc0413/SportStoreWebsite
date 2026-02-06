import React from 'react';
import { IoMdTrash } from "react-icons/io";

import '../../css/user/profile.css';

const AddressUpdate = () =>  {

  return (  
    <div id='profile-address'>
      <p id='profile_address-title'>
        Địa chỉ
      </p>
      <div id='profile_address-blk'>
        <div className='profile_address-blk1'>
          <p className='address-text'>
            Hẻm 122, đường Nguyễn Thái Học, phường Tân Đông Hiệp, Dĩ An, Bình Dương
          </p>
        </div>
        <IoMdTrash className='profile_address-blk2'/>
      </div>
      <div id='profile_address-btn'>
        <button className='address-btn address-editBtn'>
          Thay đổi địa chỉ
        </button>
        <button className='address-btn address-createBtn'>
          Thêm địa chỉ mới
        </button>
      </div>
    </div>
  )
}

export default AddressUpdate;
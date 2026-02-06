import React from 'react';
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { SiKeepassxc } from "react-icons/si";

import '../../css/user/profile.css';

const ChangePassword = () =>  {

  return (  
    <div id='profile-changePassword'>
      <p className='changePassword-title'>
        Đổi mật khẩu
      </p>
      <form action="" className='changePassword-form' autoComplete="off">
        <div className='changePassword-blk'>
          <label 
            htmlFor="newPass"
            className='changePassword-text'
          >
            Mật khẩu mới:
          </label>
          <div className='changePassword-inputDiv'>
            <input
              type="text"
              name="reNewPass"
              className='changePassword-input'
              autoComplete="new-password"
              spellCheck={false}
            />
            <FaRegEye className='changePassword-icon'/>
          </div>
        </div>
        <div className='changePassword-blk changePassword-reNewPass'>
          <label 
            htmlFor="reNewPass"
            className='changePassword-text'
          >
            Nhập lại mật khẩu mới:
          </label>
          <div className='changePassword-inputDiv'>
            <input
              type="text"
              name="reNewPass"
              className='changePassword-input'
              autoComplete="new-password"
              spellCheck={false}
            />
            <FaRegEye className='changePassword-icon'/>
            {/* <FaEyeSlash className='changePassword-icon'/> */}

          </div>
        </div>
        <div id='changePassword-btnDiv'>
          <button className='changePassword-btn'>
            Cập nhật mật khẩu
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword;
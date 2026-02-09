import React, { useCallback, useState } from 'react';
import { IoMdTrash } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { MdEdit } from "react-icons/md";

import '../../css/user/profile.css';
import { removeAddress, selectUserInfo } from '../../store/features/user';
import { deleteAddressAPI } from '../../api/userInfo';
import { setLoading } from '../../store/features/common';


const AddressPage = () =>  {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [address, setAddress] = useState(false);

  const onDeleteAddress = useCallback((id) => {
    dispatch(setLoading(true));
    deleteAddressAPI(id)
    .then(res => {
      dispatch(removeAddress(id));
    })
    .catch(err => {
    })
    .finally(() => {
      dispatch(setLoading(false));
    })
  }, [dispatch]);

  return (  
    <div id='profile-address'>
      <p id='profile_address-title'>
        Địa chỉ
      </p>
      {userInfo?.addressList?.map((address) => (
        <>
          <div id='profile_address-blk'>
            <div className='profile_address-blk1'>
              <p className='address-text'>
                <span>Họ và tên: </span>{address?.fullName}
              </p>
              <p className='address-text'>
                <span>Số điện thoại: </span>{address?.phoneNumber}
              </p>
              <p className='address-text'>
                <span>Địa chỉ: </span>{address?.street}, {" "}
                {address?.commune ? `xã ${address.commune}` :  `phường ${address?.ward}`},{" "}
                {address?.cityOfProvince}
              </p>
            </div>
            <div className='profile_address-actionD'>
              <IoMdTrash className='profile_address-delete'/>
              <MdEdit className='profile_address-edit'/>
            </div>
          </div>
        </>
      ))}
      <div id='profile_address-btn'>
        <div className='address-btn address-createBtn'>
          Thêm địa chỉ mới
        </div>
      </div>
    </div>
  )
}

export default AddressPage;
import React, { useCallback, useState } from 'react';
import { IoMdTrash } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { MdEdit } from "react-icons/md";
import { useOutletContext } from 'react-router-dom';

import '../../css/user/profile.css';
import { removeAddress, selectUserInfo } from '../../store/features/user';
import { deleteAddressAPI } from '../../api/userInfo';
import { setLoading } from '../../store/features/common';
import AddAddress from '../UserPage/AddAddress';

const AddressPage = () =>  {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [addAddress, setAddAddress] = useState(false);

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
    <>
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
                <IoMdTrash
                  className='profile_address-delete'
                  onClick={() => onDeleteAddress(address?.id)}
                />
                <MdEdit className='profile_address-edit'/>
              </div>
            </div>
          </>
        ))}
        <div id='profile_address-btn'>
          {/* <button className='address-btn address-editBtn'>
            Thay đổi địa chỉ
          </button> */}
          <div 
            className='address-btn address-createBtn' 
            onClick={()=> setAddAddress(true)}
          >
            Thêm địa chỉ mới
          </div>
        </div>
      </div>
      {/* <AddAddress/> */}
      {addAddress && 
        <AddAddress onCancel={() => setAddAddress(false)}/>
      }
    </>
  )
}

export default AddressPage;
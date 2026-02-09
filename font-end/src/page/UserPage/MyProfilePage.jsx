import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';

import '../../css/user/profile.css';
import { selectUserInfo } from '../../store/features/user';

const MyProfilePage = () =>  {
    const userInfo = useSelector(selectUserInfo);


    return (  
        <>
            <div id='profile-user'>
                <div id='profile_avt'>
                    <div id='profile_avt-blk'>
                        <img 
                            src="https://images4.alphacoders.com/127/thumb-1920-1272717.png"
                            alt="avatar user"
                            id='profile_avt-img'
                        />
                    </div>
                    <button id='profile_avt-btn'>
                        <IoCameraOutline className='profile-edit'/>
                    </button>
                </div>
                <div id='profile_info'>
                    <div className='profile_info-item'>
                        <p className='info-text1'>
                            Họ và tên:
                        </p>
                        <p className='info-text2'>
                            {userInfo?.fullName}
                        </p>
                    </div>
                    <div className='profile_info-item'>
                        <p className='info-text1'>
                            Số điện thoại:
                        </p>
                        <p className='info-text2'>
                            {userInfo?.phoneNumber || 'Chưa có SĐT'}
                        </p>
                    </div>
                    <div className='profile_info-item info_noneBorder'>
                        <p className='info-text1'>
                            Email:
                        </p>
                        <p className='info-text2'>
                            {userInfo?.email}
                        </p>
                    </div>
                    <div className='profile_info-btn'>
                        <button className='info_btn'>
                            <MdEdit className='info_btn-icon'/>
                            <p className='info_btn-text'>
                                Chỉnh sửa hồ sơ
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfilePage;
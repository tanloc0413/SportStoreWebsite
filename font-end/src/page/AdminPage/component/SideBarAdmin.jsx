import React, { useState } from 'react';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { PiChartLineUpLight } from "react-icons/pi";
import { MdLockReset } from "react-icons/md";
import { FaChevronLeft, FaChevronDown } from "react-icons/fa6";
import { BiCategoryAlt } from "react-icons/bi";
import { LuUserCog } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { TbBrandAdobe } from "react-icons/tb";

import '../../../css/admin/sidebarAdmin.css';
import LogoImg from '../../../imgs/sport.png';
import { Link } from 'react-router-dom';

const SideBarAdmin = () => {

  return (
    <div className='sidebar'>
      <Link to="/" className='sidebar-link'>
        <img
          src={LogoImg}
          alt="logo"
          className='sidebar-img'
        />
      </Link>
      <ul className='sidebar_nav align-items-sm-start flex-column '>
        <li className='nav-items nav-active'>
          <div className='nav-iconDiv'>
            <PiChartLineUpLight className='nav-icon'/>
          </div>
          <p className='nav-text'>
            Thống kê
          </p>
        </li>
        <li className='nav-items'>
          <div className='nav-itemList'>
            <div className='nav-iconDiv'>
              <AiOutlineShoppingCart className='nav-icon nav-iconP'/>
            </div>
            <p className='nav-text'>
              Sản phẩm
            </p>
          </div>
        </li>
        <li className='nav-items'>
          <div className='nav-itemList'>
            <div className='nav-itemList'>
              <div className='nav-iconDiv'>
                <BiCategoryAlt className='nav-icon nav-iconO'/>
              </div>
              <p className='nav-text'>
                Thể loại sản phẩm
              </p>
            </div>
          </div>
        </li>
        <li className='nav-items'>
          <div className='nav-iconDiv'>
            <LuUserCog className='nav-icon nav-iconU'/>
          </div>
          <p className='nav-text'>
            Người dùng
          </p>
        </li>
        <li className='nav-items'>
          <div className='nav-iconDiv'>
            <TbTruckDelivery className='nav-icon nav-iconO'/>
          </div>
          <p className='nav-text'>
            Đơn hàng
          </p>
        </li>
        <li className='nav-items'>
          <div className='nav-iconDiv'>
            <TbBrandAdobe className='nav-icon'/>
          </div>
          <p className='nav-text'>
            Thương hiệu
          </p>
        </li>
        <li className='nav-items'>
          <MdLockReset className='nav-icon nav-iconPr'/>
          <p className='nav-text'>
            Đổi mật khẩu
          </p>
        </li>
      </ul>

    </div>
  )
}

export default SideBarAdmin;
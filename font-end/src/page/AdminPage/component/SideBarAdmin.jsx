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
import { Link, NavLink } from 'react-router-dom';

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
        <li>
          <NavLink 
            className={({isActive}) => isActive ? 'nav-activeA nav-items' : 'nav-items'} 
            to={'/admin/thong-ke'}
          >
            <div className='nav-iconDiv'>
              <PiChartLineUpLight className='nav-icon'/>
            </div>
            <p className='nav-text'>
              Thống kê
            </p>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({isActive}) => isActive ? 'nav-activeA nav-items' : 'nav-items'} 
            to={'/admin/quan-ly-san-pham'}
          >
            <div className='nav-itemList'>
              <div className='nav-iconDiv'>
                <AiOutlineShoppingCart className='nav-icon nav-iconP'/>
              </div>
              <p className='nav-text'>
                Sản phẩm
              </p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink 
            className={({isActive})=> isActive ? 'nav-activeA nav-items' : 'nav-items'} 
            to={'/admin/quan-ly-the-loai'}
          >
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
          </NavLink>
        </li>
        <li>
          <NavLink 
            className={({isActive})=> isActive ? 'nav-activeA nav-items' : 'nav-items'} 
            to={'/admin/quan-ly-nguoi-dung'}
          >
            <div className='nav-iconDiv'>
              <LuUserCog className='nav-icon nav-iconU'/>
            </div>
            <p className='nav-text'>
              Người dùng
            </p>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({isActive})=> isActive ? 'nav-activeA nav-items' : 'nav-items'} 
            to={'/admin/quan-ly-don-hang'}
          >
            <div className='nav-iconDiv'>
              <TbTruckDelivery className='nav-icon nav-iconO'/>
            </div>
            <p className='nav-text'>
              Đơn hàng
            </p>
          </NavLink>
        </li>
        <li>
          <NavLink 
            className={({isActive})=> isActive ? 'nav-activeA nav-items' : 'nav-items'} 
            to={'/admin/thuong-hieu'}
          >
            <div className='nav-iconDiv'>
              <TbBrandAdobe className='nav-icon'/>
            </div>
            <p className='nav-text'>
              Thương hiệu
            </p>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({isActive})=> isActive ? 'nav-activeA nav-items' : 'nav-items'} 
            to={'/admin/doi-mat-khau'}
          >
            <MdLockReset className='nav-icon nav-iconPr'/>
            <p className='nav-text'>
              Đổi mật khẩu
            </p>
          </NavLink>
        </li>
      </ul>

    </div>
  )
}

export default SideBarAdmin;
import React, { ChangeEvent, useEffect, useState } from 'react';
import { IoMdSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineBell } from "react-icons/ai";
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

// files
import '../../css/user/header.css';
import LogoIcon from '../../imgs/sport.png';

const Header = () => {
  return (
    <header id='header'>
      <div id='blk_header1'>
        <a 
          id='blk_logoHeader' 
          href='/'
        >
          <img id='header_logo-img' src={LogoIcon} alt="Logo Ảnh"/>
        </a>
        <div id='blk_search'>
          <input
            type='search'
            placeholder='Tìm kiếm'
            id='input-search'
            // onChange={onSearchInputChange}
            // value={tprKeyword}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            // onKeyDown={onSearchKeyPress}
          />
          <div id='blk_search-icon'>
            <button id='search'
              // onClick={handleSearch}
            >
              <IoMdSearch className='search-icon'/>
            </button>
          </div>
          {/* {showSearchResults && searchResults.length > 0 && (
            <div id='blk_listSearch'>
              <ul 
                id='list_search-result' 
                className={searchResults.length >= 3 ? 'scrollable' : ''}
              >
                {searchResults.map((item, index) => (
                  <li key={index} id='item_search-result'>
                    <a id='item_search' href={`/san-pham/${item.productId}`}>
                      <img
                        src="https://nettruyen1905.com/uploads/covers/tearmoon-empire-story.jpg?1743287376"
                        alt="anh"
                        id='img_search'
                        onClick={() => setShowSearchResults(false)}
                      />
                      <div id="b_title-search">
                        <p id='title_search-product' className='text_search'>
                          {item.productName}
                        </p>
                        <p 
                          id='price_search-product' 
                          className='text_search'
                          style={{ color: item.price ? '#c92127' : 'black' }}
                        >
                          {formatCurrency(item.price ?? item.originalPrice ?? 0)}
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>        
          )} */}
        </div>
        <div id='blk_user'>
          <div className='notification blk_user-icon'>
            <AiOutlineBell className='notification-icon user-icon'/>
            <p className='notification-text title_text-icons'>Thông Báo</p>
          </div>
          <Link to='/gio-hang'>
            <div className='cart blk_user-icon'>
              <IoCartOutline className='cart-icon user-icon'/>
              <p className='cart-text title_text-icons'>Giỏ Hàng</p>
              <div className='header_addQuantity-cart'>
                <p className='addQuantity-cart'>0</p>
              </div>
            </div>
          </Link>
          {/* <div className='account blk_user-icon'>
            <FaRegUser className='account-icon user-icon'/>
            <p className='account-text title_text-icons'>Tài Khoản</p>
          </div> */}
          {/* 
            // <div id='block_header-account'>
            <Link to='/dang-ky' className='button_signup'>
              Đăng Ký
            </Link> 
          </div> */}
          <Link to='/dang-nhap' className='button_login'>
            Đăng Nhập
          </Link>
          {/* {!isLoggedIn ? (
            <Link to='/dang-nhap' className='button_login'>
              Đăng Nhập
            </Link>
          ) : (
            <div className='block_header-user'>
              <div className='account blk_user-icon' onClick={handleShowLogout}>
                <FaRegUser className='account-icon user-icon' />
                <p className='account-text title_text-icons'>Tài Khoản</p>
              </div>
              {showLogout && (
                <div id='block_header-account'>
                  <a href="/tai-khoan">
                    <button
                      className='logout-button'
                    >
                      Tài Khoản
                    </button>
                  </a>
                  <hr className='line_blk-user'/>
                  <a href="/sach-yeu-thich">
                    <button
                      className='logout-button'
                      // onClick={}
                    >
                      Yêu Thích
                    </button>
                  </a>
                  <hr className='line_blk-user'/>
                  <button
                    onClick={handleLogout}
                    className='logout-button'
                  >
                    Đăng Xuất
                  </button>
                </div>
              )}
            </div>
          )} */}
        </div>
      </div>
      <div id='blk_header2'>
        <div className='navDiv'>
          <Nav>
            <Nav.Link href="/">
              <i className="fa-solid fa-house house-icon nav-link-home"></i>
            </Nav.Link>
            <Nav.Link as={Link} to="/san-pham" className='nav_link-textH'>
              Đồ Thể Thao
            </Nav.Link>
            <Nav.Link as={Link} to="the-loai/nam" className='nav_link-textH'>
              Nam
            </Nav.Link>
            <Nav.Link as={Link} to="/the-loai/nu" className='nav_link-textH'>
              Nữ
            </Nav.Link>
            <Nav.Link as={Link} to="the-loai/phu-kien" className='nav_link-textH'>
              Phụ Kiện
            </Nav.Link>
            <Nav.Link as={Link} to="/thuong-hieu" className='nav_link-textH'>
              Thương Hiệu
            </Nav.Link>
          </Nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
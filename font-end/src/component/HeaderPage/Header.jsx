import { useState } from 'react';
import { IoMdSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineBell } from "react-icons/ai";
import Nav from 'react-bootstrap/Nav';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// files
import '../../css/user/header.css';
import LogoIcon from '../../imgs/sport.png';
import { countCartItems } from '../../store/features/cart';
import { logOut } from '../../util/jwt-helper';
import { loadUserInfo, selectIsUserAdmin, selectUserInfo } from '../../store/features/user';
import { useEffect } from 'react';
import { searchProductsAPI } from '../../api/fetchProducts';
import { formatMoney } from '../../component/FormatMoney/formatMoney';
import { API_BASE_URL } from '../../api/constant';
import { fetchUserDetails } from '../../api/userInfo';

const Header = ({variant="default"}) => {
  const [showLogout,setShowLogout] = useState(false);

  const cartLength = useSelector(countCartItems);

  const navigate = useNavigate();

  const location = useLocation();

  const userInfo = useSelector(selectUserInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserDetails()
    .then(res => {
      dispatch(loadUserInfo(res));
    })
    .catch((err) => {
      console.error("Lỗi: ", err)
    })
  }, []);

  const isUserAdmin = useSelector(selectIsUserAdmin);

  // tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleLogout = () => {
    logOut();
    setShowLogout(false);
    navigate("/");
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim() !== '') {
        const results = await searchProductsAPI(searchTerm);
        setSearchResults(results);
        setShowSearchResults(true);
      } else {
        setSearchResults([]);
        setShowSearchResults(false);
      }
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <header id='header'>
      <div id='blk_header1'>
        <Link 
          id='blk_logoHeader' 
          to='/'
        >
          <img id='header_logo-img' src={LogoIcon} alt="Logo Ảnh"/>
        </Link>
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => { if(searchResults.length > 0) setShowSearchResults(true); }}
          />
          <div id='blk_search-icon'>
            <button id='search'
              // onClick={handleSearch}
            >
              <IoMdSearch className='search-icon'/>
            </button>
          </div>
          {showSearchResults && searchResults.length > 0 && (
            <div id='blk_listSearch'>
              <ul 
                id='list_search-result' 
                className={searchResults.length >= 3 ? 'scrollable' : ''}
              >
                {searchResults.map((item, index) => {
                  const imgUrl = item.productImage && item.productImage.length > 0 
                  ? (item.productImage[0].url.startsWith("http") ? item.productImage[0].url : API_BASE_URL + item.productImage[0].url)
                  : "https://supersports.com.vn/cdn/shop/files/FD6574-109-1.jpg?v=1769424848&width=1000";
                
                  return(
                    <li key={index} id='item_search-result'>
                      <Link id='item_search' to={`/chi-tiet-san-pham/${item?.slug}`}>
                        <img
                          src={imgUrl}
                          alt={`Ảnh ${item?.name}`}
                          id='img_search'
                          onClick={() => setShowSearchResults(false)}
                        />
                        <div id="b_title-search">
                          <p id='title_search-product' className='text_search'>
                            {item?.name}
                          </p>
                          <p 
                            id='price_search-product' 
                            className='text_search'
                            style={{ color: item.price ? '#c92127' : 'black' }}
                          >
                            {/* {formatCurrency(item.price ?? item.originalPrice ?? 0)} */}
                            {formatMoney(item?.price)}
                          </p>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>        
          )}
        </div>
        <div id='blk_user'>
          {/* <div className='notification blk_user-icon'>
            <AiOutlineBell className='notification-icon user-icon'/>
            <p className='notification-text title_text-icons'>Thông Báo</p>
          </div> */}
          <Link to='/gio-hang'>
            <div className='cart blk_user-icon'>
              <IoCartOutline className='cart-icon user-icon'/>
              <p className='cart-text title_text-icons'>Giỏ Hàng</p>
              {cartLength > 0 && 
                <div className='header_addQuantity-cart'>
                  <p className='addQuantity-cart'>{cartLength}</p>
                </div>
              }
            </div>
          </Link>
          {variant === "default" && (
            <Link 
              to='/dang-nhap' 
              className={`button_loginH ${
                location.pathname === "/dang-nhap" ? "activeHeader" : ""
              }`}
            >
              Đăng Nhập
            </Link>
            )
          }
          {variant === "auth" && (
            <div className='block_header-user'>
              <div 
                className='account blk_user-icon' 
                onClick={() => setShowLogout(prev => !prev)}
              >
                <FaRegUser className='account-icon user-icon' />
                <p className='account-text title_text-icons'>Tài Khoản</p>
              </div>
              {showLogout && (
                <div id='block_header-account'>
                  <Link to="/tai-khoan/ho-so">
                    <div
                      className='logout-button'
                    >
                      Tài Khoản
                    </div>
                  </Link>
                  <hr className='line_blk-user'/>
                  {isUserAdmin &&
                    <>
                      <Link to="/admin/thong-ke">
                        <div
                          className='logout-button'
                        >
                          Admin
                        </div>
                      </Link>
                      <hr className='line_blk-user'/>
                    </>
                  }
                  <Link to="/san-pham-yeu-thich">
                    <div
                      className='logout-button'
                    >
                      Yêu Thích
                    </div>
                  </Link>
                  <hr className='line_blk-user'/>
                  <div
                    onClick={handleLogout}
                    className='logout-button'
                  >
                    Đăng Xuất
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div id='blk_header2'>
        <div className='navDivH'>
          <Nav className='navDivHeader'>
            <Nav.Link href="/">
              <i className="fa-solid fa-house house-icon nav-link-home"></i>
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/san-pham" className='nav_link-textH'>
              Đồ Thể Thao
            </Nav.Link> */}
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
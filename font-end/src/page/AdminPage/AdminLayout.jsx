import React from 'react';

import '../../css/admin/adminPage.css';
import SideBar from './component/SideBarAdmin';
import HeaderAdmin from './component/HeaderAdmin';

// product
// import AddProductAdmin from '../AdminProductPage/AddProductAdmin';
// import ListProductAdmin from '../AdminProductPage/ListProductAdmin';
// import ListUserAdmin from '../AdminUserPage/ListUserAdmin';
// import ListBrandAdmin from '../AdminBrandPage/ListBrandAdmin';
// import ListCategoryAdmin from '../AdminCategoryPage/ListCategoryAdmin';
// import ResetPasswordAdmin from '../AdminChangePassword/ResetPasswordAdmin';
// import ListUserAdmin from '../AdminUserPage/ListUserAdmin';
// import ListOrderAdmin from '../AdminOrderPage/ListOrderAdmin';


const AdminLayout = () => {
  

  return (
    <div className="admin">
      <SideBar/>
      <div className="admin_main">
        <HeaderAdmin />
        <div className="admin_content">
          {/* <AddProductAdmin/> */}
          {/* <ListProductAdmin/> */}
          {/* <ListUserAdmin/> */}
          {/* <ListCategoryAdmin/> */}
          {/* <ListUserAdmin/> */}
          {/* <ListBrandAdmin/> */}
          {/* <ListOrderAdmin/> */}
          {/* <ResetPasswordAdmin/> */}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout;
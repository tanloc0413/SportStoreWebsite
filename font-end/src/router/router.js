import { createBrowserRouter } from "react-router-dom";

import App from '../App';
import { loadProductBySlug } from "./productSlug";
import RouterPage from '../router/RouterPage';
import CartPage from '../page/CartPage/CartPage';
import LoginPage from '../page/LoginPage/Login';
import BrandPage from "../page/BrandPage/BrandPage";
import ProductDetail from '../page/ProductDetailPage/ProductDetail';
import RegisterPage from '../page/RegisterPage/Register';
import ProductListPage from '../page/ProductListPage/ProductListPage';
import GoogleLogin from "../page/LoginPage/GoogleLogin";
import OrderPage from '../page/OrderPage/OrderPage';
import ProtectedRouter from '../component/ProtectedRouter/ProtectedRouter';
import ProfilePage from "../page/UserPage/ProfilePage";
import AddressPage from '../page/UserPage/AddressPage';
import ConfirmOrder from '../page/OrderPage/ConfirmOrder';
import ChangePassword from "../page/UserPage/ChangePassword";
import OrderListPage from "../page/UserPage/OrderListPage";
import MyProfilePage from '../page/UserPage/MyProfilePage';
import AdminLayout from '../page/AdminPage/AdminLayout';
import ListProductAdmin from '../page/AdminPage/AdminProductPage/ListProductAdmin';
import AdminDashboard from '../page/AdminPage/AdminDashboard/AdminDashboard';
import ListCategoryAdmin from '../page/AdminPage/AdminCategoryPage/ListCategoryAdmin';
import ListUserAdmin from '../page/AdminPage/AdminUserPage/ListUserAdmin';
import ListBrandAdmin from '../page/AdminPage/AdminBrandPage/ListBrandAdmin';
import ListOrderAdmin from '../page/AdminPage/AdminOrderPage/ListOrderAdmin';
import ResetPasswordAdmin from '../page/AdminPage/AdminChangePassword/ResetPasswordAdmin';
import AddProductAdmin from '../page/AdminPage/AdminProductPage/AddProductAdmin';
import AddCategoryAdmin from "../page/AdminPage/AdminCategoryPage/AddCategoryAdmin";
import ForgotPassword from '../page/ForgotPassword/ForgotPassword';
import EditProductAdmin from "../page/AdminPage/AdminProductPage/EditProductAdmin";
import AddBrandAdmin from "../page/AdminPage/AdminBrandPage/AddBrandAdmin";

export const router = createBrowserRouter ([
    {
        path: '/',
        element: <RouterPage/>,
        children: [
            {
                path: '/',
                element: <App/>
            },
            {   path: '/the-loai/nu',
                element: <ProductListPage categoryType={'nu'}/>
            },
            {   path: '/the-loai/nam',
                element: <ProductListPage categoryType={'nam'}/>
            },
            {   path: '/the-loai/tre-em',
                element: <ProductListPage categoryType={'tre-em'}/>
            },
            {   path: '/the-loai/phu-kien',
                element: <ProductListPage categoryType={'phu-kien'}/>
            },
            // {   path: '/the-loai/do-choi',
            //     element: <ProductListPage/>
            // },
            {
                path: '/chi-tiet-san-pham/:slug',
                loader: loadProductBySlug,
                element: <ProductDetail/>
            },
            {
                path: '/gio-hang',
                element: <CartPage/>
            },
            {
                path: '/quen-mat-khau',
                element: <ForgotPassword/>
            },
            {
                path: '/dang-nhap',
                element: <LoginPage/>
            },  
            {   
                path: '/dang-ky',
                element: <RegisterPage/>,
            },
            {   
                path: '/thuong-hieu',
                element: <BrandPage/>,
            },
            {
                path: '/oauth2/callback',
                element: <GoogleLogin/>
            },
            {
                path: '/thanh-toan',
                element: <ProtectedRouter><OrderPage/></ProtectedRouter>
            },
            {
                path: '/xac-nhan-don-hang',
                element: <ProtectedRouter><ConfirmOrder/></ProtectedRouter>
            },
            {
                path: '/tai-khoan/',
                element: <ProtectedRouter><ProfilePage/></ProtectedRouter>,
                children: [
                    {
                        path: 'ho-so',
                        index: true,
                        element: <MyProfilePage/>
                    },
                    {
                        path: 'dia-chi',
                        element: <AddressPage/>
                    },
                    {
                        path: 'doi-mat-khau',
                        element: <ChangePassword/>
                    },
                    {
                        path: 'don-hang',
                        element: <OrderListPage/>
                    },
                ]
            },
        ]
    },
    {
        path: '/admin/',
        element: <ProtectedRouter><AdminLayout/></ProtectedRouter>,
        children: [
            {
                path: 'thong-ke',
                index: true,
                element: <AdminDashboard/>
            },
            {
                path: 'quan-ly-san-pham',
                element: <ListProductAdmin/>
            },
            {
                path: 'quan-ly-the-loai',
                element: <ListCategoryAdmin/>
            },
            {
                path: 'quan-ly-nguoi-dung',
                element: <ListUserAdmin/>
            },
            {
                path: 'quan-ly-thuong-hieu',
                element: <ListBrandAdmin/>
            },
            {
                path: 'quan-ly-don-hang',
                element: <ListOrderAdmin/>
            },
            {
                path: 'doi-mat-khau',
                element: <ResetPasswordAdmin/>
            },
            {
                path: 'quan-ly-san-pham/them',
                element: <AddProductAdmin/>
            },
            {
                path: 'quan-ly-the-loai/them',
                element: <AddCategoryAdmin/>
            },
            {
                path: 'quan-ly-san-pham/sua/:id',
                element: <EditProductAdmin/>
            },
            {
                path: 'thuong-hieu/them',
                element: <AddBrandAdmin/>
            },
        ]
    },
]);
import { createBrowserRouter } from "react-router-dom";

import App from '../App';
import RouterPage from '../router/RouterPage';
import CartPage from '../page/CartPage/CartPage';
import LoginPage from '../page/LoginPage/Login';
import ProductDetail from '../page/ProductDetailPage/ProductDetail';
import RegisterPage from '../page/RegisterPage/Register';
import ProductListPage from '../page/ProductListPage/ProductListPage';
import GoogleLogin from "../page/LoginPage/GoogleLogin";
import OrderPage from '../page/OrderPage/OrderPage';
import { loadProductBySlug } from "./productSlug";
import ProtectedRouter from '../component/ProtectedRouter/ProtectedRouter';
import ProfilePage from "../page/UserPage/ProfilePage";
import AddressPage from '../page/UserPage/AddressPage';
import ConfirmOrder from '../page/OrderPage/ConfirmOrder';
import ChangePassword from "../page/UserPage/ChangePassword";
import OrderListPage from "../page/UserPage/OrderListPage";
import MyProfilePage from '../page/UserPage/MyProfilePage';
import AdminLayout from '../page/AdminPage/AdminLayout';
import ListProductAdmin from '../page/AdminPage/AdminProductPage/ListProductAdmin';

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
                element: <ProductListPage/>
            },
            {   path: '/the-loai/phu-kien',
                element: <ProductListPage/>
            },
            {   path: '/the-loai/do-choi',
                element: <ProductListPage/>
            },
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
                path: '/dang-nhap',
                element: <LoginPage/>
            },  
            {   
                path: '/dang-ky',
                element: <RegisterPage/>,
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
        path: '/admin/*',
        element: <ProtectedRouter><AdminLayout/></ProtectedRouter>,
        children: [
            {
                path: 'quan-ly-san-pham',
                element: <ListProductAdmin/>
            },
            // {
            //     path: '/admin/dashboard',
            //     element: <AdminDashboard/>
            // },
            // {
            //     path: '/admin/products',
            //     element: <ListProductAdmin/>
            // },
            // {
            //     path: '/admin/products/add',
            //     element: <AddProductAdmin/>
            // },
            // {
            //     path: '/admin/brands',
            //     element: <ListBrandAdmin/>
            // },
            // {
            //     path: '/admin/categories',
            //     element: <ListCategoryAdmin/>
            // },
            // {
            //     path: '/admin/users',
            //     element: <ListUserAdmin/>
            // },
            // {
            //     path: '/admin/orders',
            //     element: <ListOrderAdmin/>
            // },
            // {
            //     path: '/admin/password',
            //     element: <ResetPasswordAdmin/>
            // }
        ]
    }
]);
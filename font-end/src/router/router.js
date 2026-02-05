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
                element: <OrderPage/>
            }
        ]
    },
    // {
    //     path: '/admin',
    //     element: <AdminLayout/>,
    //     children: [
    //         {
    //             path: '/admin',
    //             element: <AdminDashboard/>
    //         },
    //         {
    //             path: '/admin/dashboard',
    //             element: <AdminDashboard/>
    //         },
    //         {
    //             path: '/admin/products',
    //             element: <ListProductAdmin/>
    //         },
    //         {
    //             path: '/admin/products/add',
    //             element: <AddProductAdmin/>
    //         },
    //         {
    //             path: '/admin/brands',
    //             element: <ListBrandAdmin/>
    //         },
    //         {
    //             path: '/admin/categories',
    //             element: <ListCategoryAdmin/>
    //         },
    //         {
    //             path: '/admin/users',
    //             element: <ListUserAdmin/>
    //         },
    //         {
    //             path: '/admin/orders',
    //             element: <ListOrderAdmin/>
    //         },
    //         {
    //             path: '/admin/password',
    //             element: <ResetPasswordAdmin/>
    //         }
    //     ]
    // }
]);
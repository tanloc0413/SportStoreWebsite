import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import HeaderPage from '../component/HeaderPage/Header';
import FooterPage from '../component/FooterPage/Footer';
import { isTokenValid } from '../util/jwt-helper';

const RouterPage = () => {
    const isLoggedIn = isTokenValid();
    const location = useLocation();

    const hideFooterRoutes = ["/dang-nhap", "/dang-ky"];
    const shouldHideFooter = hideFooterRoutes.includes(location.pathname);
    const isLoading = useSelector((state) => state?.commonState?.loading);



    return (
        <>
            <HeaderPage variant={isLoggedIn ? "auth" : "default"} />
            <Outlet/>
            <FooterPage/>
        </>
    )
}

export default RouterPage;
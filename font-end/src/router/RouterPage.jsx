import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CircularProgress, Box } from '@mui/material';

import HeaderPage from '../component/HeaderPage/Header';
import FooterPage from '../component/FooterPage/Footer';

const RouterPage = () => {
    const isLoading = useSelector((state) => state?.commonState?.loading);

    return (
        <>
            <HeaderPage variant="auth"/>
            <Outlet/>
            <FooterPage/>
        </>
    )
}

export default RouterPage;
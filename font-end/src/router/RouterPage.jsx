import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { isTokenValid } from '../util/jwt-helper';
import HeaderPage from '../component/HeaderPage/Header';
import FooterPage from '../component/FooterPage/Footer';

const RouterPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid());

    useEffect(() => {
        const syncAuthState = () => setIsLoggedIn(isTokenValid());

        window.addEventListener('auth-changed', syncAuthState);
        window.addEventListener('storage', syncAuthState);

        return () => {
            window.removeEventListener('auth-changed', syncAuthState);
            window.removeEventListener('storage', syncAuthState);
        }
    }, []);


    return (
        <>  
            <HeaderPage 
                variant={isLoggedIn ? "auth" : "default"}
            />
            <Outlet/>
            <FooterPage/>
        </>
    )
}

export default RouterPage;
import React, { useState } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { FaRegEye, FaRegEyeSlash  } from "react-icons/fa";

import '../../../css/admin/adminRestPass.css';

const ResetPasswordAdmin = () => {
    const[showPassword, setShowPassword] = useState(false);

    return (
        <div className='rpa'>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Admin
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                >
                    Mật khẩu
                </Link>
                <Typography sx={{ color: 'text.primary' }}>
                    Đổi mật khẩu
                </Typography>
            </Breadcrumbs>
            <div className='rpaDiv'>
                <div className='rpaDiv_blk'>
                    <p className='rpaDiv_blk-title'>
                        Đổi mật khẩu mới
                    </p>
                    <form className='rpaDiv_blk-form' autoComplete="off">
                        <p className='rpaDiv_blk-text'>
                            Mật khẩu mới
                        </p>
                        <div className='rpaDiv_blk-password'>
                            <input 
                                type={showPassword ? "text" : "password"}
                                className='rpaDiv_blk-input'
                                placeholder='Nhập mật khẩu mới'
                                autoComplete='off'
                                autoSave='off'
                            />
                            {showPassword ? (
                                <FaRegEyeSlash
                                    className='rpaDiv_blk-icon'
                                    onClick={() => setShowPassword(false)}
                                />
                            ) : (
                                <FaRegEye
                                    className='rpaDiv_blk-icon'
                                    onClick={() => setShowPassword(true)}
                                />
                            )}
                        </div>
                        <button className='rpaDiv_blk-btn'>
                            Đổi mật khẩu
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordAdmin;
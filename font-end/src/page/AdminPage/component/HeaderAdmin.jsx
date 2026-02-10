import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { MdOutlineAccountBox } from "react-icons/md";
import { TbLogout } from "react-icons/tb";

import '../../../css/admin/headerAdmin.css';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../../util/jwt-helper';

const HeaderAdmin = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // đăng xuất
    const handleLogout = () => {
        logOut();
        // setShowLogout(false);
        navigate("/");
    };

    return (
        <header className='header_admin'>
            <div className='header_admin1'>
                <p className='header_admin1-title'>
                    Admin Sport Dashboard
                </p>
            </div>
            <div className='header_admin2'>
                <input
                    type="text" 
                    className='header_admin-input'
                    placeholder='Tìm kiếm'
                />
                <SearchIcon className='header_admin-icon'/>
            </div>
            <div className='header_admin3'>
                <p className='admin-nameAvt'>
                    Admin
                </p>
                <Tooltip title="">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar 
                            sx={{ width: 45, height: 45 }} 
                            src='https://preview.redd.it/i-made-an-uta-drawing-please-rate-it-thanks-v0-0wjp3ymbu4eb1.jpg?width=640&crop=smart&auto=webp&s=6b5c98121cbf456478f50ef22992672f7de3bb22'
                            alt='Admin'
                        >
                            M
                        </Avatar>
                    </IconButton>
                </Tooltip>

                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                        paper: {
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                > 
                    <MenuItem onClick={handleClose}>
                        <MdOutlineAccountBox className='header_menu-icon'/>
                        Tài khoản của tôi
                    </MenuItem>
                    <Divider style={{backgroundColor: "#979797"}}/>
                    <MenuItem onClick={() => {
                        handleClose();
                        handleLogout();
                    }}>
                        <TbLogout className='header_menu-icon'/>
                        Đăng xuất
                    </MenuItem>
                    {/* <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </MenuItem> */}
                </Menu>
            </div>
        </header>
    )
}

export default HeaderAdmin;
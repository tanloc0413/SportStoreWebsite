import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { IoClose } from "react-icons/io5";
import SearchIcon from '@mui/icons-material/Search';

import '../../../css/admin/adminList.css';

const ListBrandAdmin = () => {
    

    return (
        <>
            <div className='lba'>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Admin
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/material-ui/getting-started/installation/"
                    >
                        Thương hiệu
                    </Link>
                    <Typography sx={{ color: 'text.primary' }}>
                        Danh sách thương hiệu
                    </Typography>
                </Breadcrumbs>
                <div className='lbaDiv1'>
                    <div className='lbaDiv1_search'>
                        <input 
                            type="text"
                            className='lbaDiv1_search-input'
                            placeholder='Tìm kiếm'
                        />
                        <SearchIcon className='lbaDiv1_search-icon'/>
                    </div>
                    <div className='lbaDiv1_add'>
                        <button className='lbaDiv1_btn-add'>
                            Thêm thương hiệu mới
                        </button>
                    </div>
                </div>
                <div className='lbaDiv2'>
                    <div className='lbaGrid'>
                        <div className='lbaDiv_card'>
                            <img 
                                src="https://static.vecteezy.com/system/resources/thumbnails/019/956/196/small/nike-transparent-nike-free-free-png.png"
                                alt="Logo thương hiệu"
                                className='lbaDiv_card-img'
                            />
                            <IoClose
                                className='lbaDiv_card-icon'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='lbaDiv_notifiBlk'>
                <div className='lbaDiv_notifi'>
                    <p className='lbaDiv_notifi-text'>
                        Xác nhận xóa thương hiệu?
                    </p>
                    <div className='lbaDiv_notifi-btnGr'>
                        <button className='lbaDiv_notifi-btn1'>
                            Xác nhận
                        </button>
                        <button className='lbaDiv_notifi-btn2'>
                            Hủy bỏ
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListBrandAdmin;
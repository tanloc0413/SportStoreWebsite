import React from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import SearchIcon from '@mui/icons-material/Search';
import { MdEdit, MdDelete } from "react-icons/md";
import { TbLockOpen } from "react-icons/tb";

import '../../../css/admin/adminList.css';

const ListUserAdmin: React.FC = () => {


    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Admin
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                >
                    Người dùng
                </Link>
                <Typography sx={{ color: 'text.primary' }}>
                    Danh sách người dùng
                </Typography>
            </Breadcrumbs>
            <div className='lua'>
                <div className='luaDiv1'>
                    <div className='luaDiv1_search'>
                        <input 
                            type="text"
                            className='luaDiv1_search-input'
                            placeholder='Tìm kiếm'
                        />
                        <SearchIcon className='luaDiv1_search-icon'/>
                    </div>
                    {/* <div className='luaDiv1_add'>
                        <button className='luaDiv1_btn-add'>
                            Thêm thể loại
                        </button>
                    </div> */}
                </div>
                <div className='luaDiv2'>
                    <table className='luaDiv2_table table-striped table'>
                        <thead>
                            <tr className='luaDiv2_tr1'>
                                <th scope="col" className='luaDiv2_th luaDiv2_th1'>
                                    ID
                                </th>
                                <th scope="col" className='luaDiv2_th luaDiv2_th2'>
                                    Họ và tên
                                </th>
                                <th scope="col" className='luaDiv2_th'>
                                    Số điện thoại
                                </th>
                                <th scope="col" className='luaDiv2_th'>
                                    Email
                                </th>
                                <th scope="col" className='luaDiv2_th luaDiv2_th5'>
                                    Giới tính
                                </th>
                                <th scope="col" className='luaDiv2_th luaDiv2_th6'>
                                    Role
                                </th>
                                <th scope="col" className='luaDiv2_th luaDiv2_th7'>
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='luaDiv2_tr2'>
                                <td className='luaDiv2_td luaDiv2_td1'>
                                    1
                                </td>
                                <td className='luaDiv2_td luaDiv2_td2'>
                                    Trần Tấn Lộc
                                </td>
                                <td className='luaDiv2_td'>
                                    0379383465
                                </td>
                                <td className='luaDiv2_td'>
                                    cavoibien9888@gmail.com
                                </td>
                                <td className='luaDiv2_td luaDiv2_td5'>
                                    Nam
                                </td>
                                <td className='luaDiv2_td luaDiv2_td6'>
                                    User
                                </td>
                                <td className='luaDiv2_td luaDiv2_td7'>
                                    <button className='luaDiv2_btn luaDiv2_btn1'>
                                        <TbLockOpen className='luaDiv2_btn-block'/>
                                    </button>
                                    <button className='luaDiv2_btn luaDiv2_btn2'>
                                        <MdEdit className='luaDiv2_btn-edit'/>
                                    </button>
                                    <button className='luaDiv2_btn'>
                                        <MdDelete className='luaDiv2_btn-delete'/>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            

        </Box>
    )
}

export default ListUserAdmin;
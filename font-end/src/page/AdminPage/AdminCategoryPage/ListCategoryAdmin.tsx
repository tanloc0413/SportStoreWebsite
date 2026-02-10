import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import SearchIcon from '@mui/icons-material/Search';
import { MdEdit, MdDelete } from "react-icons/md";

import '../../../css/admin/adminList.css';

const ListCategoryAdmin = () => {
    return (
        <div className='lca'>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Admin
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                >
                    Thể loại
                </Link>
                <Typography sx={{ color: 'text.primary' }}>
                    Danh sách thể loại
                </Typography>
            </Breadcrumbs>
            <div className='lcaDiv'>
                <div className='lcaDiv1'>
                    <div className='lcaDiv1_search'>
                        <input 
                            type="text"
                            className='lcaDiv1_search-input'
                            placeholder='Tìm kiếm'
                        />
                        <SearchIcon className='lcaDiv1_search-icon'/>
                    </div>
                    <div className='lcaDiv1_add'>
                        <button className='lcaDiv1_btn-add'>
                            Thêm thể loại
                        </button>
                    </div>
                </div>
                <div className='lcaDiv2'>
                    <table className='lcaDiv2_table table-striped table'>
                        <thead>
                            <tr className='lcaDiv2_tr'>
                                <th scope="col" className='lcaDiv2_th1 lcaDiv2_th'>
                                    ID
                                </th>
                                <th scope="col" className='lcaDiv2_th2 lcaDiv2_th'>
                                    Tên thể loại
                                </th>
                                <th scope="col" className='lcaDiv2_th3 lcaDiv2_th'>
                                    Mã Tag
                                </th>
                                <th scope="col" className='lcaDiv2_th4 lcaDiv2_th'>
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='lcaDiv2_td1'>
                                    1
                                </td>
                                <td className='lcaDiv2_td2'>
                                    Nam
                                </td>
                                <td className='lcaDiv2_td3'>
                                    #Nam
                                </td>
                                <td className='lcaDiv2_tbody-td4'>
                                    <button className='lcaDiv2_btn'>
                                        <MdEdit className='lcaDiv2_btn-edit'/>
                                    </button>
                                    <button className='lcaDiv2_btn'>
                                        <MdDelete className='lcaDiv2_btn-delete'/>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    2
                                </td>
                                <td>
                                    Nam
                                </td>
                                <td>
                                    #Nam
                                </td>
                                <td>
                                    <button className='lpa_btn'>
                                        <MdEdit className='lpa_btn-edit'/>
                                    </button>
                                    <button className='lpa_btn'>
                                        <MdDelete className='lpa_btn-delete'/>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* <div>
                    <p>Thể loại</p>
                    <form action="">
                        <input type="text" />
                        <button>Thêm thể loại</button>
                    </form>
                </div> */}
            </div>
        </div>
    )
}

export default ListCategoryAdmin;
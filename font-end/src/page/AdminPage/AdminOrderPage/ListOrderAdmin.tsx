import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import SearchIcon from '@mui/icons-material/Search';

import '../../../css/admin/adminList.css';

const ListOrderAdmin: React.FC = () => {
    return (
        <div className='loa'>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Admin
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                >
                    Đơn đặt hàng
                </Link>
                <Typography sx={{ color: 'text.primary' }}>
                    Danh sách đơn đặt hàng
                </Typography>
            </Breadcrumbs>
            <div className='loaDiv1'>
                <div className='loaDiv1_search'>
                    <input 
                        type="text"
                        className='loaDiv1_search-input'
                        placeholder='Tìm kiếm'
                    />
                    <SearchIcon className='loaDiv1_search-icon'/>
                </div>
                {/* <div className='lcaDiv1_add'>
                    <button className='lcaDiv1_btn-add'>
                        Thêm thể loại
                    </button>
                </div> */}
            </div>
            <div className='loaDiv2'>
                <table className='loaDiv2_table table'>
                    <thead className='loaDiv2_thead'>
                        <tr>
                            <th scope="col" className='loaDiv2_th loaDiv2_th1'>
                                ID
                            </th>
                            <th scope="col" className='loaDiv2_th loaDiv2_th2'>
                                Sản phẩm
                            </th>
                            <th scope="col" className='loaDiv2_th loaDiv2_th3'>
                                Số lượng
                            </th>
                            <th scope="col" className='loaDiv2_th loaDiv2_th4'>
                                Tổng tiền
                            </th>
                            <th scope="col" className='loaDiv2_th loaDiv2_th5'>
                                Thanh toán
                            </th>
                            <th scope="col" className='loaDiv2_th loaDiv2_th6'>
                                Trạng thái
                            </th>
                            <th scope="col" className='loaDiv2_th loaDiv2_th7'>
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td scope="col" className='loaDiv2_td loaDiv2_td1'>
                                1
                            </td>
                            <td className='loaDiv2_td loaDiv2_td2'>
                                <div className='loaDiv2_td2-blk'>
                                    <img 
                                        src="https://salt.tikicdn.com/cache/750x750/ts/product/da/13/81/2108df94c65b14f4f3516f26daefe33b.jpg.webp" 
                                        alt="Ảnh sản phẩm" 
                                        className='loaDiv2_td-img'
                                    />
                                    <p className='loaDiv2_td-name'>
                                        Giày patin màu xanh
                                    </p>
                                </div>
                            </td>
                            <td className='loaDiv2_td loaDiv2_td3'>
                                5
                            </td>
                            <td className='loaDiv2_td loaDiv2_td4'>
                                <p className='loaDiv2-text'>
                                    1.000.000.000đ
                                </p>
                            </td>
                            <td className='loaDiv2_td loaDiv2_td5'>
                                <p className='loaDiv2-text'>
                                    Chuyển khoản
                                </p>
                            </td>
                            <td className='loaDiv2_td loaDiv2_td6'>
                                <p className='loaDiv2-text'>
                                    Đang chuẩn bị
                                </p>
                            </td>
                            <td className='loaDiv2_td'>
                                <div className='loaDiv2_Grbtn'>
                                    <button className='loaDiv2-btn1'>
                                        Giao Hàng
                                    </button>
                                    <button className='loaDiv2-btn2'>
                                        Hủy Đơn Hàng
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListOrderAdmin;
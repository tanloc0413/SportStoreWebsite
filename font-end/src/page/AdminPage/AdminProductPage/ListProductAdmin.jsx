import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Link from '@mui/material/Link';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { MdEdit, MdDelete } from "react-icons/md";
import TablePagination from '@mui/material/TablePagination';


import '../../../css/admin/adminList.css';
import Image from '../../../imgs/bgn5.png';

const ListProductAdmin = () => {


    return (
        <Box 
            sx={{ width: '100%', height: '100%' }}
        >
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Admin
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                >
                    Sản phẩm
                </Link>
                <Typography sx={{ color: 'text.primary' }}>
                    Danh sách sản phẩm
                </Typography>
            </Breadcrumbs>
            <div className='lpa'>
                <div className='lpa_search'>
                    <input 
                        type="text"
                        className='lpa_search-input'
                        placeholder='Tìm kiếm'
                    />
                    <SearchIcon className='lpa_search-icon'/>
                </div>
                <div className='lpa_add'>
                    <button className='lpa_btn-add'>
                        Thêm sản phẩm
                    </button>
                </div>
            </div>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead sx={{ backgroundColor: '#fff' }}>
                            <TableRow>
                                <TableCell align="left" sx={{ width: 50 }}>
                                    ID
                                </TableCell>
                                <TableCell align="center" sx={{ width: 100 }}>
                                    Ảnh
                                </TableCell>
                                <TableCell align="center">
                                    Tên sản phẩm
                                </TableCell>
                                <TableCell align="center">
                                    Giá gốc
                                </TableCell>
                                <TableCell align="center">
                                    Giá bán
                                </TableCell>
                                <TableCell align="center">
                                    Giá bán
                                </TableCell>
                                <TableCell align="center">
                                    Số lượng
                                </TableCell>
                                <TableCell align="center">
                                    Thương hiệu
                                </TableCell>
                                <TableCell align="right">
                                    Thao tác
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="left" sx={{ width: 50 }}>
                                    1
                                </TableCell>
                                <TableCell align="center">
                                    <img
                                        src={Image}
                                        alt="sản phẩm"
                                        className='lpa_product-img'
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    giày bata màu đen black
                                </TableCell>
                                <TableCell align="center">
                                    1.000.000đ
                                </TableCell>
                                <TableCell align="center">
                                    1.000.000đ
                                </TableCell>
                                <TableCell align="center">
                                    1.000.000đ
                                </TableCell>
                                <TableCell align="center">
                                    1
                                </TableCell>
                                <TableCell align="center">
                                    Nike
                                </TableCell>
                                <TableCell align="right" className='lpa_table-right'>
                                    <button className='lpa_btn'>
                                        <MdEdit className='lpa_btn-edit'/>
                                    </button>
                                    <button className='lpa_btn'>
                                        <MdDelete className='lpa_btn-delete'/>
                                    </button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    labelRowsPerPage="Số dòng mỗi trang:"
                    // rowsPerPageOptions={[10, 25, 100]}
                    // count={rows.length}
                    // rowsPerPage={rowsPerPage}
                    // page={page}
                    // onPageChange={handleChangePage}
                    // onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    )
}

export default ListProductAdmin;
import { useEffect, useState } from 'react';
import { MdEdit, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
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
import TablePagination from '@mui/material/TablePagination';


import '../../../css/admin/adminList.css';
import ImageProduct from '../../../imgs/bgn5.png';
import { getAllProducts } from '../../../api/fetchProducts';
import { loadProducts } from '../../../store/features/product';
import { formatMoney } from '../../../component/FormatMoney/formatMoney';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../api/constant';

const ListProductAdmin = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const products = useSelector(state => state.productState.products);

    useEffect(() => {
        getAllProducts()
        .then(res => {
            dispatch(loadProducts(res));
        });
    }, [dispatch]);

    console.log("API", products)


    // phân trang
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


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
                    <button 
                        className='lpa_btn-add' 
                        onClick={() => navigate('/admin/quan-ly-san-pham/them')}
                    >
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
                                {/* <TableCell align="center">
                                    
                                </TableCell> */}
                                <TableCell align="center">
                                    Ngày tạo
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
                            {/* {products?.map(products => ( */}
                            {products
                                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(products => (
                                <TableRow>
                                    <TableCell align="left" sx={{ width: 50 }}>
                                        {products?.id}
                                    </TableCell>
                                    <TableCell align="center">
                                        <img
                                            // src={products?.productImage?.[0]?.url || ImageProduct}
                                            src={(() => {
                                                const url = products?.productImage?.[0]?.url;
                                                if (!url) return ImageProduct;
                                                return url.startsWith('/images') ? `${API_BASE_URL}${url}` : url;
                                            })()}
                                            alt="sản phẩm"
                                            className='lpa_product-img'
                                        />
                                    </TableCell>
                                    <TableCell align="left">
                                        {products?.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        {formatMoney(products?.price)}
                                    </TableCell>
                                    {/* <TableCell align="center">
                                        1.000.000đ
                                    </TableCell> */}
                                    <TableCell align="center">
                                        {new Date(products?.createdAt).toLocaleDateString("vi-VN")}
                                    </TableCell>
                                    <TableCell align="center">
                                        {products?.variants?.reduce(
                                            (sum, v) => sum + (v.quantity || 0),
                                            0
                                        )}
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
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    labelRowsPerPage="Số dòng mỗi trang:"
                    rowsPerPageOptions={[5, 10, 20]}
                    count={products?.length || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    )
}

export default ListProductAdmin;
import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import SearchIcon from '@mui/icons-material/Search';
import { MdEdit, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';

import '../../../css/admin/adminList.css';
import { fetchCategories } from '../../../api/fetchCategories';
import { loadCategories } from '../../../store/features/category';
import { useNavigate } from 'react-router-dom';

const ListCategoryAdmin = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    
    useEffect(() => {
        fetchCategories()
        .then(res => {
            // setCategory(res);
            dispatch(loadCategories(res));
        })
        .catch((err) => {
            console.log('Lỗi: ', err);
        });
    }, []);

    const categories = useSelector(
      state => state.categoryState.categories
    );

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
                        <button 
                            className='lcaDiv1_btn-add'
                            onClick={() => navigate('/admin/quan-ly-the-loai/them')}
                        >
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
                            {categories?.map(categories => (
                                <tr>
                                    <td className='lcaDiv2_td1'>
                                        {categories?.id}
                                    </td>
                                    <td className='lcaDiv2_td2'>
                                        {categories?.name}
                                    </td>
                                    <td className='lcaDiv2_td3'>
                                        #{categories?.code}
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
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ListCategoryAdmin;
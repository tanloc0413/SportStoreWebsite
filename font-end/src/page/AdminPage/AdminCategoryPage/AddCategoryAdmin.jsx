import React, { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';

import '../../../css/admin/adminAdd.css';
import { API_BASE_URL, getHeaders } from '../../../api/constant';

const AddCategoryAdmin = () => {
  const [showDiv, setShowDiv] = useState('noCate');
  
  // State cho thêm mới thể loại (Parent)
  const [newCateName, setNewCateName] = useState('');
  const [newCateCode, setNewCateCode] = useState('');

  // State cho thêm loại con (Child)
  const [categories, setCategories] = useState([]);
  const [selectedCateId, setSelectedCateId] = useState('');
  const [newTypeName, setNewTypeName] = useState('');
  const [newTypeCode, setNewTypeCode] = useState('');

  const handleChange = (event) => {
    setShowDiv(event.target.value);
  };

  // Lấy danh sách thể loại khi component load
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/category`);
        setCategories(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách thể loại:", error);
      }
    };
    loadCategories();
  }, []);

  // Xử lý thêm Category Cha
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    const body = {
      name: newCateName,
      code: newCateCode,
      categoryTypeList: []
    };

    try {
      await axios.post(`${API_BASE_URL}/api/category`, body, { headers: getHeaders() });
      alert("Thêm thể loại thành công!");
      setNewCateName('');
      setNewCateCode('');
      // Refresh lại list categories
      const res = await axios.get(`${API_BASE_URL}/api/category`);
      setCategories(res.data);
    } catch (error) {
      alert("Lỗi khi thêm thể loại");
      console.error(error);
    }
  };

  // Xử lý thêm Category Type (Con)
  const handleAddType = async (e) => {
    e.preventDefault();
    if (!selectedCateId) {
      alert("Vui lòng chọn thể loại cha!");
      return;
    }

    // Tìm category cha hiện tại
    const parentCategory = categories.find(c => c.id === selectedCateId);
    if (!parentCategory) return;

    // Tạo danh sách type mới (giữ cái cũ + thêm cái mới không có ID)
    const newType = { name: newTypeName, code: newTypeCode };
    const updatedTypeList = [...parentCategory.categoryTypes, newType];

    // Cấu trúc DTO để gửi lên update
    const body = {
      id: parentCategory.id,
      name: parentCategory.name,
      code: parentCategory.code,
      categoryTypeList: updatedTypeList
    };

    try {
      await axios.put(`${API_BASE_URL}/api/category/${selectedCateId}`, body, { headers: getHeaders() });
      alert("Thêm loại sản phẩm thành công!");
      setNewTypeName('');
      setNewTypeCode('');
      // Refresh lại data
      const res = await axios.get(`${API_BASE_URL}/api/category`);
      setCategories(res.data);
    } catch (error) {
      alert("Lỗi khi cập nhật thể loại");
      console.error(error);
    }
  };

  return (
    <div className='addCate'>
      <div className='addCate1'>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="noCate"
            name="radio-buttons-group"
            sx={{ display: 'flex', flexDirection: 'row', columnGap: 3 }}
            value={showDiv}
            onChange={handleChange}
          >
            <FormControlLabel 
              value="noCate" 
              control={<Radio />} 
              label="Thêm thể loại mới (Cha)" 
              sx={{ '& .MuiFormControlLabel-label': { fontSize: 18 } }}
            />
            <FormControlLabel 
              value="hasCate" 
              control={<Radio />} 
              label="Thêm loại sản phẩm (Con)" 
              sx={{ '& .MuiFormControlLabel-label': { fontSize: 18 } }}
            />
          </RadioGroup>
        </FormControl>
      </div>

      {/* FORM THÊM CATEGORY MỚI */}
      {showDiv === 'noCate' && 
        <div className='addCate2'>
          <p style={{marginBottom: '15px', fontStyle:'italic', color:'#666'}}>
            Ví dụ: Nam, Nữ, Trẻ em...
          </p>
          <form className='addCate2_form' onSubmit={handleCreateCategory}>
            <input 
              type="text"
              placeholder='Nhập tên thể loại (VD: Nam)'
              className='addCate2_input1'
              value={newCateName}
              onChange={(e) => setNewCateName(e.target.value)}
              required
            />
            <input 
              type="text"
              placeholder='Nhập mã Code (VD: #Nam)'
              className='addCate2_input1'
              style={{marginTop: '15px'}}
              value={newCateCode}
              onChange={(e) => setNewCateCode(e.target.value)}
              required
            />
            <button className='addCate2_btn' type="submit">
              Thêm thể loại
            </button>
          </form>
        </div>
      }
      
      {/* FORM THÊM TYPE VÀO CATEGORY ĐÃ CÓ */}
      {showDiv === 'hasCate' &&
        <div className='addCate3'>
           <p style={{marginBottom: '10px', fontStyle:'italic', color:'#666'}}>
            Chọn thể loại cha và thêm loại con 
          </p>
          <form className='addCate2_form' onSubmit={handleAddType}>
            <FormControl sx={{ width: '100%', marginBottom: 2 }}>
                <InputLabel id="demo-select-cate-label">Chọn thể loại</InputLabel>
                <Select
                  labelId="demo-select-cate-label"
                  id="demo-select-cate"
                  value={selectedCateId}
                  onChange={(e) => setSelectedCateId(e.target.value)}
                  input={<OutlinedInput label="Chọn thể loại" />}
                >
                  {categories.map((cate) => (
                    <MenuItem key={cate.id} value={cate.id}>
                      {cate.name} ({cate.code})
                    </MenuItem>
                  ))}
                </Select>
            </FormControl>

            <input 
              type="text"
              placeholder='Nhập tên loại sản phẩm (VD: Áo Khoác)'
              className='addCate2_input1'
              value={newTypeName}
              onChange={(e) => setNewTypeName(e.target.value)}
              required
            />
            
            <input 
              type="text"
              placeholder='Nhập mã loại (VD: #AoKhoacNam)'
              className='addCate2_input1'
              style={{marginTop: '15px'}}
              value={newTypeCode}
              onChange={(e) => setNewTypeCode(e.target.value)}
              required
            />

            <button className='addCate2_btn' type="submit" style={{marginTop: '20px'}}>
              Lưu loại sản phẩm
            </button>
          </form>
        </div>
      }
    </div>
  )
}

export default AddCategoryAdmin;
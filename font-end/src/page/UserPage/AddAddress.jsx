import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import '../../css/user/addAddress.css';
import { setLoading } from '../../store/features/common';
import { addAddressAPI } from '../../api/userInfo';
import { saveAddress } from '../../store/features/user';

const AddAddress = ({onCancel}) => {
  const dispatch = useDispatch();
  const [error,setError] = useState('');

  const [values,setValues] = useState({
    fullName: '',
    phoneNumber: '',
    street: '',
    commune: '',
    ward: '',
    cityOfProvince: ''
  });

  const onSubmit = useCallback((evt)=>{
    evt.preventDefault();
  
    const phoneRegex = /^0\d{9}$/;

    // kiểm tra định dạng số điện thoại
    if(!phoneRegex.test(values.phoneNumber)) {
      setError("Số điện thoại phải có 10 số và bắt đầu bằng 0");
      return;
    }

    dispatch(setLoading(true));
    setError('');

    addAddressAPI(values)
    .then(res => {
      dispatch(saveAddress(res));
      onCancel && onCancel();
    })
    .catch(err => {
      console.log("Lỗi: ", err);
      setError('Địa chỉ chưa được thêm');
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
  }, [dispatch, onCancel, values]);

  const handleOnChange = useCallback((e)=>{
    e.persist();
    setValues(values => ({
      ...values,
      [e.target.name]:e.target?.value,
    }))
  }, []);

  return (
    <div className='addAddress'>
      <form 
        className='formAddress' 
        onSubmit={onSubmit}
        autoComplete='off'
      >
        <p className='formAddress_title'>
          Thêm địa chỉ
        </p>
        {/* Họ và tên */}
        <label 
          htmlFor='fullName'
          className='formAddress_label formAddress_labelF'
        >
          Họ và tên
        </label>
        <input 
          type='text'
          name='fullName'
          value={values?.fullName}
          onChange={handleOnChange}
          className='formAddress_input'
          // autoComplete='off'
          // autoSave='off'
          required
        />
        {/* Số điện thoại */}
        <label
          htmlFor='phoneNumber'
          className='formAddress_label'
        >
          Số điện thoại
        </label>
        <input 
          type='text'
          name='phoneNumber'
          value={values?.phoneNumber}
          onChange={handleOnChange}
          className='formAddress_input'
          required
        />
        {error && 
          <p className='formAddress_error-text'>
            {error}
          </p>
        }
        {/* Địa chỉ cụ thể */}
        <label
          htmlFor='specificAddress'
          className='formAddress_label'
        >
          Địa chỉ
        </label>
        <input 
          type='text'
          name='street'
          value={values?.street}
          onChange={handleOnChange}
          className='formAddress_input'
          placeholder='Tên đường, số nhà, khu phố, ấp,...'
        />
        {/* Tên xã */}
        <label
          htmlFor='commune'
          className='formAddress_label'
        >
          Xã
        </label>
        <input 
          type='text'
          name='commune'
          value={values?.commune}
          onChange={handleOnChange}
          className='formAddress_input'
          placeholder='Tên xã'
        />
        {/* Tên phường */}
        <label 
          htmlFor='ward'
          className='formAddress_label'
        >
          Phường
        </label>
        <input 
          type='text'
          name='ward'
          value={values?.ward}
          onChange={handleOnChange}
          className='formAddress_input'
          placeholder='Tên phường'
        />
        {/* Tỉnh hoặc thành phố */}
        <label
          htmlFor='cityOfProvince'
          className='formAddress_label'
        >
          Tỉnh/Thành phố
        </label>
        <input 
          type='text'
          name='cityOfProvince'
          value={values?.cityOfProvince}
          onChange={handleOnChange}
          className='formAddress_input'
          placeholder='Tỉnh/Thành phố'
        />
        {/* Nút */}
        <div className='formAddress_btnGr'>
          <button 
            onClick={() => onCancel()}
            className='formAddress_btn formAddress_btn-cancel'
          >
            Hủy bỏ
          </button>
          <button 
            type='submit'
            className='formAddress_btn formAddress_btn-add'
          >
            Thêm địa chỉ
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddAddress;
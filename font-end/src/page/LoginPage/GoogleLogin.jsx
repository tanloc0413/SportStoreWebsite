import React, { useCallback, useEffect } from 'react';

import '../../css/user/login.css';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../../util/jwt-helper';

const GoogleLogin = () => {
  // điều hướng
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if(token) {
      saveToken(token);
      navigate('/');
    }
    else {
      navigate('/dang-nhap');
    }
  },[navigate])

  return (
    <> 
    </>
  )
}

export default GoogleLogin
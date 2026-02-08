import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenValid } from '../../util/jwt-helper';

const ProtectedRouter = ({children}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if(!isTokenValid()){
      navigate("/dang-nhap")
    }
  },[navigate]);
  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRouter;
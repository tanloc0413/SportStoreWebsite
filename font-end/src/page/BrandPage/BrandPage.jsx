import React, { useEffect, useState } from 'react';

import '../../css/user/brand.css';
import { fetchBrands } from '../../api/fetchBranch';

const BrandPage = () => {
  const [brand, setBranch] = useState([]);

  useEffect(() => {
    fetchBrands()
    .then(res => {
      setBranch(res);
    })
    .catch((err) => {
      console.error("Lỗi khi lấy brand: ", err);
    });
  }, []);

  return (
    <div className='brandPage'>
      <div className='brandPage-list'>
        {brand.map(branch => (
          <div className='brandPage-blk'>
            <img 
              src={`${branch?.thumbnail}`}
              alt="Ảnh Logo" 
              className='brandPage-img'
            />
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default BrandPage;
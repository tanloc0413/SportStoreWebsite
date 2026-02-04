import React, { useCallback, useEffect, useState } from 'react';

import '../../css/user/filterProduct.css';

const SizeFilter = ({ sizes, multi=true, onChange }) => {
    const [appliedSize,setAppliedSize] = useState([]);

    const onClickDiv = useCallback((item) => {
        if(appliedSize.indexOf(item) > -1) {  
            setAppliedSize(appliedSize?.filter(size => size !== item));
        }
        else {
            if(multi) {
                setAppliedSize([...appliedSize,item]);
            }
            else {
                setAppliedSize([item]);
            }
            setAppliedSize([item]);
        }
    }, [appliedSize, multi]);
 
    useEffect(() => {
        onChange && onChange(appliedSize);
    }, [appliedSize, onChange])
    

    return (
        <div className='sizeList'>
            {
                sizes?.map((item,index) => (
                    <div 
                        key={index}
                        className='sizeList_item'
                        style = {appliedSize?.includes(item) ? {
                            background: '#d81f19',
                            color:'white'
                        } : {}}
                        onClick={() => onClickDiv(item)}
                    >
                        {item}
                    </div> 
                ))
            }
        </div>
    )
}

export default SizeFilter;
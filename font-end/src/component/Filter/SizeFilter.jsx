import { useCallback, useEffect, useState } from 'react';

import '../../css/user/filterProduct.css';

const SizeFilter = ({ sizes, multi=true, onChange, selectedSizes = [] }) => {
    const [appliedSize,setAppliedSize] = useState([]);

    // const onClickDiv = useCallback((item) => {
    //     if(appliedSize.indexOf(item) > -1) {  
    //         setAppliedSize(appliedSize?.filter(size => size !== item));
    //     }
    //     else {
    //         if(multi) {
    //             setAppliedSize([...appliedSize,item]);
    //         }
    //         else {
    //             setAppliedSize([item]);
    //         }
    //         setAppliedSize([item]);
    //     }
    // }, [appliedSize, multi]);
 
    // useEffect(() => {
    //     onChange && onChange(appliedSize);
    // }, [appliedSize, onChange])

    const onClickDiv = useCallback((item) => {
        let newSizes;
        if(selectedSizes.includes(item)) {  
            newSizes = selectedSizes.filter(size => size !== item);
        } else {
            newSizes = [...selectedSizes, item];
        }
        onChange && onChange(newSizes);
    }, [selectedSizes, onChange]);
    
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
import React, { useCallback, useEffect, useState } from 'react';

import '../../css/user/filterProduct.css';

export const colorSelector = {
    "Tím": "#8434E1",
    "Đen": "#252525",
    "Trắng":"#FFFFFF",
    "Xám": "#808080",
    "Xanh Dương": "#0059ff",
    "Đỏ": "#FF0000",
    "Cam": "#ff7b00",
    "Navy": "#000080",
    "Vàng": "#FFFF00",
    "Hồng": "#FFC0CB",
    "Lục": "#00da00"
}

const ColorFilter = ({colors, onChange}) => {
    // const [appliedColors,setAppliedColors] = useState([]);
    const [appliedColor,setAppliedColor] = useState('');

    
    // const onClickDiv = useCallback((item)=>{
    //     if(appliedColors.indexOf(item) > -1) {
    //         setAppliedColors(appliedColors?.filter(color => color !== item));
    //     }
    //     else{
    //         setAppliedColors([...appliedColors,item]);
    //     }
    // }, [appliedColors,setAppliedColors]);

    const onClickDiv = useCallback((item) => {
        if(appliedColor === item) {
            setAppliedColor('');
        } else {
            setAppliedColor(item);
        }
    }, [appliedColor]);

    useEffect(() => {
        onChange && onChange(appliedColor);
    }, [appliedColor, onChange]);

    return (
        <div className='colorList'>
            {
                colors?.map(item => (
                    <div 
                        // className={`colorList_item 
                        //     ${appliedColors.includes(item) ? 'colorActive' : ''
                        // }`}
                        className={`colorList_item ${
                            appliedColor === item ? 'colorActive' : ''
                        }`}
                        onClick={() => onClickDiv(item)} 
                        style={{
                            background: `${colorSelector[item]}`
                        }}
                    ></div>
                ))
            }
        </div>
    )
}

export default ColorFilter;
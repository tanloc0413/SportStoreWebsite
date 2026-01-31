import React, { useCallback, useState } from 'react';

import '../../css/user/filterProduct.css';

export const colorSelector = {
    "Purple": "#8434E1",
    "Black": "#252525",
    "White":"#FFFFFF",
    "Gray": "#808080",
    "Blue": "#0059ff",
    "Red": "#FF0000",
    "Cam": "#ff7b00",
    "Navy": "#000080",
    "Grey": "#808080",
    "Yellow": "#FFFF00",
    "Pink ": "#FFC0CB",
    "Green": "#00da00"
}

const ColorFilter = ({colors }) => {
    const [appliedColors,setAppliedColors] = useState([]);
    const onClickDiv = useCallback((item)=>{
        if(appliedColors.indexOf(item) > -1) {
            setAppliedColors(appliedColors?.filter(color => color !== item));
        }
        else{
            setAppliedColors([...appliedColors,item]);
        }
    }, [appliedColors,setAppliedColors]);

    return (
        <div className='colorList'>
            {
                colors?.map(item => (
                    <div 
                        className='colorList_item'
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
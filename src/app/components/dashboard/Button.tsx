import React, { FC } from 'react'
import {ButtonProps} from '../../lib/Types'



const Button:FC<ButtonProps> = ({className,text,onClick}) => {
  return (
    <button className={`border-[1px] border-borderColor text-sm text-buttonTextColor py-[9px] px-3 rounded-[5px] h-10 hover:border-[#ffffff] hover:text-white ${className}`}
      onClick={onClick}
    >
        {text}
    </button>

  )
}

export default Button
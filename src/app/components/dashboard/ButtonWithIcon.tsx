import React, { FC } from 'react'
import Image from 'next/image'
import {ButtonWithIconProps} from '../../lib/Types'


const ButtonWithIcon:FC<ButtonWithIconProps> = ({ text,className,iconURL,imgAlt }) => {
    return (
        <div>
            <button className={`border-[1px] border-borderColor text-sm text-buttonTextColor py-[9px] px-3 rounded-[5px] hover:border-[#ffffff] hover:text-white space-x-2 flex ${className}`}>
               <div> <Image src={iconURL} height={20} width={20} alt={imgAlt} className='hover:stroke-white hover:fill-white' /></div>
                <div>{text}</div>
            </button>
        </div>
    )
}

export default ButtonWithIcon
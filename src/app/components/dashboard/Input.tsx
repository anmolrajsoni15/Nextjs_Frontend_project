
import React,{FC} from 'react'
import { InputProps } from '../../lib/Types'



const Input:FC<InputProps> = ({placeholder, className , value,onChange,name}) => {
  return (
    <>
        <input className={`bg-black border-[1px] h-[40px] border-borderColor rounded px-2 ${className}`} placeholder={placeholder} value={value} onChange={onChange} name={name} />
    </>
  )
}

export default Input

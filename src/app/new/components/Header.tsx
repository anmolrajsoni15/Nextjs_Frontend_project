import React from 'react'
import TokenCard from './TokenCard'


interface Props {
    userData: any;
}

const Header: React.FC<Props> = ({userData}) => {

  return (
    <div className='w-full flex items-center justify-between px-7 pt-8'>
        <div className="font-poppins font-bold text-[33px] leading-[56px] ml-2">Hello, {userData?.name}</div>
        <TokenCard userData={userData} />
    </div>
  )
}

export default Header
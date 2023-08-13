'use client'

import Image from 'next/image';
import React, { useEffect, useState } from 'react'

interface Props {
    icon: string,
    value: string,
    onChangeVal: any,
}

const Input:React.FC<Props> = ({
    icon,
    value,
    onChangeVal
}) => {

    const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e:any) => {
    setInputValue(e.target.value);
    onChangeVal(e.target.value);
  };

  return (
    <div className="w-full h-14 my-1 flex flex-row justify-start items-center border-2 border-solid border-[#ffffff2f] rounded-md bg-[#292929] hover:bg-[#363636]">
      <Image src={icon} width={24} height={24} alt="link" className='mx-4' />
      <div className="w-[80%] text-[15px] leading-4 font-medium font-spacegrotesk text-[#ffffffcc]">
        {/* {value} */}
        <input
          type="text"
          value={inputValue}
          className={`bg-transparent  focus:border-none outline-none py-2 w-full pb-1`}
          onChange={handleInputChange}
        />
      </div>
    </div>
  )
}

export default Input
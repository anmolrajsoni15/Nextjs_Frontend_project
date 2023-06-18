'use client'
import Link from 'next/link';
import React, { useState,useEffect } from 'react'



function Dropdown({blocId}:any) {
    
    const [dropdownOpen, setdropdownOpen] = useState(false);

    const handleClick = () =>{
        setdropdownOpen(!dropdownOpen)
    }

   

    // useEffect(() => {
    // document.addEventListener('click',()=>{
    //     setdropdownOpen(false)
    // })
    
    // }, [])

    

    return (
        <div className='relative'>
        <div className='space-y-1 cursor-pointer' onClick={handleClick}>
            
            <div className='bg-tableContent h-1 w-1 rounded-full' />
            <div className='bg-tableContent h-1 w-1 rounded-full' />
            <div className='bg-tableContent h-1 w-1 rounded-full' />
            </div>
            <div
                            className={`${dropdownOpen ? `top-full opacity-100 visible` : 'top-[110%] invisible opacity-0'} absolute -left-16 z-40 mt-2 w-40 rounded border-[.5px] border-borderColor bg-black rounded-lg  shadow-card transition-all`}>
                            <Link
                                 href={`/bloc/${blocId}/settings`}
                                className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-blue-100 hover:bg-opacity-5 hover:text-white"
                            >
                                Settings
                            </Link>
                            {/* <Link
                                 href={`/bloc/${blocId}/`}
                                className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-blue-100 hover:bg-opacity-5 hover:text-white"
                            >
                                Edit Bloc
                            </Link> */}
                            <Link
                                 href={`/bloc/${blocId}/share`}
                                className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-blue-100 hover:bg-opacity-5 hover:text-white"
                            >
                                Share Bloc
                            </Link>
                            <hr />
                            <Link
                                href={`/bloc/${blocId}/`}
                                className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-red-300 hover:bg-opacity-5 hover:text-red-800"
                            >
                                Delete Bloc
                            </Link>
                        </div>
        </div>
    )
}

export default Dropdown
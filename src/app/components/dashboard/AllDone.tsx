'use client'
import Link from 'next/link'
import React from 'react'
import Button from './Button'
import { deleteCookie } from 'cookies-next'

function AllDone() {

    const handleClick = ()=>{
        deleteCookie('blocId')
      }

    return (

        <div className='h-[75px] flex justify-center items-center'>
            <Link href={'/dashboard'} onClick={handleClick}>
                <Button text='All Done!' className='bg-primary text-white px-2' />
            </Link>
        </div>
    )
}

export default AllDone
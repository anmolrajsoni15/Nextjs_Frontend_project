'use client'
import Link from 'next/link'
import React from 'react'
import Button from './Button'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { clearFiles } from '../../Redux/features/UploadFile'
import { clearMessage } from '../../Redux/features/Message'

function AllDone() {

    const router = useRouter()
    const dispatch = useDispatch()

    const handleClick = async ()=>{
       await deleteCookie('blocId')
       await router.push('/')
       router.refresh()
       dispatch(clearFiles())
       dispatch(clearMessage())

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
'use client'
import React, {FC} from 'react'
import Image from 'next/image'
import { IntegrationCardProps } from '../../lib/Types'
import Button from './Button'

const IntegrationCard:FC<IntegrationCardProps> = ({imgUrl,imgAlt,title,text}) => {
    return (
        <div>
            <section className=' border-[1px] border-borderColor rounded-[16px] space-y-4 w-[24vw] h-[140px] px-4 py-4 my-4'>
                <div className='flex items-center justify-between'>
                    <div className=' flex space-x-2 items-center'>
                        <Image src={imgUrl} height={30} width={30} alt={imgAlt}></Image>
                        <h2 className='text-xl font-bold'>{title}</h2>
                    </div>
                    <div className='flex items-start px-2'> 
                    <Button text='Connect' />
                    </div>
                </div>
                <div className='text-sm'>{text}</div>
            </section>
        </div>
    )
}

export default IntegrationCard
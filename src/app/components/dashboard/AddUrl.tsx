import React from 'react'
import Input from './Input'
import Button from './Button'
import Link from 'next/link'

function AddUrl() {
    return (
        <div>
            <div className='space-x-4'>
                <Input className={'w-[844px]'} placeholder={'https://www.Examplewebsite.com/main'} />
                <Link href={''}>
                    <Button className={''} text={'Extract Links'} />
                </Link>
            </div>
            <p className='text-xs w-[844px]'>The intended outcome is to scrape every URL link that begins with the provided web address, excluding any files located on the website, and only if the website is rendered on the server side.
            </p>
        </div>
    )
}

export default AddUrl
import React, { useState } from 'react'
import AddUrl from './AddUrl'

const AddWeb = () => {

    


    return (

        <section className='py-8 space-y-10'>
            <h2 className='text-3xl font-semibold'>Add your files </h2>
            <div className='space-y-1'>
                <h2 className='text-xl font-semibold'>Add the URL</h2>
                <AddUrl />
            </div>
            {/* <div className='space-y-1'>
                <h2 className='text-xl'>Associated Links</h2>
                <div className='flex space-x-4'>
                    <Input className={'w-[844px]'} placeholder={''} />
                    <Image src={'/dashboard/cross.svg'} className={`cursor-pointer`} height={24} width={24} alt={'cross'} />
                </div>
            </div> */}
        </section>
    )
}

export default AddWeb
import Image from 'next/image'
import React from 'react'
import UploadFile from './UploadFile'

const AddFile = () => {
    return (
        <section className='py-8 space-y-10'>
            <h2 className='text-3xl font-semibold'>Add your files </h2>
            <article className=' flex flex-col items-center'>
                <UploadFile />
            </article>
        </section>

    )
}

export default AddFile
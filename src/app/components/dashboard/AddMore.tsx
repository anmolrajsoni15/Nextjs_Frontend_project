import React from 'react'
import UploadFileCard from './UploadFileCard'
import AddUrl from './AddUrl'
import IntegrationOption from './IntegrationOption'

function AddMore() {
    return (
        <section className='py-8 space-y-10'>
            <h2 className='text-3xl font-semibold'>Data Source </h2>
            <article className=' flex flex-col items-center'>

            </article>
            <h2 className='text-3xl font-semibold'>Add more data source </h2>
            <article className=' space-y-6'>
                <div>
                    <UploadFileCard />
                </div>
                <hr />
                <div>
                    <AddUrl />
                </div>
                <hr />
                <div>
                    <IntegrationOption />
                </div>

            </article>

        </section>
    )
}

export default AddMore
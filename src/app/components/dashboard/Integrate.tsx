import React from 'react'
import IntergrationOption from './IntegrationOption'

const Integrate = () => {
       return (
        <section className='py-8 space-y-10'>
            <div className='space-y-1'>
                <h2 className='text-3xl font-semibold'>Available Integrations </h2>
                <p className='text-sm'>Connect to all your social channels to leverage the best performance.</p>
            </div>
            <IntergrationOption />
        </section>
    )
}

export default Integrate
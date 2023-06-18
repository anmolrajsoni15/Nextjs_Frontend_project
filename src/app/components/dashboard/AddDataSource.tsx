'use client'
import React from 'react'
import DataSourceCard from './DataSourceCard'



function AddDataSource  () {

    const dataSources = [
        {
            imgUrl: '/dashboard/file.svg',
            title: 'File',
            subtitle: 'Source information from your file',
            link_text: 'Import File',
            href: '/create/file',
            alt: 'file add'
        },
        {
            imgUrl: '/dashboard/web.svg',
            title: 'Website',
            subtitle: 'Source information from your Webpages',
            link_text: 'Add Link',
            href: '/create/web',
            alt: 'web'
        },
        // {
        //     imgUrl: '/dashboard/integrate.svg',
        //     title: 'Integrations',
        //     subtitle: 'Integrate your existing workflows tools ',
        //     link_text: 'Integrate',
        //     href: '/create/integrate',
        //     alt: "integrate"
        // },
    
    ]
    
    return (
        <section className='py-8 space-y-10'>
            <div className='space-y-1'>
                <h2 className='text-3xl font-semibold'>Add Data Source</h2>
                <p className='text-sm'>Get started by adding your first data source</p>
            </div>
            <div className='flex justify-start space-x-8 w-[80vw] flex-wrap'>
                {dataSources.map((item, index) => {
                    return (<DataSourceCard
                        key={index}
                        title={item.title}
                        subtitle={item.subtitle}
                        imgURL={item.imgUrl}
                        linkURL={item.href}
                        imgAlt={item.alt}
                        linkText={item.link_text}
                    />)
                })}
            </div>
        </section>
    )
}

export default AddDataSource
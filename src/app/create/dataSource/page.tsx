import React, { Suspense } from 'react'
import Sidebar from '../../components/dashboard/Sidebar'
import Topbar from '../../components/dashboard/Topbar'
import Footer from '../../components/dashboard/Footer'
import Chatbot from '../../components/dashboard/Chatbot'
import ProgressBar from '../../components/dashboard/ProgressBar'
// import AddMore from '../../components/dashboard/AddMore'
import UploadedFileCard from '../../components/dashboard/UploadedFileCard'
import UploadFileCard from '../../components/dashboard/UploadFileCard'
import AddUrl from '../../components/dashboard/AddUrl'
import { cookies } from 'next/headers'
import AddedUrl from '../../components/dashboard/AddedUrl'

const getIntegrations = async (): Promise<any> => {
    const token = cookies().get('jwt')?.value
    const blocId = cookies().get('blocId')?.value

    console.log(token)

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc/integrations`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'BLOC-ID': blocId || ''
        },
        cache: 'no-cache'

    })

    if (!res.ok) {
        console.log('Failed to fetch data', res.status)
    }

    return res.json()
}

const page = async () => {

    const integrations = await getIntegrations()
    console.log('integration info', integrations)

    return (
        <div className='text-white flex'>
            <Sidebar />
            <section className='px-8 flex flex-col justify-between w-[85vw] '>
                <div className='space-y-4'>
                    <Topbar text={'New Bloc'} />
                    <ProgressBar c1='bg-primary' c2='bg-primary' c3='bg-white' c4='bg-white' />
                    <div className='py-8 space-y-10'>
                        <h2 className='text-3xl font-semibold'>Data Source </h2>
                        <article className=' flex flex-col items-center'>
                            <Suspense fallback={<p>Loading Integrations...</p>}>
                                {(integrations && integrations.length > 0) ?
                                    integrations.map((item: { name: string, integrationId: string, type: 'file' | 'web' }, index: any) => {
                                        {
                                            item.type == "file" ?
                                            <UploadedFileCard fileName={item.name} percentCompleted={100} key={item.integrationId} />
                                            :
                                            <AddedUrl webUrl={item.name} key={item.integrationId} />
                                        }
                                    }
                                    )
                                    :
                                    <div className='text-center'>Unable to fetch Integrations...</div>
                                }
                            </Suspense>
                        </article>
                        <h2 className='text-3xl font-semibold'>Add more data source </h2>
                        <article className=' space-y-6 flex flex-col '>
                            <div className='self-center'>
                                <UploadFileCard />
                            </div>

                            <div className=''>
                                <AddUrl />
                            </div>
                        </article>
                    </div>
                </div>
                <Footer hidden={'hidden'} />
            </section>
        </div>
    )
}

export default page
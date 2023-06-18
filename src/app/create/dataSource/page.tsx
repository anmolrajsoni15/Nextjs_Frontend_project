import React from 'react'
import Sidebar from '../../components/dashboard/Sidebar'
import Topbar from '../../components/dashboard/Topbar'
import Footer from '../../components/dashboard/Footer'
import Chatbot from '../../components/dashboard/Chatbot'
import ProgressBar from '../../components/dashboard/ProgressBar'
import AddMore from '../../components/dashboard/AddMore'

const page = () => {
    return (
        <div className='text-white flex'>
            <Sidebar />
            <section className='px-8 flex flex-col justify-between w-[85vw] '>
                <div className='space-y-4'>
                    <Topbar text={'New Bloc'}  />
                    <ProgressBar c1='bg-primary' c2='bg-primary' c3='bg-white' c4='bg-white' />
                    <AddMore />
                </div>
                <Footer />
            </section>
        </div>
    )
}

export default page
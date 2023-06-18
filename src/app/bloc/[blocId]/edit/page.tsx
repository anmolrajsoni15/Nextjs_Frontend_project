import React from 'react'
import Link from 'next/link'
import Sidebar from '../../../components/dashboard/Sidebar'
import Topbar from '../../../components/dashboard/Topbar'
import Input from '../../../components/dashboard/Input'
import ProgressBar from '../../../components/dashboard/ProgressBar'
import SettingTopDiv from '../../../components/dashboard/SettingTopDiv'
import EditChatbot from '../../../components/dashboard/EditChatbot'

const settings = () => {
    return (
        <div className='text-white flex'>
            <Sidebar />
            <section className='px-8 w-[85vw]'>
                <Topbar text={'Create a New Bloc'} />
                <ProgressBar c1={'bg-primary'} c2={'bg-primary'} c3={'bg-primary'} c4='bg-white' />
                <EditChatbot />
            </section >
        </div >
    )
}

export default settings
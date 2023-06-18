import React from 'react'
import Sidebar from '../../../../components/dashboard/Sidebar'
import Topbar from '../../../../components/dashboard/Topbar'
// import Input from 'src/app/components/dashboard/Input'
import ProgressBar from '../../../../components/dashboard/ProgressBar'
import SettingTopDiv from '../../../../components/dashboard/SettingTopDiv'

const page = () => {
    return (
        <div className='text-white flex'>
            <Sidebar />
            <section className='px-8 w-[85vw]'>
                <Topbar text={'Create a New Bloc'} />
                <ProgressBar c1={'bg-primary'} c2={'bg-primary'} c3={'bg-primary'} />
                <SettingTopDiv c2={'underline'} />
                
            </section>
        </div>
    )
}

export default page
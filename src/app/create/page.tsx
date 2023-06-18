import React from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import Topbar from '../components/dashboard/Topbar'
import AddDataSource from '../components/dashboard/AddDataSource'
import ProgressBar from '../components/dashboard/ProgressBar'
const page = () => {
  return (
    <div className='text-white flex'>
    <Sidebar />
    <section className='px-8'>
        <Topbar text={'Create a New Bloc'} />
        <ProgressBar c1={'bg-primary'} c2='bg-white' c3='bg-white' c4='bg-white' />
        <AddDataSource />
    </section>
</div>
  )
}

export default page
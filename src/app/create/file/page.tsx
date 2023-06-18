import React from 'react'
import Sidebar from '../../components/dashboard/Sidebar'
import Topbar from '../../components/dashboard/Topbar'
import AddFile from '../../components/dashboard/AddFile'
import Footer from '../../components/dashboard/Footer'
import ProgressBar from '../../components/dashboard/ProgressBar'

const page = () => {
  return (
    <div className='text-white flex'>
      <Sidebar />
      <section className='px-8 flex flex-col justify-between'>
        <div className=''>
          <Topbar text={'New Bloc'} />
          <ProgressBar c1='bg-primary' c2={'bg-primary'} c3='bg-white' c4='bg-white' />
          <AddFile />
        </div>
        <Footer />
      </section>
    </div>
  )
}

export default page
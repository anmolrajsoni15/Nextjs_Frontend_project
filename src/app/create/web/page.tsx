import React from 'react'
import Sidebar from '../../components/dashboard/Sidebar'
import Topbar from '../../components/dashboard/Topbar'
import AddWeb from '../../components/dashboard/AddWeb'
import Footer from '../../components/dashboard/Footer'
import ProgressBar from '../../components/dashboard/ProgressBar'

const Web = () => {
  return (
    <div className='text-white flex'>
      <Sidebar />
      <section className='px-8 flex flex-col justify-between'>
        <div>
          <Topbar text={'New Bloc'} />
          <ProgressBar c1='bg-primary' c2={'bg-primary'} c3='bg-white' c4='bg-white' />
          <AddWeb />
        </div>
        <Footer />
      </section>
    </div>
  )
}

export default Web
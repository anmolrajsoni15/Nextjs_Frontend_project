import React from 'react'
import Header from './Header'
import Initials from './Initials'
import BlocContainer from './BlocContainer'

interface Props{
    userData: any;
}

const Container: React.FC<Props> = ({userData}) => {

  return (
    <div className='w-full h-full flex flex-col items-center justify-start ml-20 md:ml-24'>
        <Header userData={userData} />
        <Initials />
        <BlocContainer userName={userData?.name} />
    </div>
  )
}

export default Container
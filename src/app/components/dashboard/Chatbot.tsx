import Link from 'next/link'
import React from 'react'
import ButtonWithIcon from '../../components/dashboard/ButtonWithIcon'
import { cookies } from 'next/headers'
import Chatbox from '../../components/dashboard/Chatbox'
import ChatPageHeader from '../../components/dashboard/ChatPageHeader'

const Chatbot = () => {

  

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = '#f00';
  // }



  return (
    <section className='space-y-2'>
      <ChatPageHeader />
      <Chatbox />
    </section >
  )
}

export default Chatbot
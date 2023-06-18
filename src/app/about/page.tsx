"use client"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Redux/store'
import { NextPage } from 'next'

const About:NextPage = () => {
    const count = useSelector((store:RootState)=> store.counter.value)
   
  return (
    <div>
        <div className='text-white'>{count}</div>
    </div>
  )
}

export default About
'use client'
import React, { useEffect } from 'react'
import Topbar from './Topbar'
import {BlocState,setBlocName} from '../../Redux/features/blocState'
import { useSelector,useDispatch } from 'react-redux'
import {RootState} from '../../Redux/store'
import {getBloc} from '../../lib/getBloc'
import { getCookie } from 'cookies-next'



const ChatboxTopbar = () => {
    const blocState: BlocState = useSelector((store: RootState) => store.blocState)
    const dispatch = useDispatch()

    const getBloc = async () => {
        const blocId = getCookie('blocId')
        const token = getCookie('jwt')
        try {
            if (typeof blocId == 'string') {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'BLOC-ID': blocId
                    }
                })
                if (!res.ok) {
                    console.log("Network response for bloc Initial msg was not ok!")
                }
                if (res.ok) {
                    const data = await res.json()
                    dispatch(setBlocName(data.name))
                }
    
            }
        }
        catch (err) {
            console.log('')
            return err
        }
    }
    
useEffect(()  =>{
    getBloc()
},[])
  return (
    <div>
        <Topbar text={blocState.blocName} />
    </div>
  )
}

export default ChatboxTopbar
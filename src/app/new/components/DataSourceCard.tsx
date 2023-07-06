'use client'

import React from 'react'
import Image from 'next/image'
import { deleteIntegration, getAllIntegrationOfBloc } from '../../services/apiServices'
import { useDispatch } from 'react-redux'
import { getCookie } from 'cookies-next'

interface Props {
    icon: string,
    title: string,
    id: string,
}

const DataSourceCard: React.FC<Props> = ({icon, title, id}) => {
  const dispatch = useDispatch();
  const token = getCookie('jwt');
  const blocId = getCookie('blocId');

  const delteDataSource = async() => {
    console.log(id);
    await dispatch(deleteIntegration(id));
  }
  return (
    <div className='flex rounded-md bg-[#5B5B5B] w-[31%] items-center justify-center gap-3 p-3'>
        <Image src={icon} alt={title} width={18} height={18} />
        <div className='text-xs font-spacegrotesk font-medium text-[#FFFFFFCC] w-9/12 h-1/2 truncate'>{title}</div>
        <div className="" onClick={delteDataSource}>
        <Image src='/icons/cross.svg' alt='delete' width={12} height={12} />
        </div>
    </div>
  )
}

export default DataSourceCard
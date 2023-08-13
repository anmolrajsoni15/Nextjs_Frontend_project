'use client'

import React from 'react'
import Image from 'next/image'
import { getCookie } from 'cookies-next';
import { useDispatch } from 'react-redux';
import { deleteBloc, getAllBlocs } from 'src/app/services/apiServices';
import { refreshBloc } from 'src/app/Redux/features/blocSlice';
import { showNotification } from 'src/app/Notifications/NotificationManager';
import NewButton from 'src/app/components/common/NewButtton';

interface Props {
    blocId: string;
    closeModal2: any;
}

const DeleteModal:React.FC<Props> = ({blocId, closeModal2}) => {
    const dispatch = useDispatch()

    const token = getCookie("jwt");
  const handleDelete = async () => {
    dispatch(deleteBloc(token, blocId));
    dispatch(getAllBlocs(token));
    dispatch(refreshBloc())
    showNotification("info", "Bloc has been successfully Deleted!");
  };

  return (
    <div className='w-[540px] p-8 flex flex-col gap-8 bg-modalBg rounded-[15px] items-center justify-center'>
        <div className="font-inter text-2xl font-medium text-center text-[#E8726C]">Confirm Bloc Deletion</div>
        <div className="">
            <Image src="/icons/red_warning.svg" width={80} height={80} alt="delete" />
        </div>
        <div className="text-base font-medium font-inter text-[#F1F1F1] text-center">
            Are you sure you want to delete the selected Bloc?
        </div>
        <div className="flex items-center justify-center gap-3">
            <NewButton text="Cancel" loading={false} classProperty={`!bg-compColor !hover:bg-compColor px-[40px] border border-solid border-borderColor`} buttonFunction={closeModal2} />
            <NewButton text="Delete" loading={false} classProperty={`px-[40px]`} buttonFunction={handleDelete} />
        </div>
    </div>
  )
}

export default DeleteModal
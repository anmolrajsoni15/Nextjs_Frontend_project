import React from 'react'
import {format} from 'date-fns'
import Image from 'next/image';

interface Props{
    blocId: string;
    user: string;
  blocImage: string;
  blocName: string;
  createdAt: string | Date;
  refreshedAt: string | Date;
}

const BlocList: React.FC<Props> = ({
    blocId,
    user,
    blocImage,
    blocName,
    createdAt,
    refreshedAt,
}) => {
  return (

                    <tr className='border-b border-[#ffffff1a] w-full'>
                        <td className='py-4 w-1/2'>
                            <div className="flex items-center justify-start gap-2 pl-6">
                                <div className="">
                                    <Image src={blocImage} width={35} height={35} alt='image' className="rounded-full" />
                                </div>
                                <div className="text-[#FFFFFFCC] font-inter text-sm font-medium">{blocName}</div>
                            </div>
                        </td>
                        <td className='py-4 font-inter text-sm text-[#B0B0B0] w-1/5'>
                            {format(
                                new Date(createdAt || ''), 'MMMM dd, yyyy'
                            )}
                        </td>
                        <td className='py-4 font-inter text-sm text-[#B0B0B0] w-1/5'>
                        {format(
                                new Date(refreshedAt || ''), 'MMMM dd, yyyy'
                            )}
                        </td>
                        <td className='py-4 w-[10%]'>
                        <div className="flex items-center justify-start gap-5">
                            <Image src="/icons/share.svg" width={18} height={18} alt="share" />
                            <Image src="/icons/delete.svg" width={18} height={18} alt="delete" />
                            <Image src="/icons/pen.svg" width={18} height={18} alt="edit" />
                        </div>
                        </td>
                    </tr>

  )
}

export default BlocList
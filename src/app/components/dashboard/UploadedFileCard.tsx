'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { clearFile } from '../../Redux/features/UploadFile';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

const UploadedFileCard = ({ fileName, fileSize, percentCompleted, id, hidden }: any) => {
    const dispatch = useDispatch();
    const token = getCookie('jwt')
    const [loading, setLoading] = useState(false)
    const router = useRouter()


    const deleteFile = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/integration`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${token}`,
                    'INTEGRATION-ID': id
                }
            })
            if (!res.ok) {
                console.log('Network Response for deleting integration was not ok!')
            }
            if (res.ok) {
                await res.json()
                dispatch(clearFile(fileName))
                router.refresh()
            }
        }
        catch (err) {
            console.log('error in delete Integration API:', err)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-[512px] rounded-[12px] border-[1px] border-borderColor hover:border-white hover:cursor-pointer flex flex-col p-4 space-y-2 my-2">
            <div className="flex space-x-2">
                <div>
                    <Image src="/dashboard/uploaded.svg" width={30} height={30} alt="file" />
                </div>
                <div>
                    <div className='flex justify-between'>
                        <div className=''>
                            <div>{fileName}</div>
                            {/* <div>{fileSize} MB</div> */}
                        </div>
                        {percentCompleted === 100 ?
                            <button onClick={deleteFile} disabled={loading} className={hidden}>
                                {loading ? 'deleting...' : 'clear'}
                            </button> :
                            <></>
                        }

                    </div>
                    <div className="flex space-x-2">
                        <div className="w-96 h-2 bg-white rounded-full my-2 flex">
                            <div
                                className={`bg-green-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-[${percentCompleted}%] h-2`}
                            ></div>
                        </div>
                        <div>{percentCompleted}%</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadedFileCard;

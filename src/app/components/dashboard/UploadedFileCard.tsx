import React from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { clearFile } from '../../Redux/features/UploadFile';

const UploadedFileCard = ({ fileName, fileSize, percentCompleted }: any) => {
    const dispatch = useDispatch();

    return (
        <div className="w-[512px] rounded-[12px] border-[1px] border-borderColor hover:border-white hover:cursor-pointer flex flex-col p-4 space-y-2">
            <div className="flex space-x-2">
                <div>
                    <Image src="/dashboard/uploaded.svg" width={30} height={30} alt="file" />
                </div>
                <div>
                    <div className='flex justify-between'>
                        <div className=''>
                            <div>{fileName}</div>
                            <div>{fileSize} MB</div>
                        </div>
                        {percentCompleted === 100 ?
                            <div onClick={() => dispatch(clearFile(fileName))}>
                                clear
                            </div> :
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

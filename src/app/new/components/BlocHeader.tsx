'use client'

import Image from "next/image";
import React, { useEffect, useState } from "react";
import TokenCard from "./TokenCard";
import { AiOutlineCamera, AiOutlineSave } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { updateBloc } from "../../services/apiServices";
import { getCookie } from "cookies-next";

interface Props {
  blocData?: any;
  user?: any;
}

const BlocHeader: React.FC<Props> = ({ blocData, user }) => {
    const dispatch = useDispatch();

  const [blocName, setBlocName] = useState(blocData.name);
  const [photo, setPhoto] = useState("/images/Brand.png");
  const [isEdit, setIsEdit] = useState(false);
  const [imageEdit, setImageEdit] = useState(false);
  const [binaryPhoto, setBinaryPhoto] = useState("");

  useEffect(() => {
    setBlocName(blocData.name);
    if(blocData.photo && blocData.photo !== "ByteArray"){
        setPhoto(blocData.photo);
    }
  }, [blocData]);

  function imageToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const token = getCookie("jwt");
  const updateName = async() => {
    const updatedName = JSON.stringify({
      name: blocName,
    })

    dispatch(updateBloc(token, blocData.blocId, updatedName));
  } 

  const handleFileInput = async (e: any) => {
    setImageEdit(true);
    const file = (e.target as HTMLInputElement)?.files?.[0];
    console.log(file?.name);
    const base64String = await imageToBase64(file);

    setBinaryPhoto(base64String as string);
};

const updateImage = async() => {
    const updatedPhoto = JSON.stringify({
        photo: binaryPhoto,
    });

    dispatch(updateBloc(token, blocData.blocId, updatedPhoto));
    setImageEdit(false);
}


  return (
    <div className="w-full flex items-start justify-between p-9 mb-6">
      <div className="flex items-start justify-center gap-4 w-3/4">
        <div className="relative rounded-full w-20 h-20 group">
          <Image src={photo} alt="img" width={80} height={80} className="rounded-full object-contain aspect-square bg-cover" />

          <div className="absolute w-full h-full inset-0 opacity-0 group-hover:opacity-100 flex justify-center items-center">
            <label htmlFor="input_file" onChange={handleFileInput} className="bg-black w-full h-full flex items-center justify-center bg-opacity-60 rounded-full">
            <input type="file" accept='image/*' id="input_file" className="hidden" />

              {/* <Image src="/icons/edit.svg" alt="edit" width={50} height={50} /> */}
              <AiOutlineCamera className="text-[#ffffffc2] text-4xl" />
            </label>
          </div>
          {
            imageEdit ? (

                <button onClick={updateImage} className="absolute left-[15px] top-[74px] bg-primary px-2 py-1 rounded-sm text-xs" >Save</button>
            ) : null
          }
        </div>

        <div className="flex flex-col w-full items-start justify-center">
          <div className="flex items-center gap-6 justify-start">
            <input
              value={blocName}
              readOnly={!isEdit}
              onChange={(e) => setBlocName(e.target.value)}
              className="w-[70%] bg-transparent font-poppins font-bold text-[40px] text-[#FFFFFFCC] border-none focus:border-none focus:outline-none"
            />

            <div
              onClick={() => setIsEdit(!isEdit)}
              className="bg-[#141414] border border-solid rounded-full p-2 border-[#FFFFFF1A]"
            >
              {isEdit ? (
                <AiOutlineSave onClick={updateName} className="opacity-60" />
              ) : (
                <Image
                  src="/icons/edit.svg"
                  alt="edit"
                  width={14}
                  height={14}
                />
              )}
            </div>
          </div>
          {/* {blocName}
          </input> */}
          <div className="font-spacegrotesk font-medium text-base leading-6 text-[#FFFFFFCC]">
            {blocData?.subHeading}
          </div>
        </div>
      </div>
      <TokenCard userData={user} />
    </div>
  );
};

export default BlocHeader;

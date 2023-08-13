"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { getUser, updateUserData } from "../../../services/apiServices";
import Input from "./Input";
import Image from "next/image";
import NewButton from "src/app/components/common/NewButtton";

interface Props{
    closeModal: any
}

const ProfileCard:React.FC<Props> = ({closeModal}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

    const [photo, setPhoto] = useState("/images/User-Profile.png");
    const [binaryPhoto, setBinaryPhoto] = useState("");
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [selected, setSelected] = useState(false);
  const router = useRouter();

  const token = getCookie("jwt");

  useEffect(() => {
    setTimeout(() => {
      if (!token) {
        router.push("/");
      }
    }, 2000);

    if (user) {
        if(user.photo !== ""){
            setPhoto(user?.photo);
        }
      setName(user?.name);
      setOrg(user?.orgName);
    }
  }, [user]);

  const handleOrg = (value: string) => {
    setOrg(value);
  };

  const handleName = (value: string) => {
    setName(value);
  };

  function imageToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
        if (reader.readyState === 2) {
          setPhoto(reader.result as string);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const handleFileInput = async (e: any) => {
    const file = (e.target as HTMLInputElement)?.files?.[0];
    console.log(file?.name);
    const base64String = await imageToBase64(file);

    setBinaryPhoto(base64String as string);
  };

  const handleClick = async () => {
    const updatedData = {
        photo: binaryPhoto !== "" ? binaryPhoto : photo ,
      name: name,
      orgName: org,
    };

    console.log(updatedData);

    const token = await getCookie("jwt");
    const updatedUser = await updateUserData(updatedData, token);
    
    setTimeout(() => {
        dispatch(getUser(token));
    }
    , 1000);

    console.log(updatedUser);
  };



  return (
    <div className="w-[485px] flex flex-col gap-8 p-8 items-start justify-start bg-modalBg">
      <div className="w-full text-whitey font-poppins text-2xl font-semibold">Edit Profile</div>
      <div className="w-full flex items-center justify-center">
      <div className="w-[100px] h-[100px] relative flex items-center justify-center rounded-full group">
          <Image src={photo} width={100} height={100} alt="group" className="rounded-full" />
          <div className="absolute w-full h-full inset-0 opacity-0 group-hover:opacity-100 flex justify-center items-center">
            <label
              htmlFor="input_file"
              onChange={handleFileInput}
              className="bg-[#383838] w-full h-full flex items-center justify-center bg-opacity-50 rounded-full p-2"
            >
              <input
                type="file"
                accept="image/*"
                id="input_file"
                className="hidden"
              />

              {/* <Image src="/icons/edit.svg" alt="edit" width={50} height={50} /> */}
              <div className="text-center text-white text-base font-medium font-spacegrotesk">Edit</div>
            </label>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="title text-sm font-normal text-whitey font-spacegrotesk pl-2">
          Full Name
        </div>
        <Input
          icon="/icons/v3icons/user2.svg"
          value={name}
          onChangeVal={handleName}
        />
      </div>
      <div className="w-full">
        <div className="title text-sm font-normal text-whitey font-spacegrotesk pl-2">
          Organisation
        </div>
        <Input icon="/icons/v3icons/org.svg" value={org} onChangeVal={handleOrg} />
      </div>
      <div className="flex w-full items-center justify-center gap-3">
        <NewButton text='Cancel' loading={false} classProperty={`!bg-compColor !hover:bg-compColor w-1/2 border border-solid border-borderColor`} buttonFunction={closeModal} />
        <NewButton text='Save Changes' loading={false} classProperty="w-1/2" buttonFunction={handleClick} />
      </div>
    </div>
  );
};

export default ProfileCard;

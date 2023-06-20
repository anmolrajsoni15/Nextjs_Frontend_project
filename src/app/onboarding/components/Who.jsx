"use client";

import React, { useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import Dropdown from "./Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "cookies-next";
// import { updateUserData } from "src/app/Redux/Actions/userAction";
import { updateUserData, getUser } from "../../services/apiServices";
import { useRouter } from "next/navigation";

function Who({ incrementCnt }) {

  const [user, setUser] = useState({nameing: ""});
  const [name, setName] = useState("");
  const [org, setOrg] = useState('');
  const [designation, setDesignation] = useState('');
  const router = useRouter();

  useEffect(() => {
    
    const token = getCookie("jwt");
    if (!token) {
      router.push("/");
    }
  
    const fetchData = async () => {
      try {
        const data = await getUser(token);
        if (data) {
          setUser(data);
          setName(data.name);
          setOrg(data.orgName);
          setDesignation(data.designation);
        } else {
          console.log("Failed to fetch user data");
        }
      } catch (error) {
        console.log("Failed to fetch user data", error);
      }
    };
  
    fetchData();
  }, []);
  
  const handleChange = (value) => {
    setOrg(value);
  }

  const handleDesig = (value) => {
    setDesignation(value);
  }

  const handleClick = async() => {
    const updatedData = {
      orgName: org,
      designation: designation,
    }

    const token = await getCookie('jwt');
    const updatedUser = await updateUserData(updatedData, token);
    console.log(updatedUser);
    
    incrementCnt();
  };


  return (
    <>
      <div className="sm:w-11/12 md:w-11/12 lg:w-1/2 m-5 p-8 md:p-4 md:py-4 lg:p-16 lg:py-4 bg-[#181818] flex gap-5 flex-col border-2 border-solid rounded-md border-[#ffffff2f]">
        <div className="w-full font-spacegrotesk text-2xl leading-9 font-medium tracking-[-0.03em] text-white">
          Let&apos;s setup your account
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="w-full">
            <div className="title text-sm font-normal text-slate-300 leading-4 pl-2">
              Full Name
            </div>
            <Input
              icon={<PersonOutlineOutlinedIcon />}
              value={name}
              editable={false}
            />
          </div>
          <div className="w-full">
            <div className="title text-sm font-normal text-slate-300 leading-4 pl-2">
              Organisation
            </div>
            <Input
              icon={<CorporateFareOutlinedIcon />}
              value={org}
              editable={true}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <div className="title text-sm font-normal text-slate-300 leading-4 pl-2">
              Team Function
            </div>
            <div>
              <Dropdown icon={<WorkOutlineOutlinedIcon />} setValue = {handleDesig} userData = {user} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-3/5 md:w-1/5" onClick={handleClick}>
        <Button value="Next" />
      </div>
    </>
  );
}

export default Who;

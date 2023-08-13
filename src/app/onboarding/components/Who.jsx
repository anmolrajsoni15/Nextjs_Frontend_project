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
import { updateUserData } from "../../services/apiServices";
import { useRouter } from "next/navigation";

function Who({ incrementCnt }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [designation, setDesignation] = useState("Choose your position");
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
      setName(user?.name);
      setOrg(user?.orgName);
    }
  }, [user]);

  const handleChange = (value) => {
    setOrg(value);
  };

  const handleDesig = (value) => {
    setDesignation(value);
  };

  const handleClick = async () => {
    const updatedData = {
      orgName: org,
      designation: designation,
    };

    const token = await getCookie("jwt");
    const updatedUser = await updateUserData(updatedData, token);
    console.log(updatedUser);

    incrementCnt();
  };

  const handleSelect = (event) => {
    if (event.target.checked) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  };

  return (
    <>
      <div className="sm:w-11/12 md:w-11/12 lg:w-1/2 m-5 p-8 md:p-4 md:py-4 lg:p-16 lg:py-16 bg-[#181818] flex gap-5 flex-col border-2 border-solid rounded-md border-[#ffffff2f]">
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
              <Dropdown
                icon={<WorkOutlineOutlinedIcon />}
                setValue={handleDesig}
                userData={user}
              />
            </div>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="w-[5%] pl-3">
            <div className="relative inline-block w-5 h-5 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name={`confirm`}
                id={`confirm`}
                onChange={(event) => handleSelect(event)}
                className="opacity-0 w-5 h-5 absolute cursor-pointer"
              />
              <label
                htmlFor={`confirm`}
                className={`${
                  selected
                    ? "bg-[#0784C6] border-[#024a1a]"
                    : "bg-[#ffffffcc] border-[#383838]"
                } toggle-label flex items-center justify-center overflow-hidden h-5 rounded cursor-pointer border border-solid`}
              >
                <svg
                  className={`${
                    selected ? "" : "hidden"
                  } fill-current text-white w-[10px] h-[10px] mx-auto my-auto`}
                  viewBox="0 0 20 20"
                >
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>
              </label>
            </div>
            </div>
            <div className="w-[90%]">
              You consent to store and analyse the questions you ask to improve
              Bloc&apos;s accuracy and provide better responses, as described in our
              <a href="/dataAndPrivacy" target="_blank" className="ml-1 underline">
              Data & Privacy Policy.
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-3/5 md:w-1/5">
      <button onClick={handleClick} disabled={!selected} className={` ${selected ? "cursor-pointer hover:bg-sky-500" : "cursor-not-allowed hover:bg-sky-600"} border-none w-full p-3 rounded-lg bg-sky-600 text-base leading-5 font-medium font-spacegrotesk `}>
        Next
    </button>
      </div>
    </>
  );
}

export default Who;

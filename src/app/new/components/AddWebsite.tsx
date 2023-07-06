import React, { useState } from "react";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { addWebsites } from "../../services/apiServices";
import { useDispatch } from "react-redux";
import { addWebsite } from "../../Redux/features/Addwebsite";

const AddWebsite = () => {
  const dispatch = useDispatch();

  const [url, setUrl] = useState("");
  const handleAddWebsite = async() => {
    const jwtToken = getCookie("jwt");
    const blocId = getCookie("blocId");

    await dispatch(addWebsite({url: url}));
    setTimeout(() => {
      setUrl("");
    }
    , 100);

    const res = await addWebsites(jwtToken, url, blocId);
    console.log(res);
  };


  return (
    <div className="flex items-center justify-center gap-5 w-3/4 h-12 ">
      <div className="flex items-center justify-start w-[85%] h-full border border-solid border-[#ffffff2d] rounded-md">
        <div className="w-[15%] border-r border-solid border-[#ffffff2d] h-full flex items-center justify-center text-[#FFFFFFCC] font-spacegrotesk text-lg">
          https://
        </div>
        <div className="w-[85%]">
          <input
            type="text"
            placeholder="www.yourwebsite.xyz"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="bg-transparent border-none outline-none w-full text-[#FFFFFFCC] font-spacegrotesk text-lg placeholder:text-[#FFFFFF7d] font-medium px-5"
          />
        </div>
      </div>
      <div className="flex items-center justify-center w-[15%] h-full rounded-md">
        <button onClick={handleAddWebsite} className="bg-[#ffffff2f] border-none outline-none text-sm font-spacegrotesk text-[#ffffff7d] placeholder:text-[#FFFFFF33] font-medium flex items-center justify-start rounded-md h-full w-full">
          <Image
            src="/icons/plus.svg"
            width={16}
            height={16}
            alt="block"
            className="mx-3"
          />
          <div className="">Add Website</div>
        </button>
      </div>
    </div>
  );
};

export default AddWebsite;

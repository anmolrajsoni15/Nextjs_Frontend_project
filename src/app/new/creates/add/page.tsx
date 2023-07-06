"use client";

import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { getCookie, setCookie } from "cookies-next";
import {
  getAllIntegrationOfBloc,
  getPrivateChatId,
  getPublicChatId,
  getUser,
} from "../../../services/apiServices";
import TokenCard from "../../components/TokenCard";
import ProgressBar from "../../components/ProgressBar";
import UploadFile from "../../components/UploadFile";
import AddWebsite from "../../components/AddWebsite";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import WebsiteAdded from "../../components/WebsiteAdded";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import UploadFile from "../../../components/dashboard/UploadFile"

const NewAdd = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const urls = useSelector((store: RootState) => store.addWebsite.urls);
    // const [user, setUser] = React.useState<any>({});
    const {user, loading} = useSelector((state: RootState) => state.user);
    const chatId = useSelector((state: RootState) => state.newBlocState.chatId);

  const blocId = getCookie("blocId");
  const getAllIntegrationData = async () => {
    const userToken = getCookie("jwt");
    console.log(blocId);
    console.log(userToken);
    const res = await getAllIntegrationOfBloc(blocId, userToken);
    console.log(res);
  };


    const token = getCookie('jwt');
    useEffect(() => {
        async function fetchData() {
            dispatch(getUser(token));
            // setUser(res);
        }
        fetchData();

        if(chatId !== undefined){
          setCookie('chatId', chatId);
        }

    }, [dispatch])

    const handleClick = async() => {
        dispatch(getPrivateChatId(token, blocId));
        router.push('/new/publish')
    }
  return (
    <div>
    <main className="w-full h-full flex">
      <Sidebar userData={user} />
      <div className="w-full h-full flex flex-col items-center justify-start ml-20 md:ml-24">
        <div className="w-full flex items-center justify-end p-9">
          <TokenCard userData={user} />
        </div>
        <div className="flex flex-col items-center justify-center gap-9 w-full">
          <div className="text-center font-poppins font-bold text-4xl text-[#FFFFFFCC]">
            New Bloc
          </div>
          <ProgressBar c1="bg-[#0784C6]" c2="bg-[#BAE7FF]" />
        </div>
        <div className="flex flex-col items-center justify-center gap-10 w-full my-6">
          <div className="flex flex-col items-center justify-center w-full gap-4">
            <div className="font-poppins font-semibold text-[#FFFFFFCC] text-2xl">Connect your website</div>
            <AddWebsite />
            <div className="w-full flex items-center justify-center flex-col">
              {urls?.map((item: any, index: any) => (
                <div key={index} className="">
                  <WebsiteAdded key={index} inputVal={item.url} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full gap-4">
            <div className="font-poppins font-semibold text-[#FFFFFFCC] text-2xl">Import files</div>
            <UploadFile />
          </div>

          <div className="flex flex-col items-center justify-center w-full gap-4">
            {/* <button
              onClick={getAllIntegrationData}
              className="
            w-[512px] text-center rounded-[12px]  border-[1px] border-borderColor hover:border-white hover:cursor-pointer flex flex-col items-center py-4 space-y-2
          "
            >
              Check Integrations
            </button> */}
            <div className="flex flex-col items-center justify-between w-1/2 gap-7">
              <div className="text-center underline font-spacegrotesk font-medium text-[14px] text-[#FFFFFFBF]">add more data sources</div>
              <div className="flex items-center justify-around w-full">
                <Link href="/new/creates">
                <button className="rounded-[5px] px-11 py-2 text-center text-sm font-spacegrotesk font-medium text-[#FFFFFFCC] bg-[#292929]">
                  previous
                </button>
                </Link>
                <button onClick={handleClick} className="rounded-[5px] px-11 py-2 text-center text-sm font-spacegrotesk font-medium text-[#FFFFFFCC] bg-[#0784C6]">
                  next step
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </div>
  );
}

export default NewAdd;

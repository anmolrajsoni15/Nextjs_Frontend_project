"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  getUser,
  getAllIntegrationOfBloc,
  getBlocData,
  getPrivateChatId,
} from "../../../../services/apiServices";
import { getCookie, setCookie } from "cookies-next";
import Sidebar from "../../../components/Sidebar";
import NewChatContainer from "../../../components/NewChatContainer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Redux/store";
import BlocHeader from "../../../components/BlocHeader";
import Addwebsite from "../../../components/AddWebsite";
import WebsiteAdded from "../../../components/WebsiteAdded";
import UploadFile from "../../../components/UploadFile";
import { useRouter } from "next/navigation";
import DataSources from "../../../components/DataSources";
import Link from "next/link";


interface Params {
  params: {
    blocId: string;
  };
}

const Page = ({ params: { blocId } }: Params) => {
  const dispatch = useDispatch();
  const router = useRouter();

  setCookie("blocId", blocId);

  // const [user, setUser] = React.useState<any>({});
  const blocData = useSelector(
    (state: RootState) => state.newBlocState.blocData
  );

  const isdeleted = useSelector(
    (state: RootState) => state.newBlocState.isdeleted
  );

  const allIntegrations = useSelector(
    (state: RootState) => state.newBlocState.allIntegrations
  );

  const integrationLoading = useSelector(
    (state: RootState) => state.newBlocState.integrationLoading
  );

  const urls = useSelector((store: RootState) => store.addWebsite.urls);


  const chatId = useSelector((state: RootState) => state.newBlocState.chatId);

  const { user, loading } = useSelector((state: RootState) => state.user);
  const [websites, setWebsites] = useState<any>([]);
  const [files, setFiles] = useState<any>([]);
  const [others, setOthers] = useState<any>([]);

  const token = blocId;
  const userToken = getCookie("jwt");

  useEffect(() => {
    if (allIntegrations.length > 0) {
      setWebsites([]);
      setFiles([]);
      setOthers([]);
      allIntegrations.length > 0 &&
        allIntegrations?.forEach((item: any) => {
          if (item.type === "website") {
            setWebsites((prev: any) => [...prev, item]);
          }
          if (item.type === "file") {
            setFiles((prev: any) => [...prev, item]);
          } else {
            setOthers((prev: any) => [...prev, item]);
          }
        });
    }
  }, [allIntegrations]);

  useEffect(() => {
    dispatch(getAllIntegrationOfBloc(token, userToken));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUser(userToken));
    dispatch(getBlocData(userToken, token));
    dispatch(getPrivateChatId(userToken, token));
  }, [dispatch]);

  useEffect(() => {
    if (chatId !== undefined) {
      setCookie("chatId", chatId);
    }
  }, [chatId]);




  return (
    <main className="w-full h-full flex">
      <Sidebar userData={user} />
      <div className="w-full h-full flex flex-col items-center justify-start ml-20 md:ml-24">
        <BlocHeader blocData={blocData} user={user} />
        <div className="flex flex-col items-center justify-center gap-9 w-full mb-20">
          <div className="w-full flex flex-col items-start justify-center px-16 gap-10">
            <div className="flex flex-col items-center justify-start w-full">
              <DataSources website={websites} file={files} other={others} />
            </div>
            <div className="flex flex-col items-center justify-center gap-10 w-full my-6">
          <div className="flex flex-col items-center justify-center w-full gap-4">
            <div className="font-poppins font-semibold text-[#FFFFFFCC] text-2xl">Connect your website</div>
            <Addwebsite />
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
                <Link href={`/new/bloc/${blocId}`}>
                <button className="rounded-[5px] px-11 py-2 text-center text-sm font-spacegrotesk font-medium text-[#FFFFFFCC] bg-[#292929]">
                  All Done
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;

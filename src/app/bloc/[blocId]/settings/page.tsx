"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "../../../components/dashboard/Sidebar";
import Topbar from "../../../components/dashboard/Topbar";
import Input from "../../../components/dashboard/Input";
import ProgressBar from "../../../components/dashboard/ProgressBar";
import Button from "../../../components/dashboard/Button";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  setBlocName,
  setBasePrompt,
  setSubHeading,
  setInitialMessage,
  setOpenAiModel,
  BlocState,
  setIsPublic
} from "../../../Redux/features/blocState";
import { RootState } from "../../../Redux/store";

const Settings = () => {
  const dispatch = useDispatch();
  const blocState: BlocState = useSelector(
    (store: RootState) => store.blocState
  );
  const router = useRouter();
  const blocId = getCookie("blocId");
  const token = getCookie("jwt");

  interface DataState {
    name?: string;
    subheading?: string;
    image?: File | null;
    initialMsg?: string;
    basePrompt?: string;
    model?: string;
    isPublic?: string;
  }

  const [data, setData] = useState<DataState>({});
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = (e.target as HTMLInputElement)?.files?.[0] || null;
      setData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const applySetting = async () => {
    setIsLoading(true)
    if (typeof blocId == "string") {
      try {
        const bodyData = JSON.stringify({
          name: data.name,
          isPublic: data.isPublic=='true' ? true: false,
          basePrompt: data.basePrompt,
          subHeading: data.subheading,
          initialMessage: data.initialMsg,
          openAiModel: data.model,
          photo:'hello'
          
        });

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "BLOC-ID": blocId,
            "Content-Type": "application/json",
          },
          body: bodyData,
        });
        if (!res.ok) {
          console.log("Network Response for the patch bloc was not ok!");
        }
        if (res.ok) {
          const result = await res.json();
          console.log("Bloc-Patch: ", result);
          router.push(`/bloc/${blocId}`);
          dispatch(setBlocName(result.name));
          dispatch(setSubHeading(result.subHeading));
          dispatch(setBasePrompt(result.basePrompt));
          dispatch(setInitialMessage(result.initialMessage));
          dispatch(setOpenAiModel(result.openAiModel));
          dispatch(setIsPublic(result.isPublic))
        }
      } catch (error) {
        console.log("Error in patch bloc api: ", error);
      }
      finally{
        setIsLoading(false)
      }
    }
  };

  return (
    <div className="text-white flex">
      <Sidebar />
      <section className="px-8 ">
        <Topbar text={"Settings"} />
        <ProgressBar
          c1={"bg-primary"}
          c2={"bg-primary"}
          c3={"bg-primary"}
          c4="bg-white"
        />
        <div className="pt-8">
          <div className=" space-y-8">
            <div className="flex space-x-32">
              <h3 className="w-[280px]">Name</h3>
              <Input
                className={"w-[512px]"}
                placeholder={""}
                value={data.name}
                name="name"
                onChange={handleChange}
              />
            </div>
            {/* <hr /> */}

            <div className="flex space-x-32">
              <h3 className="w-[280px]">Subheading</h3>
              <Input
                className={"w-[512px]"}
                placeholder={""}
                onChange={handleChange}
                name="subheading"
                value={data.subheading}
              />
            </div>
            {/* <hr /> */}
            {/* <div className="flex space-x-32">
              <h3 className="w-[280px]">Image</h3>
              <input
                className="cursor-pointer"
                type="file"
                onChange={handleChange}
                name={"image"}
              />
            </div> */}
            {/* <hr /> */}
            <div className="flex space-x-32 ">
              <h3 className="w-[280px]">Model</h3>
              <div className="space-y-2">
                <select
                  className="bg-black border-[1px] border-borderColor rounded w-[512px] h-[40px] px-2"
                  value={data.model}
                  onChange={handleChange}
                  name="model"
                >
                  <option value={"gpt3.5-turbo"}>GPT 3.5 Turbo</option>
                  <option value={"gpt4"}>GPT 4</option>
                </select>
                {/* <div className="text-xs text-[#959595]">
                  This is a hint text to help user.
                </div> */}
              </div>
            </div>
            {/* <hr /> */}
            <div className="flex space-x-32">
              <h3 className="w-[280px]">Intial Message</h3>
              <div className="space-y-2">
                <Input
                  className={"w-[512px]"}
                  placeholder={""}
                  value={data.initialMsg}
                  name="initialMsg"
                  onChange={handleChange}
                />
                {/* <div className="text-xs text-muted">
                  Write each domain in a new line I which u want bloc to be
                  embedded on
                </div> */}
              </div>
            </div>
            {/* <hr /> */}
            <div className="flex space-x-32 ">
              <h3 className="w-[280px]">Base Prompt</h3>
              <div className="space-y-2">
                <Input
                  className={"w-[512px]"}
                  placeholder={""}
                  value={data.basePrompt}
                  name="basePrompt"
                  onChange={handleChange}
                />
                {/* <div className="text-xs text-[#959595]">
                  This is a hint text to help user.
                </div> */}
              </div>
            </div>
            <div className="flex space-x-32 ">
              <h3 className="w-[280px]">Access</h3>
              <div className="space-y-2">
                <select
                  className="bg-black border-[1px] border-borderColor rounded w-[512px] h-[40px] px-2"
                  value={data.isPublic}
                  onChange={handleChange}
                  name="isPublic"
                >
                  <option value={"true"}>Public</option>
                  <option value={"false"}>Private</option>
                </select>
                {/* <div className="text-xs text-[#959595]">
                  This is a hint text to help user.
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-3 mt-10 ">
          {/* <Link href={`/bloc/${blocId}`}> */}
         
            <Button text={"Cancel"} className={""} disabled={isLoading} onClick={router.back} />
          {/* </Link> */}
          <Button text={isLoading? "Applying":"Apply"} onClick={applySetting} disabled={isLoading} />
        </div>
      </section>
    </div>
  );
};

export default Settings;

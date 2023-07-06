"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getAllBlocs } from "../../services/apiServices";
import { getCookie } from "cookies-next";
import NoBloc from "./NoBloc";
import NoSearch from "./NoSearch";
import SearchBar from "./SearchBar";
import BlocCard from "./BlocCard";
import BlocList from "./BlocList";
// import { Notify } from "../../Notifications/Notify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { deleteBlocUpdate } from "../../Redux/features/blocSlice";

const chatbotsImg = [
  "/images/chatbot1.png",
  "/images/chatbot2.png",
  "/images/chatbot3.png",
  "/images/chatbot4.png",
];

interface Props {
  userName: string;
}

const BlocContainer: React.FC<Props> = ({ userName }) => {
  const dispatch = useDispatch();
  const { allBlocs, loading, error, isdeleted } = useSelector(
    (state: RootState) => state.newBlocState
  );

  const [blocsData, setBlocsData] = useState<any>([]);
  const [layout, setLayout] = useState<string>("grid");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredBlocsData, setFilteredBlocsData] = useState<any[]>([]);

  const token = getCookie("jwt");
  useEffect(() => {
    async function fetchData() {
      await dispatch(getAllBlocs(token));
    }
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (allBlocs) {
      setBlocsData(allBlocs);
    }

    if (error) {
      // Notify("error", error);
    }
    // if (isdeleted) {
    //   // Notify("success", "Bloc deleted successfully");
    //   dispatch(deleteBlocUpdate(false));
    //   setTimeout(async () => {
    //     await dispatch(getAllBlocs(token));
    //   }, 500);
    // }
  }, [allBlocs, error, dispatch]);

  useEffect(() => {
    const filteredBlocs =
      searchQuery !== ""
        ? blocsData.filter((bloc: any) =>
            bloc.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : blocsData;

    let sortedBlocsData = [];
    if (blocsData.length > 0) {
      sortedBlocsData = filteredBlocs.slice().sort((a: any, b: any) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    }

    setFilteredBlocsData(sortedBlocsData);
  }, [blocsData, searchQuery]);

  const getRandomChatBotImage = () => {
    const randomIndex = Math.floor(Math.random() * chatbotsImg.length);
    return chatbotsImg[randomIndex];
  };

  const handleLayout = (value: string) => {
    setLayout(value);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <>
    <div className="flex flex-col w-[94%] gap-5 m-6 mb-14">
      <div className="text-[#FFFFFFCC] font-poppins font-semibold text-[28px]">
        Recent Blocs
      </div>
      {filteredBlocsData.length === 0 ? (
        <div className="flex w-full items-center justify-center">
          {searchQuery !== "" ? (
            <div className="flex flex-col w-full justify-start">
              <div className="flex items-center justify-center gap-4">
                <SearchBar
                  setLayout={handleLayout}
                  layout={layout}
                  onSearch={handleSearch}
                />
                <div className="w-[50px] h-[50px] flex items-center justify-center bg-[#0784C6] rounded-md">
                  <Image
                    src="/icons/plus.svg"
                    width={18}
                    height={18}
                    alt="plus"
                  />
                </div>
              </div>
              <div className="flex w-full items-center justify-center my-24">
                <NoSearch
                  searchQuery={searchQuery}
                  onClearSearch={handleClearSearch}
                />
              </div>
            </div>
          ) : (
            <NoBloc />
          )}
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center gap-4">
            <SearchBar
              setLayout={handleLayout}
              layout={layout}
              onSearch={handleSearch}
            />
            <div className="w-[50px] h-[50px] flex items-center justify-center bg-[#0784C6] rounded-md">
              <Image src="/icons/plus.svg" width={18} height={18} alt="plus" />
            </div>
          </div>
          {loading ? (
            <>
              <div className="my-5">Loading...</div>
            </>
          ) : (
            <>
              {layout === "grid" ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7 w-[94%] mt-6">
                  {filteredBlocsData.map((bloc: any) => (
                    <BlocCard
                      key={bloc.blocId}
                      blocId={bloc.blocId}
                      user={userName}
                      blocImage={bloc?.photo || getRandomChatBotImage()}
                      blocName={bloc.name}
                      createdAt={bloc.createdAt}
                      refreshedAt={bloc.refreshedAt}
                    />
                  ))}
                </div>
              ) : (
                <table className="table-auto border-collapse border border-solid border-[#262626] rounded-2xl! w-[94%] mt-6">
                  <thead className="bg-[#141414] border-b border-solid border-[#262626] rounded-t-2xl">
                    <tr className="text-[#B0B0B0] font-inter font-medium text-xs">
                      <th className="text-left p-4 pl-6">Bloc Name</th>
                      <th className="text-left p-4 pl-0">Date Uploaded</th>
                      <th className="text-left p-4 pl-0">Last Updated</th>
                      <th className="text-left p-4"></th>
                    </tr>
                  </thead>
                  <tbody className="text-[#ffffff7d]">
                    {filteredBlocsData.map((bloc: any) => (
                      <BlocList
                        key={bloc.blocId}
                        blocId={bloc.blocId}
                        user={userName}
                        blocImage={bloc?.photo || getRandomChatBotImage()}
                        blocName={bloc.name}
                        createdAt={bloc.createdAt}
                        refreshedAt={bloc.refreshedAt}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </>
      )}
    </div>
    </>
  );
};

export default BlocContainer;

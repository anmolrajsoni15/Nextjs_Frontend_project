"use client";

import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { getCookie } from "cookies-next";
import { getUser } from "../../services/apiServices";
import TokenCard from "../components/TokenCard";
import ProgressBar from "../components/ProgressBar";
import NewBloc from "../components/NewBloc";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";


const NewCreate = () => {
  const dispatch = useDispatch();
  // const [user, setUser] = React.useState<any>({});
  const { user, loading } = useSelector((state: RootState) => state.user);

  const token = getCookie("jwt");
  useEffect(() => {
    async function fetchData() {
      dispatch(getUser(token));
      // setUser(res);
    }
    fetchData();
  }, [token]);
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
            <ProgressBar c1="bg-[#BAE7FF]" c2="bg-[#B8B8B8]" />
          </div>
          <NewBloc />
        </div>
      </main>
    </div>
  );
};

export default NewCreate;

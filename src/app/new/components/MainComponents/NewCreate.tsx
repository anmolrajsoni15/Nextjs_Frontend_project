"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { getCookie } from "cookies-next";
import { getUser } from "../../../services/apiServices";
import TokenCard from "../../components/TokenCard";
import ProgressBar from "../../components/ProgressBar";
import NewBloc from "../../components/NewBloc";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import TutorialContent from "../TutorialComponent/TutorialContent";
import Header from "../Topbar/Header";
import NewSidebar from "../SidebarContainer/NewSidebar";

const NewCreate = () => {
  const dispatch = useDispatch();
  // const [user, setUser] = React.useState<any>({});
  const { user, loading } = useSelector((state: RootState) => state.user);
  const { newUser, showTutorial } = useSelector(
    (state: RootState) => state.tutorial
  );

  const [progress, setProgress] = useState(25);

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
      <main id="my-container" className="w-full h-full flex">
      <NewSidebar page={"create"} progress={progress} setProgress={setProgress} userData={user} />
        <div className="w-full h-full flex flex-col items-center justify-start ml-20 md:ml-24">
        <Header position={`inside`} url={`/new/dashboard`} tokens={user.credits} />
          <div className="flex flex-col items-center justify-center gap-9 w-full">
            <div className="text-center font-poppins font-bold text-4xl text-[#FFFFFFCC]">
              New Bloc
            </div>
          </div>
          <NewBloc />
        </div>
        {newUser && showTutorial && <div className="cutout2"></div>}
      </main>
    </div>
  );
};

export default NewCreate;

"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Loading from "../../components/LoadingContainer/Loading";
import Container from "../../components/Container";
import { deleteCookie, getCookie, setCookie, setCookies } from "cookies-next";
import { getUser } from "../../../services/apiServices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { refreshBloc } from "../../../Redux/features/blocSlice";
import { clearMessage } from "../../../Redux/features/Message";
import { useRouter } from "next/navigation";
import { clearWebsites } from "../../../Redux/features/Addwebsite";
import { clearFiles } from "../../../Redux/features/UploadFile";
import Welcome from "../../components/TutorialComponent/Welcome";
import TutorialContent from "../TutorialComponent/TutorialContent";
import { setShowTutorial } from "src/app/Redux/features/Tutorial";
import NewSidebar from "../SidebarContainer/NewSidebar";

const NewDashboard = () => {
  const dispatch = useDispatch();
  // const [user, setUser] = React.useState<any>({});
  const router = useRouter();
  const { user, loading } = useSelector((state: RootState) => state.user);
  const { newUser, showTutorial } = useSelector((state: RootState) => state.tutorial);

  const [progress, setProgress] = useState(25);
  // const [showTutorial, setShowTutorial] = useState(false);
  
  const token = getCookie("jwt");
  useEffect(() => {
    if (token === undefined) {
      router.push("/");
    }
    deleteCookie("chatId");
  }, [token]);
  
  useEffect(() => {
    async function fetchData() {
      dispatch(getUser(token));
      // setUser(res);
    }
    fetchData();
    dispatch(refreshBloc());
    dispatch(clearWebsites());
    dispatch(clearFiles());
    dispatch(clearMessage());
  }, []);

  const handleStartTutorial = async() => {
    // setShowTutorial(true);
    await dispatch(setShowTutorial());
  };

  const handleCloseTutorial = () => {
    // setShowTutorial(false);
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <main className="w-full h-full flex" id="my-container">
          {/* <Sidebar userData={user} /> */}
          <NewSidebar page={"dashboard"} progress={progress} setProgress={setProgress} userData={user} />
          <Container userData={user} />
          {newUser && showTutorial === false && (<Welcome onWelcome={handleStartTutorial} onQuit={handleCloseTutorial} />)}
          {newUser && showTutorial && (
            <div className="cutout2"></div>    
          )}
        </main>
      )}
    </div>
  );
};

export default NewDashboard;

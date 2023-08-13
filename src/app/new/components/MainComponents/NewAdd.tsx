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
import WebsiteList from "../../components/WebsiteList";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearMessage } from "../../../Redux/features/blocSlice";
// import UploadFile from "../../../components/dashboard/UploadFile"
import Modal from "react-modal";
import NotionModal from "../../components/NotionModal";
import Welcome from "../TutorialComponent/Welcome";
import MainPage from "../IntegrationSection/MainPage";
import Header from "../Topbar/Header";
import NewSidebar from "../SidebarContainer/NewSidebar";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    opacity: 1,
    border: "1.75px solid rgba(0, 0, 0, 0.83)",
    borderRadius: "18px",
    padding: "none",
    boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.25)",
    transition: "opacity 0.3s ease-in-out",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    transition: "background-color 0.3s ease-in-out",
  },
};

const NewAdd = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { urls, loading: fetchingLoad } = useSelector(
    (store: RootState) => store.addWebsite
  );

  const {message} = useSelector((store: RootState) => store.newBlocState);
  const blocData = useSelector(
    (state: RootState) => state.newBlocState.blocData
  );

  // const [user, setUser] = React.useState<any>({});
  const { user, loading } = useSelector((state: RootState) => state.user);
  const chatId = useSelector((state: RootState) => state.newBlocState.chatId);
  const { newUser, showTutorial } = useSelector(
    (state: RootState) => state.tutorial
  );

  const [showWelcome, setShowWelcome] = React.useState(false);

  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(25);

  useEffect(() => {
    if(showTutorial){
      setTimeout(() => {
        setShowWelcome(true);
      }
      , 1000);
    }
  }, [showTutorial, setShowWelcome])

  const closeWelcome = () => {
    setShowWelcome(false);
  }

  const blocId = getCookie("blocId");
  const getAllIntegrationData = async () => {
    const userToken = getCookie("jwt");
    console.log(blocId);
    console.log(userToken);
    const res = await getAllIntegrationOfBloc(blocId, userToken);
    console.log(res);
  };

  const token = getCookie("jwt");
  useEffect(() => {
    async function fetchData() {
      dispatch(getUser(token));
      // setUser(res);
    }
    fetchData();

    if (chatId !== undefined) {
      setCookie("chatId", chatId);
    }

    if(message === "success"){
      dispatch(clearMessage());
    }

  }, [message, dispatch]);

  const handleClick = async () => {
    dispatch(getPrivateChatId(token, blocId));
    router.push("/new/publish");
  };

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div>
      {newUser && showTutorial && <div className="cutout2"></div>}
      {
        showWelcome && ( <Welcome onWelcome={closeWelcome} onQuit={closeWelcome} /> )
      }
      <main id="my-container" className="w-full h-full flex">
      <NewSidebar page={"create"} progress={progress} setProgress={setProgress} userData={user} />
        <div className="w-full h-full flex flex-col items-center justify-start ml-20 md:ml-24">
          <Header position={`inside`} url={`/new/creates`} tokens={user.credits} />
          <div className="flex flex-col items-center justify-center gap-9 w-full mb-12 mt-3 ">
            <div className="text-center font-poppins font-bold text-4xl text-[#FFFFFFCC]">
              New Bloc
            </div>
          </div>
          <div className="flex flex-col w-full">
            <MainPage blocDetails={blocData} />
          </div>
          {/* <div className="flex flex-col items-center justify-center gap-10 w-full my-6">
            <div className="flex flex-col items-center justify-center w-full gap-4">
              <div className="font-poppins font-semibold text-[#FFFFFFCC] text-2xl">
                Connect your website
              </div>
              <AddWebsite showWelcome={showWelcome} />
              {fetchingLoad ? (
                <div className="font-spacegrotesk font-semibold text-[#FFFFFFCC] text-lg animate-pulse">
                  Fetching webpages....
                </div>
              ) : (
                <div
                  className={`w-full ${
                    urls && urls.length > 0 ? "flex" : "hidden"
                  } items-center justify-center flex-col`}
                >
                  <WebsiteList data={urls} />
                </div>
              )}
            </div>
            <div className="flex flex-col items-center justify-center w-full gap-4">
              <div className="font-poppins font-semibold text-[#FFFFFFCC] text-2xl">
                Import files
              </div>
              <UploadFile />
            </div>

            <div className="flex flex-col items-center justify-center w-full gap-4">
              <div className="flex flex-col items-center justify-between w-1/2 gap-7">
              <div onClick={openModal} className="text-center underline font-spacegrotesk font-medium text-[14px] text-[#FFFFFFBF] cursor-pointer">
                  add more data sources
                </div>
                <div className="flex items-center justify-around w-full">
                  <Link href="/new/creates">
                    <button className="rounded-[5px] px-11 py-2 text-center text-sm font-spacegrotesk font-medium text-[#FFFFFFCC] bg-[#292929]">
                      previous
                    </button>
                  </Link>
                  <button
                    onClick={handleClick}
                    className="rounded-[5px] px-11 py-2 text-center text-sm font-spacegrotesk font-medium text-[#FFFFFFCC] bg-[#0784C6]"
                  >
                    next step
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </main>

      {/* <Modal
        isOpen={modalIsOpen}
        //   onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Bloc Name"
        ariaHideApp={false}
        onAfterOpen={() => {
          customStyles.content.opacity = 1;
          customStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0.8)";
        }}
        onAfterClose={() => {
          customStyles.content.opacity = 0;
          customStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0)";
        }}
      >
        <NotionModal closeModals={closeModal} blocData={blocData} />
      </Modal> */}
    </div>
  );
};

export default NewAdd;

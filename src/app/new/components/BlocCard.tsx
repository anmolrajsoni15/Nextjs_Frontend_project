"use client";

import React from "react";
import Image from "next/image";
import { getCookie, setCookie } from "cookies-next";
import { blocExists, deleteBloc, getAllBlocs } from "../../services/apiServices";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { showNotification } from "../../Notifications/NotificationManager";
import ShareModal from "./ShareModal";
import Modal from "react-modal";
import { refreshBloc } from "../../Redux/features/blocSlice";
import DeleteModal from "./DeleteModal";

const customStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    opacity: 1,
    border: "1.75px solid rgba(0, 0, 0, 0.83)",
    borderRadius: "15px",
    padding: "none",
    boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.25)",
    transition: "opacity 0.3s ease-in-out",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    transition: "background-color 0.3s ease-in-out",
  },
};

interface Props {
  blocId: string;
  user: string;
  blocImage: string;
  blocName: string;
  createdAt: string | Date;
  refreshedAt: string | Date;
}

const BlocCard: React.FC<Props> = ({
  blocId,
  user,
  blocImage,
  blocName,
  createdAt,
  refreshedAt,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const url = `https://app.askbloc.ai/bloc/${blocId}`;
  const embedUrl = `https://embed.askbloc.ai/${blocId}`;

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpen2, setIsOpen2] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal2() {
    setIsOpen2(true);
  }

  function closeModal2() {
    setIsOpen2(false);
  }

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isYesterday = (date: Date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    );
  };

  const getFormattedDate = (date: Date) => {
    if (isToday(date)) {
      return "today";
    } else if (isYesterday(date)) {
      return "yesterday";
    } else {
      return `${date.getDate()} ${date.toLocaleString("en-US", {
        month: "long",
      })} ${date.getFullYear()}`;
    }
  };

  const shouldShowRefreshedAt = () => {
    const createdDate = new Date(createdAt);
    const refreshedDate = new Date(refreshedAt);
    const timeDifference = Math.abs(
      refreshedDate.getTime() - createdDate.getTime()
    );
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    return minutesDifference > 1;
  };

  const formatDate = (date: Date) => {
    if (shouldShowRefreshedAt()) {
      if (
        getFormattedDate(date) === "today" ||
        getFormattedDate(date) === "yesterday"
      ) {
        return `Modified ${getFormattedDate(date)}`;
      } else {
        return `Modified on ${getFormattedDate(date)}`;
      }
    } else {
      if (
        getFormattedDate(date) === "today" ||
        getFormattedDate(date) === "yesterday"
      ) {
        return `Created ${getFormattedDate(date)}`;
      } else {
        return `Created on ${getFormattedDate(date)}`;
      }
    }
  };

  const token = getCookie("jwt");
  const handleDelete = async () => {
    dispatch(deleteBloc(token, blocId));
    dispatch(getAllBlocs(token));
    dispatch(refreshBloc())
    showNotification("info", "Bloc has been successfully Deleted!");
  };

  const handleCookiesData = async() => {
    const data = await blocExists(blocId);
      if (data.isPublic) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc/get-public-chatId`,
            {
              headers: {
                "BLOC-ID": blocId,
              },
            }
          );
          if (!res.ok) {
            console.log("Network response for public chatid api was not ok!");
          }
          if (res.ok) {
            const response = await res.json();
            setCookie("chatId", response.chatId);
          }
        } catch (error) {
          console.log("chatId public api error", error);
        }
      }
      else{
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc/get-chatId`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "BLOC-ID": blocId,
              },
            }
          );
          if (!res.ok) {
            console.log("Network response for chatid api was not ok!");
          }
          if (res.ok) {
            const response = await res.json();
            setCookie("chatId", response.chatId);
          }
        } catch (error) {
          console.log("chatId api error", error);
        }
      }
  }

  return (
    <>
      <div onClick={handleCookiesData} className="w-full flex flex-col items-center justify-center gap-3 p-5 bg-[#181818] transition-all duration-300 ease-linear hover:shadow-cardShadow hover:scale-[1.05] hover:-translate-y-1 rounded-xl">
          <Link href={`/new/bloc/${blocId}`}>
        <div className="w-full mx-auto flex items-center justify-center my-1 mb-2">
            <Image src={blocImage} width={50} height={50} alt="bloc" />
        </div>
          {/* </Link> */}
        <div className="flex flex-col items-center justify-center gap-1">
          {/* <Link href={`/new/bloc/${blocId}`}> */}
            <div className="font-spacegrotesk text-center font-medium text-lg leading-6 text-[#FFFFFFCC]">
              {blocName}
            </div>
          <div className="text-center font-spacegrotesk text-xs text-[#FFFFFF99]">
            {formatDate(new Date(createdAt))} by {user && user.split(" ")[0]}
          </div>
        </div>
          </Link>
        <div className="flex gap-2">
          <div
            onClick={() => router.push(`/new/bloc/${blocId}/settings`)}
            className="rounded-full border border-solid border-[#FFFFFF1A] bg-[#141414] p-3"
          >
            <Image src="/icons/edit.svg" width={18} height={18} alt="edit" />
          </div>
          <div
            onClick={openModal}
            className="rounded-full border border-solid border-[#FFFFFF1A] bg-[#141414] p-3"
          >
            <Image src="/icons/share.svg" width={18} height={18} alt="share" />
          </div>
          <div
            onClick={openModal2}
            className="rounded-full border border-solid border-[#FFFFFF1A] bg-[#141414] p-3"
          >
            <Image
              src="/icons/delete.svg"
              width={18}
              height={18}
              alt="delete"
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        //   onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
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
        <ShareModal name={blocName} url={url} embedUrl={embedUrl} BlocId={blocId} homePage={true} />
      </Modal>

      <Modal
        isOpen={modalIsOpen2}
        //   onAfterOpen={afterOpenModal}
        onRequestClose={closeModal2}
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
        <DeleteModal blocId={blocId} closeModal2={closeModal2} />
      </Modal>
    </>
  );
};

export default BlocCard;

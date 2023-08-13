'use client'

import React from "react";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { showNotification } from "../../Notifications/NotificationManager";
import ShareModal from "./ShareModal";
import Modal from "react-modal";
import { refreshBloc } from "../../Redux/features/blocSlice";
import { getCookie } from "cookies-next";
import { deleteBloc, getAllBlocs } from "src/app/services/apiServices";

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
    borderRadius: "10px",
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

const BlocList: React.FC<Props> = ({
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

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const token = getCookie("jwt");
  const handleDelete = async () => {
    dispatch(deleteBloc(token, blocId));
    dispatch(getAllBlocs(token));
    dispatch(refreshBloc())
    showNotification("info", "Bloc has been successfully Deleted!");
  };
  return (
    <>
    <tr className="border-b border-[#ffffff1a] w-full">
    <Link href={`/new/bloc/${blocId}`}>
      <td className="py-4 w-1/2">
        <div className="flex items-center justify-start gap-2 pl-6">
          <div className="">
            <Image
              src={blocImage}
              width={35}
              height={35}
              alt="image"
              className="rounded-full"
            />
          </div>
          <div className="text-[#FFFFFFCC] font-inter text-sm font-medium">
            {blocName}
          </div>
        </div>
      </td>
        </Link>
      <td className="py-4 font-inter text-sm text-[#B0B0B0] w-1/5">
        {format(new Date(createdAt || ""), "MMMM dd, yyyy")}
      </td>
      <td className="py-4 font-inter text-sm text-[#B0B0B0] w-1/5">
        {format(new Date(refreshedAt || ""), "MMMM dd, yyyy")}
      </td>
      <td className="py-4 w-[10%]">
        <div className="flex items-center justify-start gap-5">
          <Image onClick={openModal} src="/icons/share.svg" width={18} height={18} alt="share" />
          <Image onClick={handleDelete} src="/icons/delete.svg" width={18} height={18} alt="delete" />
          <Image onClick={() => router.push(`/new/bloc/${blocId}/settings`)} src="/icons/pen.svg" width={18} height={18} alt="edit" />
        </div>
      </td>
    </tr>
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
    </>
  );
};

export default BlocList;

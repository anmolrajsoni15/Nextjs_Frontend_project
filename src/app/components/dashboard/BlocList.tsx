"use client";
import Link from "next/link";
import React from "react";
import Dropdown from "./Dropdown";
import { setCookie } from "cookies-next";
import { clearFiles } from "../../Redux/features/UploadFile";
import { clearMessage } from "../../Redux/features/Message";
import { useDispatch } from "react-redux";
import { format } from "date-fns";

function BlocList({ key, name, blocId, createdAt, refreshedAt }: any) {
  const dispatch = useDispatch();

  const handleClick = () => {
    setCookie("blocId", blocId);
    dispatch(clearFiles());
    dispatch(clearMessage());
  };

  return (
    <tr
      key={key}
      className=" border-y-[1px] border-borderColor  hover:text-white "
      onClick={handleClick}
    >
      <td className="py-2 px-2 hover:text-white ">
        <Link href={`/bloc/${blocId}`}>{name}</Link>
      </td>
      <td className="">{format(new Date(createdAt || ""), "dd MMMM yyyy")}</td>
      <td>{format(new Date(refreshedAt || ""), "dd MMMM yyyy")}</td>
      <td className="px-4">
        <Dropdown blocId={blocId} />
      </td>
    </tr>
  );
}

export default BlocList;

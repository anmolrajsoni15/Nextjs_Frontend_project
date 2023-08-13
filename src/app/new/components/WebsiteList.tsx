"use client";

import { getCookie } from "cookies-next";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { addWebsites } from "../../services/apiServices";
import { showNotification } from "../../Notifications/NotificationManager";

interface WebsiteListProps {
  data: any;
  isModified: boolean;
  setIsModified: any;
}

const WebsiteList: React.FC<WebsiteListProps> = ({
  data,
  isModified,
  setIsModified,
}: {
  data: string[];
  isModified: boolean;
  setIsModified: any;
}) => {
    const dispatch = useDispatch();
  const uniqueData = Array.from(new Set(data));
  const { postLoading } = useSelector((state: RootState) => state.addWebsite);
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(uniqueData);
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    content: string
  ) => {
    if (event.target.checked) {
      setSelected((prevSelected) => [...prevSelected, content]);
    } else {
      setSelected((prevSelected) =>
        prevSelected.filter((item) => item !== content)
      );
    }
  };

  const token = getCookie("jwt");
  const blocId = getCookie("blocId");

  const handleShowLists = async () => {
    const selectedWebPages = {
      urls: selected,
    };
    await dispatch(addWebsites(token, blocId, selectedWebPages));
    showNotification(
      "info",
      "Website will be added soon. You will be notified via email once done."
    );
    await setIsModified(true);
    console.log(selectedWebPages);
  };

  const totalPages = Math.ceil(uniqueData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, uniqueData.length);
  const currentItems = uniqueData.slice(startIndex, endIndex);

  const truncatePagination = (value: number, min: number, max: number) => {
    if (value < min) return min;
    if (value > max) return max;
    return value;
  };

  return (
    <>
      <table aria-disabled={postLoading} className={`w-full max-w-[100%] rounded-[10px] text-left border-separate border-solid border border-[#262626] ${postLoading ? "animate-pulse" : ""}`}>
        <thead className="w-full">
          <tr className="bg-[#141414] w-full border-b border-solid border-[#262626]">
            <th className="py-4 px-6 w-[10%] font-bold uppercase text-sm text-grey-dark border-b border-solid border-[#262626]">
              <div className="relative inline-block w-4 h-4 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="toggle"
                  id="head-toggle"
                  onChange={handleSelectAll}
                  disabled={postLoading}
                  checked={selected.length === uniqueData.length}
                  className="opacity-0 w-4 h-4 absolute cursor-pointer"
                />
                <label
                  htmlFor="head-toggle"
                  className={`${
                    selected.length === uniqueData.length
                      ? "bg-green-500 border-[#024a1a]"
                      : "bg-[#2f2f2fcc] border-[#383838]"
                  } toggle-label overflow-hidden h-4 rounded cursor-pointer flex items-center justify-center border border-solid`}
                >
                  <svg
                    className={`${
                      selected.length === uniqueData.length ? "" : "hidden"
                    } fill-current text-white w-[10px] h-[10px] mx-auto my-auto`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                  </svg>
                </label>
              </div>
            </th>
            <th className="py-4 px-6 font-medium font-inter uppercase text-sm text-[#B0B0B0] border-b border-solid border-[#262626]">
              URL
            </th>
          </tr>
        </thead>
        <tbody className="w-full">
          {currentItems.map((item) => (
            <tr key={item} className="w-full">
              <td className="py-4 px-6 w-[10%] border-b border-solid border-[#262626]">
                <div className="relative inline-block w-4 h-4 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    name={`toggle-${item}`}
                    id={`toggle-${item}`}
                    onChange={(event) => handleSelect(event, item)}
                    checked={selected.includes(item)}
                    disabled={postLoading}
                    className="opacity-0 w-4 h-4 absolute cursor-pointer"
                  />
                  <label
                    htmlFor={`toggle-${item}`}
                    className={`${
                      selected.includes(item)
                        ? "bg-green-500 border-[#024a1a]"
                        : "bg-[#2f2f2fcc] border-[#383838]"
                    } toggle-label flex items-center justify-center overflow-hidden h-4 rounded cursor-pointer border border-solid`}
                  >
                    <svg
                      className={`${
                        selected.includes(item) ? "" : "hidden"
                      } fill-current text-white w-[10px] h-[10px] mx-auto my-auto`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                  </label>
                </div>
              </td>
              <td title={item} className="py-4 w-[90%] max-w-[500px] text-ellipsis whitespace-nowrap overflow-hidden px-6 cursor-pointer text-[#F0F0F0] font-spacegrotesk font-normal text-base border-b border-solid border-[#262626]">{item}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={`justify-between items-center bg-modalBg border border-solid border-[#262626] rounded-md mt-4 ${totalPages === 1 ? "hidden" : "flex"} `}>
        <div>
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="text-whitey hover:bg-[#292929] cursor-pointer py-[10px] px-4 border-r border-solid border-[#262626]"
            >
              Previous
            </button>
          )}
        </div>
        <div className="flex">
          {Array.from({ length: totalPages }, (_, index) => (
            // Show only a subset of page numbers if there are more than 5 pages
             totalPages <= 5 || (index === 0 || index === totalPages - 1) || (index >= truncatePagination(currentPage - 2, 0, totalPages - 3) && index <= truncatePagination(currentPage + 2, 2, totalPages - 1)) ? (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`${
                  currentPage === index + 1
                    ? "bg-[#292929]"
                    : "bg-transparent"
                } cursor-pointer py-[10px] px-[10px] w-[40px] text-whitey border-r border-solid border-[#262626] `}
              >
                {index + 1}
              </button>
            ) : index === truncatePagination(currentPage - 3, 0, totalPages - 2) || index === truncatePagination(currentPage + 3, 1, totalPages - 1) ? (
              <span key={index} className="text-whitey cursor-pointer py-[10px] px-[10px] w-[40px] border-r border-solid border-[#262626] flex items-center justify-center">
                ...
              </span>
            ) : null
            
          ))}
        </div>
        <div>
          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="text-whitey hover:bg-[#292929] cursor-pointer py-[10px] px-4 "
            >
              Next
            </button>
          )}
        </div>
      </div>
      <button
        disabled={postLoading}
        onClick={handleShowLists}
        className={`px-9 py-2 rounded my-4 active:bg-[#4BA3D1] text-white font-bold text-sm ${postLoading ? "bg-[#0784C6] opacity-60 cursor-not-allowed" : "bg-[#0784C6] opacity-100 cursor-pointer"}`}
      >
        Scrape Webpages
      </button>
    </>
  );
};

export default WebsiteList;

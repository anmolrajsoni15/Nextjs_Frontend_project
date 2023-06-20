"use client";

import React, { useState, useEffect } from "react";
import { getAllTags } from "../../lib/ghost-client";
import type { Tag } from "@tryghost/content-api";
import Link from "next/link";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Dropdown = ({ path }: { path: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [numTagsToShow, setNumTagsToShow] = useState(5);
  const [selectedTag, setSelectedTag] = useState<string | null>(path);
  const [rotateDegree, setRotateDegree] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const tags = await getAllTags();
      setAllTags(tags);
    }
    fetchData();
  }, []);

  const handleOptionClick = (option: React.SetStateAction<string | null>) => {
    setSelectedTag(option);
    setIsOpen(false);
    setRotateDegree(0);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setRotateDegree(isOpen ? 0 : 180);
  };

  return (
    <div className="relative mx-6 w-full h-14 md:h-[62px] my-2 flex flex-row justify-start items-center border-2 border-solid border-[#ffffff2f] rounded-md bg-[#151515]">
      <div className="w-[90%] text-lg p-5 leading-4 font-medium font-spacegrotesk text-[#ffffffcc]">
        {selectedTag === "" ? "Blog Categories" : selectedTag}
      </div>
      <button className="bg-transparent w-[10%]" onClick={toggleDropdown}>
        <KeyboardArrowDownIcon
          style={{
            transform: `rotate(${rotateDegree}deg)`,
            transition: "transform 0.3s ease-in-out",
          }}
        />
      </button>
      {isOpen && (
        <ul className="absolute top-[100%] left-[0%] bg-[#232323] shadow-md rounded-md p-2 mt-2 w-full grid grid-cols-1">
          <Link href="/blog">
            <li
              className="p-2 hover:bg-gray-200 cursor-pointer hover:bg-[#3b3b3b] border-b text-start border-solid border-zinc-500"
              onClick={() => handleOptionClick("")}
            >
              View all
            </li>
          </Link>
          {allTags?.slice(0, numTagsToShow).map((item,index) => {
            return (
              <Link href={`/blog/tags/${item.slug}`} key={item.id}>
                <li
                  className="p-2 hover:bg-gray-200 cursor-pointer hover:bg-[#3b3b3b] border-b text-start border-solid border-zinc-500"
                  onClick={() => handleOptionClick(item.slug)}
                >
                  {item.name
                    ? item.name.charAt(0).toUpperCase() + item.name.slice(1)
                    : ""}
                </li>
              </Link>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

'use client'

import React from "react"
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { getAllTags } from '../../lib/ghost-client'
import type { Tag } from "@tryghost/content-api";

const LeftPart = ({path}:{path:string}) => {
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [numTagsToShow, setNumTagsToShow] = useState(5);
  const [selectedTag, setSelectedTag] = useState<string | null>(path);

  useEffect(() => {
    async function fetchData() {
      const tags = await getAllTags();
      setAllTags(tags);
    }
    fetchData();
  }, []);

  return (
    <div className='flex flex-col gap-8'>
        <div className="heading font-semibold text-2xl leading-8 font-poppins text-[#3AA7FB]">Blog Categories</div>
        <ul className='gap-1 list-none text-base leading-6 font-normal font-spacegrotesk text-[#667085]'>
          <Link href='/blog'>
            <li
              className={`py-2 px-4 rounded-md hover:bg-[#2A2A2D] hover:text-white`}
            >
              View all
            </li>
          </Link>
            {
              allTags?.slice(0, numTagsToShow).map(item => {
                return (
                  <Link href={`/blog/tags/${item.slug}`} key={item?.id || 'x'}>
                    <li
                      className={`py-2 px-4 rounded-md hover:bg-[#2A2A2D] hover:text-white ${
                        selectedTag === item.slug ? 'bg-[#2A2A2D] text-white' : ''
                      }`}
                      onClick={() => setSelectedTag(item.slug)}
                    >
                      {item.name ? item.name.charAt(0).toUpperCase() + item.name.slice(1) : ''}
                    </li>
                  </Link>
                )
              })
            }
        </ul>
        {allTags.length > numTagsToShow && (
          <button onClick={() => setNumTagsToShow(numTagsToShow + 5)}>View More</button>
        )}
    </div>
  )
}

export default LeftPart
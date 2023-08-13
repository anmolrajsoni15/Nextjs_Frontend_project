'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AiOutlineAppstore, AiOutlineMenu } from 'react-icons/ai';

interface Props {
  setLayout: (value: string) => void;
  layout: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ setLayout, layout, onSearch }) => {
  const [selectedFormat, setSelectedFormat] = useState<string>(layout);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setSelectedFormat(layout);
  }, [layout]);

  const handleFormatClick = (iconName: string) => {
    setLayout(iconName);
    setSelectedFormat(iconName);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex items-center bg-[#ffffff23] rounded-md h-[50px] w-full">
      <Image src="/icons/search-lg.svg" width={18} height={18} alt="search" className="mx-5" />
      <input
        type="text"
        placeholder="Search for bloc"
        className="bg-transparent border-none outline-none w-full text-sm font-spacegrotesk text-[#ffffff7d] placeholder:text-[#FFFFFF33] font-medium"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="flex bg-[#000000] p-1 h-3/4 mx-4 items-center justify-center rounded-sm">
        <div
          className={`px-[6px] py-1 rounded-sm ${selectedFormat === 'grid' ? 'bg-[#242424]' : ''}`}
          onClick={() => handleFormatClick('grid')}
        >
          <AiOutlineAppstore />
        </div>
        <div
          className={`px-[6px] py-1 rounded-sm ${selectedFormat === 'bars' ? 'bg-[#242424]' : ''}`}
          onClick={() => handleFormatClick('bars')}
        >
          <AiOutlineMenu />
        </div>
      </div>
      <button
        className="bg-[#0784C6] h-full text-[#FFFFFFD9] font-spacegrotesk font-medium text-sm px-8 py-2 rounded-e-[4px] ml-4"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;

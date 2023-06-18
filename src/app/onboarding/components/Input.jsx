"use client";
import React, {useState, useEffect} from "react";

function Input({ icon, value, editable, onKeyPress, onChange }) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="w-full h-14 md:h-[50px] my-2 flex flex-row justify-start items-center border-2 border-solid border-[#ffffff2f] rounded-md bg-[#292929] hover:bg-[#363636]">
      <div className="icons w-[20%] text-[#f3f3f3cc] flex items-center justify-center">
        {icon}
      </div>
      <div className="w-[80%] text-[13px] leading-4 font-medium font-spacegrotesk text-[#ffffffcc]">
        {/* {value} */}
        <input
          type="text"
          value={inputValue}
          className={`bg-transparent focus:border-none outline-none py-2 ${!editable ? "cursor-pointer w-full" : "w-4/5 border-b-2 border-solid border-zinc-500 pb-1"}`}
          readOnly={!editable}
          onChange={handleInputChange}
          onKeyPress={onKeyPress}
        />
      </div>
    </div>
  );
}

export default Input;
import React from "react";

const Tooltip: React.FC<{ text: string; position: string }> = ({ text, position }) => {
    return (
      <div className={`${position} tooltip z-[1000] font-spacegrotesk font-medium absolute bg-[#272727] text-[#FFFFFFCC] p-[5px] px-[10px] rounded text-sm whitespace-nowrap`}>
        {text}
        <div className="pointer" />
      <style jsx>{`
        .pointer {
          position: absolute;
          left: -6px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 10px 10px 10px 0;
          border-color: transparent #272727 transparent transparent;
        }
      `}</style>
      </div>
    );
  };

export default Tooltip;
  
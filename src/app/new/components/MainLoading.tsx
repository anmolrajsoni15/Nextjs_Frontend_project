import React from "react";

const MainLoading = () => {
  return (
    <>
    <div className="w-screen h-screen flex items-center justify-center">
      <div
        className="w-12 h-12 rounded-full animate-spin
                    border-8 border-solid border-purple-500 border-t-transparent shadow-md"
      ></div>
    </div>
    </>
  );
};

export default MainLoading;

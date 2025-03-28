import React from "react";

const ButtonSqureContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-14 shadow shadow-gray-900/50 bg-white border-[1px] border-gray-900/50 rounded-2xl">
      {children}
    </div>
  );
};

export default ButtonSqureContainer;

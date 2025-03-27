import React from "react";

const ButtonRoundContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-10 shadow shadow-gray-900/50 bg-white border-[1px] border-gray-900/50 rounded-4xl">
      {children}
    </div>
  );
};

export default ButtonRoundContainer;

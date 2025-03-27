import React, { FC } from "react";
import StyledBaseButton from "../StyledBaseButton/StyledBaseButton";
import { IStyledBaseButton } from "@shared/types/Buttons";

interface CallbackButtonProps extends IStyledBaseButton {
  callback: () => void;
  children: React.ReactNode;
}

const CallbackButton: FC<CallbackButtonProps> = ({
  callback,
  style,
  children,
}) => {
  return (
    <StyledBaseButton style={style}>
      <button
        className="w-full h-full flex flex-row justify-between px-5 items-center"
        onClick={() => callback()}
      >
        {children}
      </button>
    </StyledBaseButton>
  );
};

export default CallbackButton;

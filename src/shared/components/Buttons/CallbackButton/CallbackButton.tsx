import React, { FC } from "react";
import StyledBaseContainer from "../../containers/StyledBaseContainer/StyledBaseComponent";
import { IStyledBaseContainer } from "@shared/types/Containers";

interface CallbackButtonProps extends IStyledBaseContainer {
  callback: () => void;
  children: React.ReactNode;
}

const CallbackButton: FC<CallbackButtonProps> = ({
  callback,
  style,
  children,
}) => {
  return (
    <StyledBaseContainer style={style}>
      <button
        className="w-full h-full flex flex-row justify-between px-5 items-center"
        onClick={() => callback()}
      >
        {children}
      </button>
    </StyledBaseContainer>
  );
};

export default CallbackButton;

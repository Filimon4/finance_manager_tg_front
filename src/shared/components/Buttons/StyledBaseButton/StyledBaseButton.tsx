import ButtonSqureContainer from "@shared/components/containers/Buttons/ButtonSqureContainer";
import ButtonRoundContainer from "@shared/components/containers/Buttons/ButtonsRoundContainer";
import type { IStyledBaseButton, TStyleButtons } from "@shared/types/Buttons";
import React, { FC } from "react";

interface StyledButtonProps {
  style: TStyleButtons;
  children: React.ReactNode;
}

const StyledButton: FC<StyledButtonProps> = ({ children, style }) => {
  return (
    <>
      {style == "round" && (
        <>
          <ButtonRoundContainer>{children}</ButtonRoundContainer>
        </>
      )}

      {style == "squre" && (
        <>
          <ButtonSqureContainer>{children}</ButtonSqureContainer>
        </>
      )}
    </>
  );
};

interface StyledBaseButtonProps extends IStyledBaseButton {
  children: React.ReactNode;
}

const StyledBaseButton: FC<StyledBaseButtonProps> = ({ children, style }) => {
  return <StyledButton style={style}>{children}</StyledButton>;
};

export default StyledBaseButton;

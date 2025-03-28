import ButtonSqureContainer from "@shared/components/containers/Buttons/ButtonSqureContainer";
import ButtonRoundContainer from "@shared/components/containers/Buttons/ButtonsRoundContainer";
import type { IStyledBaseContainer, TStyleContainer } from "@shared/types/Containers";
import React, { FC } from "react";

interface StyledButtonProps {
  style: TStyleContainer;
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

interface StyledBaseButtonProps extends IStyledBaseContainer {
  children: React.ReactNode;
}

const StyledBaseContainer: FC<StyledBaseButtonProps> = ({ children, style }) => {
  return <StyledButton style={style}>{children}</StyledButton>;
};

export default StyledBaseContainer;

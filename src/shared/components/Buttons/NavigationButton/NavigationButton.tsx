import { FC } from "react";
import { useNavigate } from "react-router-dom";
import type { IStyledBaseButton } from "@shared/types/Buttons";
import StyledBaseButton from "../StyledBaseButton/StyledBaseButton";

interface NavigationButtonProps extends IStyledBaseButton {
  link: string;
  children: React.ReactNode;
}

const NavigationButton: FC<NavigationButtonProps> = ({
  link,
  style,
  children,
}) => {
  const navigate = useNavigate();

  return (
    <StyledBaseButton style={style}>
      <button
        className="w-full h-full flex flex-row justify-between px-5 items-center"
        onClick={() => navigate(link)}
      >
        {children}
      </button>
    </StyledBaseButton>
  );
};

export default NavigationButton;

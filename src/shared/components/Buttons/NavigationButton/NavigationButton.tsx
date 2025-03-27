import { FC } from "react";
import { useNavigate } from "react-router-dom";
import type { IStyledBaseContainer } from "@shared/types/Containers";
import StyledBaseContainer from "../../containers/StyledBaseContainer/StyledBaseComponent";

interface NavigationButtonProps extends IStyledBaseContainer {
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
    <StyledBaseContainer style={style}>
      <button
        className="w-full h-full flex flex-row justify-between px-5 items-center"
        onClick={() => navigate(link)}
      >
        {children}
      </button>
    </StyledBaseContainer>
  );
};

export default NavigationButton;

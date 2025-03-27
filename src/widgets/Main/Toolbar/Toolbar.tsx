import { ToolCategories } from "@components/Toolbar/ToolCategories/ToolCategories";
import WhitePanelContainer from "@shared/components/containers/WhitePanelContainer/WhitePanelContainer";
import { useToolbarCategory } from "@shared/contexts/ToolbarCategory/useToolbarCategory";
import { ToolbarCategories } from "@shared/types/Toolbar";
import { useCallback } from "react";

const Toolbar = () => {
  const { currentCategory } = useToolbarCategory();

  const toolbarRouter = {
    [ToolbarCategories.overview]: <></>,
    [ToolbarCategories.accounts]: <></>,
    [ToolbarCategories.history]: <></>,
    [ToolbarCategories.summary]: <></>,
  };

  return (
    <div className="h-full w-full flex flex-col gap-1">
      <ToolCategories />
      <WhitePanelContainer>{toolbarRouter[currentCategory]}</WhitePanelContainer>
    </div>
  );
};

export default Toolbar;

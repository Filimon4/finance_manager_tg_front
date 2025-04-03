import CallbackButton from "@shared/components/Buttons/CallbackButton/CallbackButton";
import NavigationButton from "@shared/components/Buttons/NavigationButton/NavigationButton";
import { useToolbarCategory } from "@shared/contexts/ToolbarCategory/useToolbarCategory";
import { ERoutes } from "@shared/types/Routes";
import { ToolbarCategories } from "@shared/types/Toolbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Overview = () => {
  const { setCurrentCategory } = useToolbarCategory();

  const setCategory = (category: ToolbarCategories) => {
    setCurrentCategory(category);
  };


  return (
    <div className="flex flex-col justify-between gap-2 h-full">
      <div className="flex flex-col gap-3">
        <CallbackButton
          style="squre"
          callback={() => setCategory(ToolbarCategories.accounts)}
        >
          <div className="flex flex-row w-full justify-between px-3 items-center cursor-pointer">
            <p>Счета</p>
            <p>Все {">"}</p>
          </div>
        </CallbackButton>
        <CallbackButton
          style="squre"
          callback={() => setCategory(ToolbarCategories.summary)}
        >
          <div className="flex flex-row w-full justify-between px-3 items-center cursor-pointer">
            <p>Категории</p>
            <p>Все {">"}</p>
          </div>
        </CallbackButton>
        <NavigationButton link={ERoutes.report} style="squre">
          <div className="flex flex-row w-full justify-between px-3 items-center cursor-pointer">
            <p>Динамика</p>
            <p>Все {">"}</p>
          </div>
        </NavigationButton>
      </div>

      <NavigationButton link={ERoutes.operation} style="round">
        <div className="flex w-full justify-center items-center cursor-pointer">
          <p>Добавить операцию</p>
        </div>
      </NavigationButton>
    </div>
  );
};

export default Overview;

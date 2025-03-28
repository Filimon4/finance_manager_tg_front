import NavigationButton from "@shared/components/Buttons/NavigationButton/NavigationButton";
import BoxInfo from "@shared/components/Info/BoxInfo/MoneyInfo";
import { ERoutes } from "@shared/types/Routes";

const Accounts = () => {
  return (
    <div className="flex flex-col justify-between gap-2 h-full">
      <BoxInfo style="squre">
        <div className="flex flex-row justify-between items-center w-full h-full px-3">
          <p>Какой-то тип</p>
          <p className="text-2xl">6000</p>
        </div>
      </BoxInfo>

      <NavigationButton link={ERoutes.accounts} style="round">
        <div className="flex w-full justify-center items-center cursor-pointer">
          <p>Добавить счет</p>
        </div>
      </NavigationButton>
    </div>
  );
};

export default Accounts;

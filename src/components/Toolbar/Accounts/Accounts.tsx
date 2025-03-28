import NavigationButton from "@shared/components/Buttons/NavigationButton/NavigationButton";
import { ERoutes } from "@shared/types/Routes";

const Accounts = () => {
  return (
    <div className="flex flex-col justify-between gap-2 h-full">
      <NavigationButton link={ERoutes.accounts} style="round">
        <div className="flex w-full justify-center items-center cursor-pointer">
          <p>Добавить счет</p>
        </div>
      </NavigationButton>
    </div>
  );
};

export default Accounts;

import { DropdownMenu } from "@shared/components/Dropbown/Dropbown";
import { ERoutes } from "@shared/types/Routes";
import { BsGear, BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const dropdownItems = [
    {
      label: "Настройки",
      onClick: () => navigate(ERoutes.settings),
      icon: <BsGear className="inline" />,
    },
  ];

  const photoUrl =
    window?.Telegram?.WebApp?.initDataUnsafe.user?.photo_url ||
    "/icons/anonymous.png";

  return (
    <div className="flex flex-row justify-between h-12 px-4">
      <p
        className="self-center pl-2 cursor-pointer"
        onClick={() => navigate(ERoutes.main)}
      >
        ФинАсистент
      </p>
      <div className="flex flex-row items-center h-full">
        <DropdownMenu items={dropdownItems}>
          <BsThreeDotsVertical size={25} className="cursor-pointer" />
        </DropdownMenu>
        <img
          className="rounded-br-ful h-[45px] w-[45px] p-1 color-white"
          src={photoUrl}
          alt="Аватарка"
        />
      </div>
    </div>
  );
};

export default Header;

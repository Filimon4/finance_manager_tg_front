import { ERoutes } from "@shared/types/Routes";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-between h-12 px-4">
      <p
        className="self-center pl-2 cursor-pointer"
        onClick={() => navigate(ERoutes.main)}
      >
        ФинАсистент
      </p>
      <div className="flex flex-row items-center h-full">
        <BsThreeDotsVertical size={25} />
        <img
          className="rounded-br-ful h-[50px] w-[50px] p-1"
          src="/images/snowman.png"
          alt="sdf"
        />
      </div>
    </div>
  );
};

export default Header;

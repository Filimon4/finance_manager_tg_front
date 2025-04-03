import NavigationButton from "@shared/components/Buttons/NavigationButton/NavigationButton";
import BoxInfo from "@shared/components/Info/BoxInfo/BoxInfo";
import { ERoutes } from "@shared/types/Routes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Accounts = () => {
  const { data } = useQuery<{ data: { accounts_overview: any[] } }>({
    queryKey: ["cash_accounts"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACK_END_URL}/api/cash_accounts/overview`,
        {
          params: {
            tg_id: 1289261150,
          },
        }
      );
      return res;
    },
    staleTime: 30000,
  });

  return (
    <div className="flex flex-col justify-between gap-2 h-full">
      {data &&
      "accounts_overview" in data.data &&
      data.data?.accounts_overview?.length > 0 ? <>
        {data.data.accounts_overview.map((oper, i) => (
          <BoxInfo style={"squre"} key={i}>
            <div className="flex flex-row justify-between items-center w-full h-full px-3">
              <p>{oper.account_name}</p>
              <p className="text-2xl">{oper.current_balance || 0}</p>
            </div>
          </BoxInfo>
        ))}
      </> : <>
        <p className="flex w-full justify-center">
          Нет счетов
        </p>
      </>  
      }

      <NavigationButton link={ERoutes.accounts} style="round">
        <div className="flex w-full justify-center items-center cursor-pointer">
          <p>Добавить счет</p>
        </div>
      </NavigationButton>
    </div>
  );
};

export default Accounts;

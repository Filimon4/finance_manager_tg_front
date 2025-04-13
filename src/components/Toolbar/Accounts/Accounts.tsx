import NavigationButton from "@shared/components/Buttons/NavigationButton/NavigationButton";
import BoxInfo from "@shared/components/Info/BoxInfo/BoxInfo";
import { ERoutes } from "@shared/types/Routes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Accounts = () => {
  const navigate = useNavigate();
  const { data } = useQuery<{ data: { accounts_overview: any[] } }>({
    queryKey: ["cashAccounts"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACK_END_URL}/api/cash_accounts/overview`,
        {
          params: {
            tg_id:
              window?.Telegram.WebApp.initDataUnsafe?.user?.id || 1289261150,
          },
        }
      );
      return res;
    },
    staleTime: 30000,
  });

  return (
    <div className="flex flex-col gap-2 justify-between h-full">
      <div className="h-full w-full flex flex-col gap-4 overflow-x-hidden overflow-auto">
        {data &&
        "accounts_overview" in data.data &&
        data.data?.accounts_overview?.length > 0 ? (
          <>
            {data.data.accounts_overview.map((account, i) => {
              const isIncome = account.current_balance >= 0;
              const amountPrefix = isIncome ? "+" : "-";

              return (
                <BoxInfo style={"squre"} key={i}>
                  <div
                    className="flex flex-row justify-between items-center w-full h-full px-3 cursor-pointer"
                    onClick={() => {
                      navigate(ERoutes.edit_account, { state: { id: account.id } })
                    }}
                  >
                    <p>{account.account_name}</p>
                    <p
                      className={`text-2xl ${
                        isIncome ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {amountPrefix} {Math.abs(account.current_balance) || 0}
                    </p>
                  </div>
                </BoxInfo>
              );
            })}
          </>
        ) : (
          <>
            <p className="flex w-full justify-center">Нет счетов</p>
          </>
        )}
      </div>

      <NavigationButton link={ERoutes.accounts} style="round">
        <div className="flex w-full justify-center items-center cursor-pointer">
          <p>Добавить счет</p>
        </div>
      </NavigationButton>
    </div>
  );
};

export default Accounts;

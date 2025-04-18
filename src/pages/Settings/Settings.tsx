import CallbackButton from "@shared/components/Buttons/CallbackButton/CallbackButton";
import { MainContainer } from "@shared/components/containers/MainContainer/MainContainer";
import WhitePanelContainer from "@shared/components/containers/WhitePanelContainer/WhitePanelContainer";
import FormList from "@shared/components/Form/FormList";
import { ERoutes } from "@shared/types/Routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Header from "@widgets/Main/Header/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigator = useNavigate();
  const queryClient = useQueryClient();

  const { data: allCashAccounts } = useQuery({
    queryKey: ["allCashAccounts"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACK_END_URL}/api/cash_accounts/all`,
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

  const { data: mainAccount } = useQuery({
    queryKey: ["mainAccount"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACK_END_URL}/api/cash_accounts/main`,
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

  const setMainCashAccount = useMutation({
    mutationFn: async (newOperation: { id: number }) => {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACK_END_URL}/api/cash_accounts/main`,
        newOperation,
        {
          params: {
            tg_id:
              window?.Telegram.WebApp.initDataUnsafe?.user?.id || 1289261150,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["mainAccount"] });
      queryClient.refetchQueries({ queryKey: ["operations"] });
    },
    onError: (error) => {
      console.error("Error creating operation:", error);
    },
  });

  const updateMainCashAccount = (id: number) => {
    setMainCashAccount.mutate({ id: +id });
  };

  return (
    <MainContainer>
      <div className={`flex flex-col w-full h-full text-white`}>
        <Header />
        <div className="flex flex-col h-full py-5 text-lg">
          <div className="flex flex-2 pl-8 items-end w-full">
            <h1 className="pb-7 text-3xl">Настройки</h1>
          </div>
          <div className="h-full w-full flex flex-col flex-8 ">
            <WhitePanelContainer>
              <div className="p-4 flex flex-col h-full gap-4">
                <CallbackButton
                  callback={() => navigator(ERoutes.reminders)}
                  style="squre"
                >
                  <div className="w-full h-full flex justify-start items-center px-2 cursor-pointer">
                    <p>Напоминания</p>
                  </div>
                </CallbackButton>
                <div>
                  <p className="px-2">
                    Основной счёт:{" "}
                    {mainAccount?.data?.main?.name || "Не выбран"}
                  </p>
                  <FormList
                    items={
                      allCashAccounts?.data?.all.map((t: any) => ({
                        id: t?.id,
                        name: t?.name,
                      })) || []
                    }
                    placeholder="Выбрать счёт"
                    value={mainAccount?.data?.main?.id || ""}
                    setValue={(id) => updateMainCashAccount(+id)}
                  />
                </div>
              </div>
            </WhitePanelContainer>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Settings;

import History from "@components/Toolbar/History/History";
import SimpleLines from "@shared/components/Charts/SimpleLines/SimpleLines";
import { MainContainer } from "@shared/components/containers/MainContainer/MainContainer";
import WhitePanelContainer from "@shared/components/containers/WhitePanelContainer/WhitePanelContainer";
import { useQuery } from "@tanstack/react-query";
import Header from "@widgets/Main/Header/Header";
import axios from "axios";

const Report = () => {
  const { data: allHistory } = useQuery<{
    data: {
      data: {
        month: string;
        year: string;
        month_year: string;
        balance: number;
      }[];
    };
  }>({
    queryKey: ["reminders"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACK_END_URL}/api/account/balance_six_month`,
        {
          params: {
            tg_id: window?.Telegram.WebApp.initDataUnsafe?.user?.id || 1289261150,
          },
        }
      );
      return res;
    },
    staleTime: 30000,
  });

  return (
    <MainContainer>
      <div className={`flex flex-col w-full h-full text-white`}>
        <Header />
        <div className="flex flex-col justify-between h-full">
          <div className="h-max flex-4 flex flex-col justify-between">
            <WhitePanelContainer>
              <div className="flex flex-col justify-between h-full space-y-4">
                <SimpleLines
                  data={
                    allHistory?.data?.data?.map((d) => ({
                      name: d.month,
                      pv: d.balance,
                      amt: 1,
                    })) || []
                  }
                />
              </div>
            </WhitePanelContainer>
          </div>

          <div className="h-max flex-6 p-2">
            <div className="flex flex-col justify-between h-full">
              <div className="flex pl-8 items-end w-full">
                <h1 className="pb-2 text-2xl">История операция</h1>
              </div>
              <div className="h-full w-full flex flex-col">
                <WhitePanelContainer>
                  <div className="w-full h-full p-1 max-h-[420px] overflow-auto overflow-x-hidden">
                    <History />
                  </div>
                </WhitePanelContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Report;

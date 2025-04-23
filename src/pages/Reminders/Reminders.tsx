import NavigationButton from "@shared/components/Buttons/NavigationButton/NavigationButton";
import { MainContainer } from "@shared/components/containers/MainContainer/MainContainer";
import WhitePanelContainer from "@shared/components/containers/WhitePanelContainer/WhitePanelContainer";
import BoxInfo from "@shared/components/Info/BoxInfo/BoxInfo";
import { DayOfWeek, ListDaysOfWeek } from "@shared/types/FormTypes";
import { ERoutes } from "@shared/types/Routes";
import { useQuery } from "@tanstack/react-query";
import Header from "@widgets/Main/Header/Header";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Reminders = () => {
  const navigate = useNavigate();
  const { data: allReminders } = useQuery<{ data: { reminders: any[] } }>({
    queryKey: ["reminders"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACK_END_URL}/api/reminders/users_reminders`,
        {
          params: {
            tg_id: window?.Telegram.WebApp.initDataUnsafe?.user?.id || null,
          },
        }
      );
      return res;
    },
    staleTime: 30000,
  });

  console.log(JSON.stringify(allReminders, null, 2));

  return (
    <MainContainer>
      <div className={`flex flex-col gap-2 justify-between h-full text-white`}>
        <Header />
        <div className="flex flex-col h-full py-5 text-lg">
          <div className="flex flex-2 pl-8 items-end w-full">
            <h1 className="pb-7 text-3xl">Напоминания</h1>
          </div>
          <div className="h-full w-full flex flex-col flex-8 gap-1">
            <WhitePanelContainer>
              <div className="h-full flex flex-col justify-between gap-5">
                <div className="h-full w-ful flex flex-col justify-start gap-5">
                  {allReminders &&
                  "reminders" in allReminders.data &&
                  allReminders.data?.reminders?.length > 0 ? (
                    allReminders.data.reminders.map((rem, i) => (
                      <BoxInfo style={"squre"} key={i}>
                        <div
                          className="flex flex-row justify-between items-center w-full h-full px-3 cursor-pointer"
                          onClick={(_e) => {
                            navigate(ERoutes.edit_reminder, {
                              state: { id: rem.id },
                            });
                          }}
                        >
                          <div className="flex flex-col">
                            <p>
                              {
                                ListDaysOfWeek.find(
                                  //@ts-ignore
                                  (t) => t.id == DayOfWeek[rem.day_of_week]
                                )?.label
                              }
                              {" - "}
                              {`${rem.hour}:00`}
                            </p>
                            <p className="text-sm text-gray-400">
                              {"Сработает: "}
                              {moment(new Date(rem.next_time)).format(
                                "DD-MM-YY HH:mm"
                              )}
                            </p>
                          </div>
                          <div
                            className={`
                              w-5 h-5 rounded-full cursor-pointer transition-colors duration-300
                              ${rem.is_active ? "bg-green-500" : "bg-red-500"}
                            `}
                          />
                        </div>
                      </BoxInfo>
                    ))
                  ) : (
                    <>
                      <p className="flex w-full justify-center">
                        Нет напоминаний
                      </p>
                    </>
                  )}
                </div>

                <NavigationButton link={ERoutes.reminder} style="round">
                  <div className="flex w-full justify-center items-center cursor-pointer text-black">
                    <p>Добавить напоминание</p>
                  </div>
                </NavigationButton>
              </div>
            </WhitePanelContainer>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Reminders;

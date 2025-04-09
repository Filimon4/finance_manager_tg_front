import CallbackButton from "@shared/components/Buttons/CallbackButton/CallbackButton";
import { MainContainer } from "@shared/components/containers/MainContainer/MainContainer";
import WhitePanelContainer from "@shared/components/containers/WhitePanelContainer/WhitePanelContainer";
import { ERoutes } from "@shared/types/Routes";
import { useMutation } from "@tanstack/react-query";
import Header from "@widgets/Main/Header/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigator = useNavigate();

  const createCategoryMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACK_END_URL}/api/export/export_request`
      );
      return response.data;
    },
    onSuccess: () => {},
    onError: (error) => {
      console.error("Error creating operation:", error);
    },
  });

  const onExportClick = () => {
    createCategoryMutation.mutate()
  }

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
                  callback={() => console.log("buttons")}
                  style="squre"
                >
                  <div className="w-full h-full flex justify-start items-center px-2 cursor-pointer" onClick={onExportClick}>
                    <p>Экспорт в exel</p>
                  </div>
                </CallbackButton>
                <CallbackButton
                  callback={() => navigator(ERoutes.reminders)}
                  style="squre"
                >
                  <div className="w-full h-full flex justify-start items-center px-2 cursor-pointer">
                    <p>Напоминания</p>
                  </div>
                </CallbackButton>
              </div>
            </WhitePanelContainer>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Settings;

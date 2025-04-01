import { MainContainer } from "@shared/components/containers/MainContainer/MainContainer"
import WhitePanelContainer from "@shared/components/containers/WhitePanelContainer/WhitePanelContainer"
import Header from "@widgets/Main/Header/Header"

const Settings = () => {
  return (
    <MainContainer>
      <div className={`flex flex-col w-full h-full text-white`}>
        <Header />
        <div className="flex flex-col h-full py-5 text-lg">
          <div className="flex flex-2 pl-8 items-end w-full">
            <h1 className="pb-7 text-3xl">Настройки</h1>
          </div>
          <div className="h-full w-full flex flex-col flex-8 gap-1">
            <WhitePanelContainer>
              <div className="p-4 flex flex-col justify-between h-full">
                
              </div>
            </WhitePanelContainer>
          </div>
        </div>
      </div>
    </MainContainer>
  )
}

export default Settings
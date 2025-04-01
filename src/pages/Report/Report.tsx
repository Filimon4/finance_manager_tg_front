import SimpleLines from "@shared/components/Charts/SimpleLines/SimpleLines"
import { MainContainer } from "@shared/components/containers/MainContainer/MainContainer"
import WhitePanelContainer from "@shared/components/containers/WhitePanelContainer/WhitePanelContainer"
import Header from "@widgets/Main/Header/Header"

const Report = () => {
  return (
    <MainContainer>
      <div className={`flex flex-col w-full h-full text-white`}>
        <Header />
        <div className="flex flex-col justify-between h-full">
            <div className="h-max flex-4 flex flex-col justify-between">
              <WhitePanelContainer>
                <div className="flex flex-col justify-between h-full space-y-4">
                  <SimpleLines />
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
                      <div className="p-4 flex flex-col justify-between h-full">
                        <div className="space-y-4">
                          
                        </div>
                      </div>
                    </WhitePanelContainer>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </MainContainer>
  )
}

export default Report
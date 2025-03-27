import { Route, Routes } from "react-router-dom";
import Main from "@pages/Main/Main";
import Report from "@pages/Report/Report";
import Settings from "@pages/Settings/Settings";
import NotFound from "@pages/NotFound/NotFound";
import { ERoutes } from "@shared/types/Routes";

function App() {
  if (window?.Telegram?.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
  }
  return (
    <Routes>
      <Route path={ERoutes.main} element={<Main />} />
      <Route path={ERoutes.report} element={<Report />} />
      <Route path={ERoutes.settings} element={<Settings />} />
      <Route path={ERoutes.notFound} element={<NotFound />} />
      <Route path={ERoutes.operation} element={<>Операции</>} />
    </Routes>
  );
}

export default App;

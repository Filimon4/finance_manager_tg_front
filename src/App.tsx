import { Route, Routes } from "react-router-dom";
import Main from "@pages/Main/Main";
import Report from "@pages/Report/Report";
import Settings from "@pages/Settings/Settings";
import NotFound from "@pages/NotFound/NotFound";
import { ERoutes } from "@shared/types/Routes";
import Form from "@pages/Form/Form";
import { FormType } from "@shared/types/FormTypes";

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
      <Route
        path={ERoutes.operation}
        element={<Form type={FormType.operations} />}
      />
      <Route
        path={ERoutes.accounts}
        element={<Form type={FormType.account} />}
      />
      <Route
        path={ERoutes.category}
        element={<Form type={FormType.category} />}
      />
    </Routes>
  );
}

export default App;

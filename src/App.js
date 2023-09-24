import React from "react";
import CustomInput from "./components/atoms/inputs/CustomInput";
import CustomSelect from "./components/atoms/inputs/CustomSelect";
import RoutesRoot from "./routesRoot";
import CustomRadio from "./components/atoms/inputs/CustomRadio";
import CustomCheckbox from "./components/atoms/inputs/CustomCheckbox";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AuthState from "./context/auth/authState";
import AlertState from "./context/alert/alertState";
import { SnackbarProvider } from "notistack";
import Alerts from "./utils/alert";
import EsmRegState from "./context/EsmRegistration/esmRegState";
import CommonState from "./context/common/commonState";

global.site_url = process.env.REACT_APP_DOMAIN;
// global.registerToken = true;

function App() {
  return (
    <>
      <AuthState>
        <CommonState>
          <EsmRegState>
            <AlertState>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <SnackbarProvider maxSnack={3}>
                  <div className="App">
                    <Alerts />
                    <RoutesRoot />
                  </div>
                </SnackbarProvider>
              </LocalizationProvider>
            </AlertState>
          </EsmRegState>
        </CommonState>
      </AuthState>
    </>
  );
}

export default App;

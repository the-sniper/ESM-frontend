import React from "react";
import CustomInput from "./components/atoms/inputs/CustomInput";
import CustomSelect from "./components/atoms/inputs/CustomSelect";
import RoutesRoot from "./routesRoot";
import CustomRadio from "./components/atoms/inputs/CustomRadio";
import CustomCheckbox from "./components/atoms/inputs/CustomCheckbox";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AuthState from "./context/auth/authState";
import AlertState from "./context/alert/alertState";
import { SnackbarProvider } from "notistack";
import Alerts from "./utils/alert";

function App() {
  global.site_url = process.env.REACT_APP_DOMAIN;

  return (
    <>
      <AuthState>
        <AlertState>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SnackbarProvider maxSnack={3}>
              <div className="App">
                <Alerts />
                <RoutesRoot />
              </div>
            </SnackbarProvider>
          </LocalizationProvider>
        </AlertState>
      </AuthState>
    </>
  );
}

export default App;

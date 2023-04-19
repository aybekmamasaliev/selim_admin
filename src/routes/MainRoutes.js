import React from "react";
import { Route, Routes } from "react-router-dom";

import LogIn from "../components/LogIn/LogIn";
import PrivateAuthRoute from "./PrivateRoute";
import DashboardRoutes from "./DashboardRoutes";

function MainRoutes({ isLoggedIn }) {
  return (
    <Routes>
      <Route
        path={"/login"}
        element={
          <PrivateAuthRoute
            component={<LogIn />}
            fallbackPath="/dashboard/main_info"
            isLoggedIn={!isLoggedIn}
          />
        }
      />
      <Route
        path={"/dashboard/*"}
        element={
          <PrivateAuthRoute
            component={<DashboardRoutes />}
            isLoggedIn={isLoggedIn}
            fallbackPath="/login"
          />
        }
      />
    </Routes>
  );
}

export default MainRoutes;

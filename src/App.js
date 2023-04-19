import Menu from "./components/Menu/Menu";
import "./reset.scss";
import "./variables.scss";
import "./App.scss";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { setCredentials } from "./store/slices/authSlice";
import { getStoragedItem } from "./utils/helpers/localStorageHelpers";
import { TOKEN_KEY } from "./utils/constants/general";
import MainRoutes from "./routes/MainRoutes";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getStoragedItem(TOKEN_KEY);
    if (token) {
      const authorizedUserCredentials = { access: token };
      dispatch(setCredentials(authorizedUserCredentials));
    }
  }, []);
  return (
    <div className="app">
      <Menu isLoggedIn={isLoggedIn} />
      <main className="main">
        <MainRoutes isLoggedIn={isLoggedIn} />
      </main>
    </div>
  );
}

export default App;

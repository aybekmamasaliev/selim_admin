import Button from "../Button/Button";
import styles from "./LogIn.module.scss";
import { useEffect, useState } from "react";
import { useFetchTokenMutation } from "../../store/apis/accountsApi";
import { setCredentials } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { TOKEN_KEY } from "../../utils/constants/general";
import { addItemToStorage } from "../../utils/helpers/localStorageHelpers";

function LogIn() {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [fetchToken, { data: tokens }] = useFetchTokenMutation();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const nextUserData = { ...userData };
    nextUserData[e.target.name] = e.target.value;
    setUserData(nextUserData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchToken(userData);
  };

  useEffect(() => {
    if (!tokens) return;

    dispatch(setCredentials(tokens));
    addItemToStorage(TOKEN_KEY, tokens.access);
    sessionStorage.setItem("tokenRefresh", tokens.refresh);
  }, [tokens, dispatch]);

  return (
    <article className={styles.article}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.field}>
          <label htmlFor="username" className={styles.label}>
            Логин
          </label>
          <input
            id="username"
            name="username"
            autoComplete="username"
            className={styles.input}
            value={userData.username}
            onChange={handleChange}
          />
        </p>
        <p>
          <label htmlFor="password" className={styles.label}>
            Пароль
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className={styles.input}
            value={userData.password}
            autoComplete="current-password"
            onChange={handleChange}
          />
        </p>
        <Button>Войти</Button>
      </form>
    </article>
  );
}

export default LogIn;

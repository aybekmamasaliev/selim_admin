import { useDispatch } from "react-redux";
import "./Menu.scss";
import { NavLink, useLocation, Link } from "react-router-dom";
import { logOut } from "../../store/slices/authSlice";

function Menu({ isLoggedIn }) {
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(logOut());
  };

  const isLinkActive = (path) => {
    return pathname.startsWith(`/dashboard/${path}`) ? "active" : null;
  };
  return (
    <section className="menu">
      <nav role="navigation">
        <ul>
          {/* <li>
            <NavLink to="/main_info">Главная страница</NavLink>
          </li> */}
          {isLoggedIn ? (
            <>
              <li
                style={{
                  color: isLinkActive("main_info") ? "blue" : "inherit",
                }}
              >
                <Link to="/dashboard/main_info">Главная страница </Link>
              </li>
              <li>
                <NavLink to="/dashboard/advantages">Преимущества</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/services">Сервис</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/news">Новости</NavLink>
              </li>
              <li>
                <NavLink to="/dashboardcategories">Категории</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reviews">Отзывы</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/feedback">Вопросы</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/products">Галерея</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin_users">Администраторы</NavLink>
              </li>
              <li onClick={signOut}>Выйти</li>
            </>
          ) : (
            <li>
              <NavLink to="/login">Логин</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </section>
  );
}

export default Menu;

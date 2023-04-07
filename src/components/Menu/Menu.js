import './Menu.scss';
import { NavLink } from 'react-router-dom';

function Menu() {
  return (
    <section className="menu">
      <nav role="navigation">
        <ul>
          <li>
            <NavLink to="/main_info">Главная страница</NavLink>
          </li>
          <li>
            <NavLink to="/advantages">Преимущества</NavLink>
          </li>
          <li>
            <NavLink to="/services">Сервис</NavLink>
          </li>
          <li>
            <NavLink to="/news">Новости</NavLink>
          </li>
          <li>
            <NavLink to="categories">Категории</NavLink>
          </li>
          <li>
            <NavLink to="/reviews">Отзывы</NavLink>
          </li>
          <li>
            <NavLink to="/feedback">Вопросы</NavLink>
          </li>
          <li>
            <NavLink>Галерея</NavLink>
          </li>
          <li>
            <NavLink to="/login">Логин</NavLink>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Menu;

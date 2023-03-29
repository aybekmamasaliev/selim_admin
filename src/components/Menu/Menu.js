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
            <NavLink>Преимущества</NavLink>
          </li>
          <li>
            <NavLink>Сервис</NavLink>
          </li>
          <li>
            <NavLink>Новости</NavLink>
          </li>
          <li>
            <NavLink>Категории</NavLink>
          </li>
          <li>
            <NavLink>Отзывы</NavLink>
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
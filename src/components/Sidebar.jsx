import "../css/Sidebar.css";
import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Dashboard", path: "/dashboard", icon: "fa-solid fa-chart-line" },
  { label: "Tasks and Assignments", path: "/tasks-assignments", icon: "fa-solid fa-list-ul" },
  { label: "Profile", path: "/profile", icon: "fa-solid fa-user" },
  { label: "Settings", path: "/settings", icon: "fa-solid fa-gear" },
];

function Sidebar() {
  return (
    <nav className="sidebar">
      <ul className="sidebar__menu">
        {NAV_ITEMS.map((item) => (
          <li
            key={item.path}
            className="sidebar__menu-item"
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `sidebar__menu-link ${isActive ? "sidebar__menu-link--active" : ""}`}
            >
              <i className={item.icon}></i>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;

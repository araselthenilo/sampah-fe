import "../css/MainLayout.css";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="main-layout">
      <Sidebar className="main-layout__sidebar" />
      <div className="main-layout__outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;

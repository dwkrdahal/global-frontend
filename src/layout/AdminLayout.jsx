import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {TopNavbar, SideNavbar, Footer} from "../components/admin";

import "../assets/css/style.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "bootstrap/dist/js/bootstrap.bundle.js";


export default function AdminLayout() {
  return (
    <>
      <TopNavbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <SideNavbar/>
        </div>
        <div id="layoutSidenav_content">
          <Outlet/>
          <Footer />
        </div>
      </div>
    </>
  );
}

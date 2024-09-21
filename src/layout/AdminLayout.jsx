import { Outlet } from "react-router-dom";
import { TopNavbar, SideNavbar, Footer } from "../components/admin";

import "../assets/css/style.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { Helmet } from "react-helmet";

export default function AdminLayout() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/svg+xml" href="images/navbar.png" />
        <title>Admin | Global Construction & Engineering</title>
        <meta
          name="description"
          content="Admin Panel for Global Construction & Engineering, manage projects, clients, and team efficiently."
        />
        {/* Meta Keywords */}
        <meta
          name="keywords"
          content="admin, construction management, project management, client management, team management"
        />
      </Helmet>

      <TopNavbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <SideNavbar />
        </div>
        <div id="layoutSidenav_content">
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
}

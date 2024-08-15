import "@fortawesome/fontawesome-free/js/all.js";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const TopNavbar = () => {
  useEffect(() => {
    const sidebarToggle = document.body.querySelector("#sidebarToggle");
    if (sidebarToggle) {
      //remember toogle state while refreshing
      if (localStorage.getItem("sb|sidebar-toggle") === "true") {
        document.body.classList.toggle("sb-sidenav-toggled");
      }

      sidebarToggle.addEventListener("click", (event) => {
        event.preventDefault();
        document.body.classList.toggle("sb-sidenav-toggled");
        localStorage.setItem(
          "sb|sidebar-toggle",
          document.body.classList.contains("sb-sidenav-toggled")
        );
      });
    }
  });

  const navigate = useNavigate();

  return (
    <>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <NavLink className="navbar-brand ps-3" to="/admin">
          Diwar Estate
        </NavLink>

        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          to="#!"
        >
          <i className="fas fa-bars"></i>
        </button>

        <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <div class="input-group">
            <input
              class="form-control"
              type="text"
              placeholder="Search for..."
              aria-label="Search for..."
              aria-describedby="btnNavbarSearch"
            />
            <button class="btn btn-primary" id="btnNavbarSearch" type="button">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </form>

        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <NavLink
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              to="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user fa-fw"></i>
            </NavLink>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <NavLink className="dropdown-item" to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" to="/admin/me">
                  Profile
                </NavLink>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={(e) => {
                    localStorage.removeItem("user_token");
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default TopNavbar;

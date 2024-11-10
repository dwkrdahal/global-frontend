import "@fortawesome/fontawesome-free/js/all.js";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const TopNavbar = () => {
  // State to manage sidebar toggle
  const [sidebarToggled, setSidebarToggled] = useState(false);

  useEffect(() => {
    // On component mount, check localStorage for sidebar state
    const storedSidebarToggle = localStorage.getItem("sb|sidebar-toggle");
    if (storedSidebarToggle === "true") {
      setSidebarToggled(true);
      document.body.classList.add("sb-sidenav-toggled");
    }

    return () => {
      // Clean up - remove class when unmounted if needed
      document.body.classList.remove("sb-sidenav-toggled");
    };
  }, []);

  const handleSidebarToggle = () => {
    const newToggleState = !sidebarToggled;
    setSidebarToggled(newToggleState);
    
    // Toggle the sidebar class
    if (newToggleState) {
      document.body.classList.add("sb-sidenav-toggled");
    } else {
      document.body.classList.remove("sb-sidenav-toggled");
    }

    // Persist the state in localStorage
    localStorage.setItem("sb|sidebar-toggle", newToggleState);
  };

  const navigate = useNavigate();

  return (
    <>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <NavLink className="navbar-brand ps-3" to="/admin">
          Global Admin
        </NavLink>

        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          onClick={handleSidebarToggle} // Toggle function on click
        >
          <i className="fas fa-bars"></i>
        </button>

        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="Search for..."
              aria-label="Search for..."
              aria-describedby="btnNavbarSearch"
            />
            <button
              className="btn btn-primary"
              id="btnNavbarSearch"
              type="button"
            >
              <i className="fas fa-search"></i>
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
                  Change Password
                </NavLink>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    localStorage.removeItem("user_token");
                    localStorage.removeItem("user");
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

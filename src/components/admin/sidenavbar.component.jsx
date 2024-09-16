import { NavLink } from "react-router-dom";

const SideNavbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <nav
        className="sb-sidenav accordion sb-sidenav-dark"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">FEATURES</div>

            {/* DASHBOARD */}

            <NavLink className="nav-link" to="/admin">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Dashboard
            </NavLink>

            {/* MESSAGE */}

            {user.role == "admin" ? (
              <NavLink className="nav-link" to="/admin/message">
                <div className="sb-nav-link-icon">
                  <i className="fa-solid fa-message"></i>
                </div>
                Message
              </NavLink>
            ) : (
              ""
            )}

            {/* CONTENT MANAGEMENT */}
            <NavLink
              className="nav-link collapsed"
              to="/admin/user"
              data-bs-toggle="collapse"
              data-bs-target="#collapseContent"
              aria-expanded="false"
              aria-controls="collapseContent"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-edit"></i>
              </div>
              Content
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </NavLink> 

            {/* collapse Menu */}
            <div
              className="collapse"
              id="collapseContent"
              aria-labelledby="headingTwo"
              data-bs-parent="#sidenavAccordion"
            >
              <nav
                className="sb-sidenav-menu-nested nav accordion"
                id="sidenavAccordionPages"
              >
                {/* pages */}
                <NavLink
                  className="nav-link collapsed"
                  to="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#pagesCollapse"
                  aria-expanded="false"
                  aria-controls="pagesCollapse"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-file-alt"></i>
                  </div>
                  Pages
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </NavLink>
                <div
                  className="collapse"
                  id="pagesCollapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordionPages"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <NavLink className="nav-link" to="login.html">
                      Create Pages
                    </NavLink>
                    <NavLink className="nav-link" to="register.html">
                      Manage Pages
                    </NavLink>
                  </nav>
                </div>

                {/* POSTS  */}

                <NavLink
                  className="nav-link collapsed"
                  to="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#pagesCollapsePosts"
                  aria-expanded="false"
                  aria-controls="pagesCollapsePosts"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-newspaper"></i>
                  </div>
                  Posts
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </NavLink>
                <div
                  className="collapse"
                  id="pagesCollapsePosts"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordionPages"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <NavLink className="nav-link" to="401.html">
                      Create Post
                    </NavLink>
                    <NavLink className="nav-link" to="404.html">
                      Manage Posts
                    </NavLink>
                  </nav>
                </div>

                {/* MEDIA LIBRARY */}

                <NavLink
                  className="nav-link collapsed"
                  to="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#pagesCollapseMediaLibrary"
                  aria-expanded="false"
                  aria-controls="pagesCollapseMediaLibrary"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-photo-video"></i>
                  </div>
                  Media Library
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </NavLink>
                <div
                  className="collapse"
                  id="pagesCollapseMediaLibrary"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordionPages"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <NavLink className="nav-link" to="401.html">
                      Upload Files
                    </NavLink>
                    <NavLink className="nav-link" to="404.html">
                      Manage Files
                    </NavLink>
                  </nav>
                </div>
              </nav>
            </div>

            {/* TEAM */}

            <NavLink
              className="nav-link collapsed"
              to="/admin/team"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTeams"
              aria-expanded="false"
              aria-controls="collapseTeams"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-users"></i>
              </div>
              Teams
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </NavLink>
            <div
              className="collapse"
              id="collapseTeams"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <NavLink className="nav-link" to="/admin/team">
                  View Teams
                </NavLink>
                <NavLink className="nav-link" to="/admin/team/create">
                  Add Teams
                </NavLink>
              </nav>
            </div>

            {/* ABOUT */}

            <NavLink
              className="nav-link collapsed"
              to="/admin/about"
              data-bs-toggle="collapse"
              data-bs-target="#collapseAbout"
              aria-expanded="false"
              aria-controls="collapseAbout"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-users"></i>
              </div>
              About
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </NavLink>
            <div
              className="collapse"
              id="collapseAbout"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <NavLink className="nav-link" to="/admin/about/feature">
                  Features
                </NavLink>
                <NavLink className="nav-link" to="/admin/about/create">
                  Add Items
                </NavLink>
              </nav>
            </div>

            {/* SERVICES */}

            <NavLink
              className="nav-link collapsed"
              to="/admin/service"
              data-bs-toggle="collapse"
              data-bs-target="#collapseServices"
              aria-expanded="false"
              aria-controls="collapseServices"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-concierge-bell"></i>
              </div>
              Services
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </NavLink>
            <div
              className="collapse"
              id="collapseServices"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <NavLink className="nav-link" to="/admin/service">
                  View Services
                </NavLink>
                <NavLink className="nav-link" to="/admin/service/create">
                  Add Services
                </NavLink>
              </nav>
            </div>

            {/* PROJECTS */}
            <NavLink
              className="nav-link collapsed"
              to="/admin/project"
              data-bs-toggle="collapse"
              data-bs-target="#collapseProjects"
              aria-expanded="false"
              aria-controls="collapseProjects"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-briefcase"></i>
              </div>
              Projects
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </NavLink>
            <div
              className="collapse"
              id="collapseProjects"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <NavLink className="nav-link" to="/admin/project">
                  View Projects
                </NavLink>
                <NavLink className="nav-link" to="/admin/project/create">
                  Add Projects
                </NavLink>

                <NavLink className="nav-link" to="/admin/project/category">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-tags"></i>
                  </div>
                  Categories
                </NavLink>
              </nav>
            </div>

            {/* GALLERY */}

            <NavLink
              className="nav-link collapsed"
              to="/admin/service"
              data-bs-toggle="collapse"
              data-bs-target="#collapseGallery"
              aria-expanded="false"
              aria-controls="collapseGallery"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-images"></i>
              </div>
              Gallery
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </NavLink>
            <div
              className="collapse"
              id="collapseGallery"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <NavLink className="nav-link" to="/admin/team">
                  Upload Photos
                </NavLink>
                <NavLink className="nav-link" to="/admin/team/add">
                  Manage Albums
                </NavLink>
              </nav>
            </div>

            {/* VACANCIES */}

            <NavLink
              className="nav-link collapsed"
              to="/admin/service"
              data-bs-toggle="collapse"
              data-bs-target="#collapseVacancies"
              aria-expanded="false"
              aria-controls="collapseVacancies"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-bullhorn"></i>
              </div>
              Vacancies
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </NavLink>
            <div
              className="collapse"
              id="collapseVacancies"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <NavLink className="nav-link" to="/admin/team">
                  Post Vacancies
                </NavLink>
                <NavLink className="nav-link" to="/admin/team/add">
                  Manage Applications
                </NavLink>
              </nav>
            </div>

            {/* USER MANAGEMENT */}

            <NavLink
              className="nav-link collapsed"
              to="/admin/service"
              data-bs-toggle="collapse"
              data-bs-target="#collapseUsers"
              aria-expanded="false"
              aria-controls="collapseUsers"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-user-cog"></i>
              </div>
              User Management
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </NavLink>
            <div
              className="collapse"
              id="collapseUsers"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <NavLink className="nav-link" to="/admin/team">
                  Post Users
                </NavLink>
                <NavLink className="nav-link" to="/admin/team/add">
                  Manage Users
                </NavLink>
                <NavLink className="nav-link" to="/admin/team/add">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-user-shield"></i>
                  </div>
                  Roles & Permissions
                </NavLink>
              </nav>
            </div>

            {/* SETTINGS */}

            <NavLink
              className="nav-link collapsed"
              to="/admin/service"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSettings"
              aria-expanded="false"
              aria-controls="collapseSettings"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-cog"></i>
              </div>
              Settings
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </NavLink>
            <div
              className="collapse"
              id="collapseSettings"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <NavLink className="nav-link" to="/admin/team">
                  General Settings
                </NavLink>
                <NavLink className="nav-link" to="/admin/team/add">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-search"></i>
                  </div>
                  SEO Settings
                </NavLink>
                <NavLink className="nav-link" to="/admin/team/add">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-share-alt"></i>
                  </div>
                  Social Media
                </NavLink>
                <NavLink className="nav-link" to="/admin/team/add">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-address-book"></i>
                  </div>
                  Contact Information
                </NavLink>
              </nav>
            </div>

            {/* FEEDBACK AND MESSAGES */}

            <NavLink
              className="nav-link collapsed"
              to="/admin/service"
              data-bs-toggle="collapse"
              data-bs-target="#collapseMessages"
              aria-expanded="false"
              aria-controls="collapseMessages"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-comments"></i>
              </div>
              Messages
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </NavLink>
            <div
              className="collapse"
              id="collapseMessages"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <NavLink className="nav-link" to="/admin/team">
                  Messages
                </NavLink>
                <NavLink className="nav-link" to="/admin/team/add">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-search"></i>
                  </div>
                  Reviews
                </NavLink>
                <NavLink className="nav-link" to="/admin/team/add">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-share-alt"></i>
                  </div>
                  Testimony
                </NavLink>
              </nav>
            </div>

            {/* REPORTS AND LOGS */}

            <NavLink
              className="nav-link collapsed"
              to="/admin/service"
              data-bs-toggle="collapse"
              data-bs-target="#collapseReports"
              aria-expanded="false"
              aria-controls="collapseReports"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              Reports & Logs
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </NavLink>
            <div
              className="collapse"
              id="collapseReports"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <NavLink className="nav-link" to="/admin/team/add">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-history"></i>
                  </div>
                  Activity Logs
                </NavLink>
                <NavLink className="nav-link" to="/admin/team/add">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-file-export"></i>
                  </div>
                  Export Data
                </NavLink>
              </nav>
            </div>

            {/* / ADDONS /

            <div className="sb-sidenav-menu-heading">Addons</div>
            <NavLink className="nav-link" to="charts.html">
              <div className="sb-nav-link-icon">
                <i className="fas fa-chart-area"></i>
              </div>
              Charts
            </NavLink>
            <NavLink className="nav-link" to="table">
              <div className="sb-nav-link-icon">
                <i className="fas fa-table"></i>
              </div>
              Tables
            </NavLink> */}
          </div>
        </div>

        <div className="sb-sidenav-footer">
          <div className="small">Logged in as:</div>
          {user ? user.name : "Loading..."}
        </div>
      </nav>
    </>
  );
};

export default SideNavbar;

import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

//react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// css
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

//layout
import { AdminLayout, HomeLayout, Customerlayout } from "./layout";

// Components
import { ScrollUpButton } from "./components";

// PAGES

// Error page
import ErrorPage from "./pages/ErrorPage";

//Home Pages
import {
  HomePage,
  Project,
  AboutUsPage,
  BlogPage,
  ServicePage,
  ContactPage,
  ProjectDescription,
} from "./pages/HomePage";

// Authentication
import { LoginPage, RegisterPage } from "./pages/auth";

// Admin Pages
import { Dashboard, Users, Tables, Testimony, Banner } from "./pages/AdminPage";
import {
  ListService,
  AdminServicePage,
  CreateService,
} from "./pages/AdminPage/services";

import {
  CreateTeam,
  ListTeam,
  TeamPage,
  EditTeam,
} from "./pages/AdminPage/teams";

import {
  ProjectPage,
  ListProject,
  ProjectDetail,
  CreateProject,
} from "./pages/AdminPage/projects";

import { AboutPage, FeaturePage, ClientLogoPage } from "./pages/AdminPage/about";
import { MessagePage } from "./pages/AdminPage/message";

// Private Routes
function AdminPrivateRoutes({ component: Component }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    //TODO: role check
    if (!user || user?.role != "admin") {
      navigate("/");
    }
  }, [user, navigate]);
  return user?.role == "admin" ? <Component /> : null;
}

function CustomerPrivateRoutes({ component: Component }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(() => {
    //TODO: role check
    if (!user || user?.role != "customer") {
      navigate("/");
    }
  }, [user]);
  user?.role == "customer" ? <Component /> : null;
}

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <ScrollUpButton />

      <Routes>
        {/* HOME LAYOUT */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="project" element={<Project />} />
          <Route path="about-us" element={<AboutUsPage />} />
          <Route path="services" element={<ServicePage />} />
          <Route path="blogs" element={<BlogPage />} />
          <Route path="contact-us" element={<ContactPage />} />
          <Route path="project/:id" element={<ProjectDescription />} />
        </Route>

        {/* ADMIN LAYOUT  */}
        <Route
          path="/admin"
          element={
            <AdminPrivateRoutes component={AdminLayout}></AdminPrivateRoutes>
          }
        >
          <Route index element={<Dashboard />} />

          {/* User Page */}
          <Route path="user" element={<Users />} />

          {/* Team Page */}
          <Route path="team" element={<TeamPage />}>
            <Route index element={<ListTeam />} />
            <Route path="create" element={<CreateTeam />} />
            <Route path=":id" element={<EditTeam />} />
          </Route>

          {/* Project Page */}
          <Route path="project" element={<ProjectPage />}>
            <Route index element={<ListProject />} />
            <Route path="create" element={<CreateProject />} />
            <Route path=":id" element={<ProjectDetail />} />
          </Route>

          {/* Service Page */}
          <Route path="service" element={<AdminServicePage />}>
            <Route index element={<ListService />} />
            <Route path="create" element={<CreateService />} />
          </Route>

          {/* About Page */}
          <Route path="about" element={<AboutPage />}>
            <Route path="feature" element={<FeaturePage />}></Route>
            <Route path="logo" element={<ClientLogoPage />}></Route>
            {/* TODO */}

          </Route>

          {/* Single Pages */}
          <Route path="message" element={<MessagePage />} />
          <Route path="testimony" element={<Testimony />} />
          <Route path="banner" element={<Banner />} />
          <Route path="users" element={<Users />} />

          <Route path="table" element={<Tables />} />
        </Route>

        {/* CUSTOMER LAYOUT */}
        <Route
          path="/customer"
          element={
            <CustomerPrivateRoutes
              component={Customerlayout}
            ></CustomerPrivateRoutes>
          }
        >
          <Route index element={<Dashboard />} />
        </Route>

        {/* 404 Error Page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

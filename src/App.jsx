import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

//react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//layout
import { AdminLayout, HomeLayout, Customerlayout } from "./layout";

//pages
import { LoginPage, RegisterPage } from "./pages/auth";
import { Dashboard, Users, Tables } from "./pages/AdminPage";
import { Services } from "./pages/AdminPage/services";
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

import ErrorPage from "./pages/ErrorPage";

// css
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  HomePage,
  Project,
  AboutUsPage,
  BlogPage,
  ServicePage,
  ContactPage,
  ProjectDescription,
} from "./pages/HomePage";
import { ScrollUpButton } from "./components";

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
          <Route path="project/detail" element={<ProjectDescription />} />
        </Route>

        {/* ADMIN LAYOUT  */}
        <Route
          path="/admin"
          element={
            <AdminPrivateRoutes component={AdminLayout}></AdminPrivateRoutes>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="user" element={<Users />} />

          {/* About Page */}
          {/* TODO */}

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



          <Route path="service" element={<Services />} />
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

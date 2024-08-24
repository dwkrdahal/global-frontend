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
import HomePage from "./pages/HomePage/home.page";

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
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route
          path="/admin"
          element={
            <AdminPrivateRoutes component={AdminLayout}></AdminPrivateRoutes>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="user" element={<Users />} />
          {/* TEAM PAGE */}
          <Route path="team" element={<TeamPage />}>
            <Route index element={<ListTeam />} />
            <Route path="create" element={<CreateTeam />} />
            <Route path=":id" element={<EditTeam />} />
          </Route>

          {/* PROJECT PAGE */}
          <Route path="project" element={<ProjectPage />}>
            <Route index element={<ListProject />} />
            <Route path="create" element={<CreateProject />} />
            <Route path=":id" element={<ProjectDetail />} />
          </Route>

          <Route path="service" element={<Services />} />
          <Route path="table" element={<Tables />} />
        </Route>

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

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

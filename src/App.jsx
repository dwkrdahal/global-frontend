//react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//layout
import {AdminLayout, HomeLayout} from "./layout";

//pages
import {Hero} from "./pages/HomePage";
import {LoginPage, RegisterPage} from "./pages/auth";
import {Dashboard, Services, AddTeam, ViewTeam, Users, Tables } from "./pages/AdminPage";
import ErrorPage from "./pages/ErrorPage";

// css
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

function PrivateRoutes({ component }) {
  let token = localStorage.getItem("user_token");
  
  //TODO: login check
  let isLoggedIn = !!token;

  return isLoggedIn ? component : <Navigate to="/login" />;
}
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Hero />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route
          path="/admin"
          element={<PrivateRoutes component={<AdminLayout />}></PrivateRoutes>}
        >
          <Route index element={<Dashboard />} />
          <Route path="user" element={<Users />} />
          <Route path="team" element={<ViewTeam/>} />
          <Route path="team/add" element={<AddTeam/>} />
          <Route path="service" element={<Services />} />
          <Route path="table" element={<Tables />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

//react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//pages
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomeLayout from "./layout/HomeLayout";
import AdminLayout from "./layout/AdminLayout";
import ErrorPage from "./pages/ErrorPage";
import Users from "./pages/admin/Users";
import AdminPage from "./pages/admin/Home";
import Teams from "./pages/admin/Teams";
import Services from "./pages/admin/Services";

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
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route
          path="/admin"
          element={<PrivateRoutes component={<AdminLayout />}></PrivateRoutes>}
        >
          <Route index element={<AdminPage />} />
          <Route path="user" element={<Users />} />
          <Route path="team" element={<Teams />} />
          <Route path="service" element={<Services />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

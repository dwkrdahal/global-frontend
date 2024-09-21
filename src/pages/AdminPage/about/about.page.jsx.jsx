import React from "react";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import AdminHelmet from "../../../components/admin/admin-helmet.component";

export default function AboutPage() {
  return (
    <>
      <AdminHelmet
        title="About"
        description="Learn more about the mission, vision, and team behind our admin panel for Global Construction & Engineering."
        url="https://globalconstruction.com.np/admin/about"
      />

      <div className="container px-4">
        <Outlet />
      </div>
    </>
  );
}

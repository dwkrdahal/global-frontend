import { Outlet } from "react-router-dom";
import { Header, Footer } from "../components";
import { Helmet } from "react-helmet";

export default function HomeLayout() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Welcome to Global Construction & Engineering, where we bring visionary ideas to life through quality construction and innovative engineering solutions."
        />
        {/* Meta Keywords */}
        <meta
          name="keywords"
          content="construction, engineering, architecture, project management, innovative design, quality construction, Nepal construction"
        />
      </Helmet>
      
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

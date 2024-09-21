import { NavLink } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear(); 
  return (
    <>
      <footer className="py-4 bg-light mt-auto">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between small">
            <div className="text-muted">Copyright &copy; Global Construction & Engineering {currentYear}</div>
            <div>
              <NavLink href="#">Privacy Policy</NavLink>
              &middot;
              <NavLink href="#">Terms &amp; Conditions</NavLink>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

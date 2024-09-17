import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavHashLink } from "react-router-hash-link";
import { FaFacebook, FaInstagram, FaPhone } from "react-icons/fa";

import "./header.css"; // Import your CSS for custom styles
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Adjust scroll threshold as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      className={`navbar ${scrolled ? "scrolled" : ""} ${
        expanded ? "navbar-expanded" : "navbar-collapsed"
      }`}
      fixed="top"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand className="d-flex align-items-center">
          <Link to={"/"}>
            <img src="/images/global-logo.png" height={"50px"} alt="logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse
          id="navbarScroll"
          className={`navbar-collapse ${expanded ? "show" : ""}`}
        >
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <NavLink className="nav-link" to="/about-us">
              About
            </NavLink>
            <NavLink className="nav-link" to="project">
              Projects
            </NavLink>
            <NavLink className="nav-link" to="/services">
              Services
            </NavLink>
            <NavLink className="nav-link" to="/blogs">
              Blogs
            </NavLink>
            <NavHashLink
              className="nav-link"
              to="/contact-us"
              // Callback function to handle the active state
              activeClassName="active"
              isActive={(match, location) => !!match} // Determine if active
            >
              Contact Us
            </NavHashLink>
            <NavLink className="nav-link" to="/login">
              Log In
            </NavLink>
          </Nav>
          <div className="social-icons-container">
            <Nav.Link
              className="social-icon-nav"
              href="https://facebook.com/globalconstructionofficial"
              target="_blank"
            >
              <FaFacebook size={26} />
            </Nav.Link>
            <Nav.Link
              className="social-icon-nav"
              href="https://instagram.com/globalconstruction_group"
              target="_blank"
            >
              <FaInstagram size={26} />
            </Nav.Link>
            <Nav.Link
              className="social-icon-nav"
              href="tel:+977015908145" // For direct phone call
            >
              <FaPhone size={22} />
            </Nav.Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

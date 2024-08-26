import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavHashLink } from "react-router-hash-link";
import { FaFacebook, FaInstagram, FaPhone } from "react-icons/fa";

import "./header.css"; // Import your CSS for custom styles

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
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img src="/images/global-logo.png" height={"50px"} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse
          id="navbarScroll"
          className={`navbar-collapse ${expanded ? "show" : ""}`}
        >
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <NavHashLink className="nav-link" smooth to="/about-us">
              About
            </NavHashLink>
            <NavHashLink className="nav-link" smooth to="project">
              Projects
            </NavHashLink>
            <NavHashLink className="nav-link" smooth to="/services">
              Services
            </NavHashLink>
            <NavHashLink className="nav-link" smooth to="/blogs">
              Blogs
            </NavHashLink>
            <NavHashLink className="nav-link" smooth to="/#contact">
              Contact Us
            </NavHashLink>
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

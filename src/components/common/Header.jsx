import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, Button, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Header.css'; // Import your CSS for custom styles

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Adjust scroll threshold as needed
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      className={`navbar ${scrolled ? 'scrolled' : ''} ${expanded ? 'navbar-expanded' : 'navbar-collapsed'}`}
      fixed="top"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img src="/images/favicon.png" height={"50px"} alt="logo" />
          <i>DiwarEstate</i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className={`navbar-collapse ${expanded ? 'show' : ''}`}>
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <NavLink className="nav-link" to="/admin">Admin</NavLink>
            <NavLink className="nav-link" to="/login">Login</NavLink>
            <NavLink className="nav-link" to="/register">Register</NavLink>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
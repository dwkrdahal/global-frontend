import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";

import { NavLink } from "react-router-dom";

function Header() {
  return (
    <Navbar expand="lg" className="p-3 bg-light" sticky="top">
      <Container>
        <Navbar.Brand href="/admin">
          <img src="/images/favicon.png" height={"50px"} alt="logo" />
          DiwarEstate
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "200px" }}
            navbarScroll
          >
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/admin/user">
              User
            </NavLink>
            <NavLink className="nav-link" to="/admin/team">
              Team
            </NavLink>
            <NavLink className="nav-link" to="/admin/service">
              Service
            </NavLink>
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

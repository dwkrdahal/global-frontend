import { useState } from "react";
import { Container, Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {BreadCrumb} from "../../components"
import "./auth.css"

function RegisterPage() {
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_APP_URL;
  const RegisterURL = URL + "/auth/register";

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    profile: {
      fullName: "",
      contactNumber: "",
      address: "",
    },
    role: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name in user.profile) {
      setUser({
        ...user,
        profile: {
          ...user.profile,
          [name]: value,
        },
      });
    } else {
      setUser({
        ...user,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(user);
      
      
      const response = await fetch(RegisterURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (data.status) {
        console.log(data);

        toast.success(data.msg);
        navigate("/login");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("failed");
    }
  };

  return (
    <Container className="registration-container">
      <BreadCrumb args ="Registration"></BreadCrumb>
    <Form onSubmit={handleSubmit} className="registration-form shadow-lg p-4 rounded">
      <h1 className="text-center mb-4">Registration Page</h1>

      <Form.Group className="mb-3" controlId="formGridUsername">
        <Form.Label>Username *</Form.Label>
        <Form.Control
          type="text"
          name="username"
          placeholder="Enter username"
          required
          value={user.username}
          onChange={handleChange}
          className="form-input"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridEmail">
        <Form.Label>Email *</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          required
          value={user.email}
          onChange={handleChange}
          className="form-input"
        />
      </Form.Group>

      <Row>
        <Form.Group
          className="mb-3"
          as={Col}
          xs={12}
          md={6}
          controlId="formGridPassword"
        >
          <Form.Label>Password *</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            required
            value={user.password}
            onChange={handleChange}
            className="form-input"
          />
        </Form.Group>

        <Form.Group
          className="mb-3"
          as={Col}
          xs={12}
          md={6}
          controlId="formGridConfirmPassword"
        >
          <Form.Label>Confirm Password *</Form.Label>
          <Form.Control
            type="password"
            name="confirm_password"
            placeholder="Confirm password"
            required
            onChange={handleChange}
            className="form-input"
          />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group
          className="mb-3"
          as={Col}
          xs={12}
          md={6}
          controlId="formGridFullName"
        >
          <Form.Label>Full Name *</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            placeholder="Enter full name"
            required
            value={user.profile.fullName}
            onChange={handleChange}
            className="form-input"
          />
        </Form.Group>

        <Form.Group
          className="mb-3"
          as={Col}
          xs={12}
          md={6}
          controlId="formGridContactNumber"
        >
          <Form.Label>Mobile Number *</Form.Label>
          <Form.Control
            type="text"
            name="contactNumber"
            placeholder="Enter contact number"
            minLength={10}
            required
            value={user.profile.contactNumber}
            onChange={handleChange}
            className="form-input"
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress">
        <Form.Label>Address *</Form.Label>
        <Form.Control
          type="text"
          name="address"
          placeholder="Enter address"
          required
          value={user.profile.address}
          onChange={handleChange}
          className="form-input"
        />
      </Form.Group>

      <Row>
        <Form.Group
          className="mb-3"
          controlId="formGridRole"
          as={Col}
          xs={12}
          md={6}
        >
          <Form.Label>Role *</Form.Label>
          <Form.Select
            name="role"
            value={user.role}
            onChange={handleChange}
            className="form-input"
          >
            <option value="architect">Architect</option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
            <option value="project_manager">Project Manager</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit" className="w-100 submit-button">
        Submit
      </Button>
    </Form>
  </Container>
  );
}

export default RegisterPage;


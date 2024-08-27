import { useState } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import {BreadCrumb} from "../../components";
import "./auth.css"

function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
    remember_me: "",
  });

  const URL = "http://localhost:3000";
  const LoginURL = URL + "/auth/login";

  const storeItemInLS = (token, loggedInUser) => {   
    localStorage.setItem("user_token", token);
    localStorage.setItem("user", JSON.stringify({
      id: loggedInUser?._id,
      name: loggedInUser?.profile?.fullName,
      email: loggedInUser?.email,
      role: loggedInUser?.role
    }))
  }

  const handleChange = (e) => {
    let { name, value, checked } = e.target;

    setUser({
      ...user,
      [name]: value,
      remember_me: checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(LoginURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      

      const response_data = await response.json();
      const msg = await response_data.msg;
      const token = await response_data.token;
      const loggedInUser = await response_data.result;

      if (response_data.status) {
        toast.success(msg);
        storeItemInLS(token, loggedInUser);

        if(loggedInUser.role == 'admin'){
          navigate('/admin')
        }else if(loggedInUser.role == 'customer'){
          navigate('/customer')
        } else if (loggedInUser.role == 'project_manager'){
          navigate('/project-manager')
        } else{
          navigate('/')
        }
        
      } else {
        // console.log("failure",response_data);
        toast.error(msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error: while login");
    }
  };

  return (
    <Container className="" >
      <BreadCrumb args="Log In"></BreadCrumb>
      <Row className=" align-items-center justify-content-center p-5">
        {/* Left Side Image */}
        <Col md={6} className="d-none d-md-block">
          <div className="login-image">
            <img
              src="images/banner1.jpg"
              alt="Login Illustration"
              className="img-fluid"
            />
          </div>
        </Col>

        {/* Right Side Form */}
        <Col xs={12} md={6}>
          <div className="login-form">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name="username"
                  minLength={6}
                  required
                  autoComplete="off"
                  value={user.username}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  minLength={8}
                  placeholder=""
                  required
                  autoComplete="off"
                  value={user.password}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  name="remember_me"
                  label="Remember Me"
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Submit
              </Button>

              <div className="login-links mt-3">
                <Link to="/forgot-password" className="d-block text-center">
                  Forgot Password?
                </Link>
                <p className="text-center mt-2">
                  Don't have an account?{' '}
                  <Link to="/register">Register</Link>
                </p>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
      {/* <Form onSubmit={handleSubmit} className="m-4 pb-5 ">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            minLength={6}
            required
            autoComplete="off"
            value={user.username}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            minLength={8}
            placeholder="Password"
            required
            autoComplete="off"
            value={user.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            name="remember_me"
            label="Remember Me"
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form> */}
    </Container>
  );
}

export default LoginPage;

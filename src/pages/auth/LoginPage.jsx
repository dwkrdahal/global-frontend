import { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
    <Container className="" style={{marginTop:"100px"}}>
      <h1 className="text-center m-3">Login Page</h1>
      <Form onSubmit={handleSubmit} className="m-4 pb-5 ">
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
      </Form>
    </Container>
  );
}

export default LoginPage;

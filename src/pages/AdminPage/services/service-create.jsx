import React, { useState } from "react";
import { PageTitle } from "../../../components/admin";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreateService() {
  const URL = import.meta.env.VITE_APP_URL;
  const serviceURL = URL + "/service";
  const navigate = useNavigate();

  const [serviceData, setServiceData] = useState({
    icon: "",
    title: "",
    description: "",
    status: "",
    link: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    setServiceData({ ...serviceData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(serviceData);

    try {
      const response = await fetch(serviceURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the correct headers
        },
        body: JSON.stringify(serviceData),
      });

      const data = await response.json();

      console.log(data);

      if (data.status) {
        toast.success(data.msg);
        navigate("/admin/service");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <PageTitle
        title="Create Service Page"
        breadCrumbs={[
          { name: "Services", path: "/admin/service" },
          { name: "Add Service" },
        ]}
        link={{
          to: "/admin/service",
          label: "List Service",
          icon: "fas fa-eye",
        }}
      />

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formTitle">
          <Form.Label column sm="2">
            Title
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              name="title"
              value={serviceData.title}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formDescription">
          <Form.Label column sm="2">
            Description
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="textarea" 
              rows={3} 
              name="description"
              value={serviceData.description}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formStatus">
          <Form.Label column sm="2">
            Status
          </Form.Label>
          <Col sm="10">
            <Form.Check
              type="radio"
              label="Active"
              name="status"
              value="true" // true as a string
              checked={serviceData.status === true}
              onChange={(e) =>
                handleChange({ target: { name: "status", value: true } })
              }
              inline
            />
            <Form.Check
              type="radio"
              label="Inactive"
              name="status"
              value="false" // false as a string
              checked={serviceData.status === false}
              onChange={(e) =>
                handleChange({ target: { name: "status", value: false } })
              }
              inline
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formIcon">
          <Form.Label column sm="2">
            Icon
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              name="icon"
              value={serviceData.icon}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formLink">
          <Form.Label column sm="2">
            Link
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              name="link"
              value={serviceData.link}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

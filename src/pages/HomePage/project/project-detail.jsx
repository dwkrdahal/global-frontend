import React from "react";
import { Container, Row, Col, Card, Carousel, Badge } from "react-bootstrap";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import "./project.css";
import { BreadCrumb } from "../../../components";

const project = {
  id: "66ab5ba85fdad30c7ac59901",
  title: "Global Project",
  architectureStyle: "Modern",
  projectType: "Architecture",
  buildingType: "Residential",
  description: "A modern residential building with eco-friendly features.",
  projectStatus: "in-progress",
  location: {
    address: "123 Street Name",
    city: "Kathmandu",
    district: "Kathmandu",
    state: "Bagmati",
    country: "Nepal",
    coordinates: {
      longitude: "",
      latitude: "",
    },
  },
  siteArea: {
    value: 2000,
    unit: "sqft",
  },
  builtUpArea: {
    value: 1500,
    unit: "sqft",
  },
  year: {
    start: "2024-01-01T00:00:00.000+00:00",
    completion: "2024-12-31T00:00:00.000+00:00",
  },
  designArchitect: {
    userId: "60d0fe4f5311236168a109ca",
    name: "John Doe",
    email: "john.doe@example.com",
    position: "Junior Architect",
  },
  images: [
    {
      url: "/images/banner1.jpg",
      caption: "Alternative text",
    },
    {
      url: "/images/banner1.jpg",
      caption: "Another image",
    },
    {
      url: "/images/banner1.jpg",
      caption: "Third image",
    },
    {
      url: "/images/banner1.jpg",
      caption: "Fourth image",
    },
    {
      url: "/images/banner1.jpg",
      caption: "Fifth image",
    },
    {
      url: "/images/banner1.jpg",
      caption: "Sixth image",
    },
  ],
  client: {
    name: "Jane Doe",
    contact: {
      email: "jane.doe@example.com",
      phone: ["9876543210", "9876543213"],
    },
  },
  materialsUsed: ["Brick", "Concrete", "Steel"],
  features: ["Solar Panels", "Rainwater Harvesting"],
  createdBy: "66ab14385d7be48f79ee5ec1",
  createdAt: "2024-08-01T09:55:52.363+00:00",
  updatedAt: "2024-08-05T08:17:38.366+00:00",
};

function ProjectDescription() {
  return (
    <>
      <BreadCrumb args="Project Description"></BreadCrumb>
      <Container
        className="project-description-container m-5"
      >
        {/* Project Header */}
        <Row>
          <Col md={8} className="project-header">
            <h1>{project.title}</h1>
            <Badge bg="secondary" className="me-2">
              {project.projectType}
            </Badge>
            <Badge bg="info">{project.architectureStyle}</Badge>
            <Badge bg="success" className="ms-2">
              {project.projectStatus}
            </Badge>
          </Col>
          <Col md={4} className="text-md-end project-header-info">
            <p>
              <FaMapMarkerAlt /> {project.location.address},{" "}
              {project.location.city}
            </p>
            <p>
              <FaCalendarAlt />{" "}
              {new Date(project.year.start).toLocaleDateString()} -{" "}
              {new Date(project.year.completion).toLocaleDateString()}
            </p>
          </Col>
        </Row>

        {/* Project Images Carousel */}
        <Carousel className="my-4 project-carousel">
          {project.images.map((img, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={img.url}
                alt={img.caption}
                style={{ height: "500px", objectFit: "cover" }}
              />
              <Carousel.Caption>
                <h5>{img.caption}</h5>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Project Description and Details */}
        <Row>
          <Col md={8} className="project-details">
            <p>{project.description}</p>

            <p>
              Coordinates: {project.location.coordinates.latitude},{" "}
              {project.location.coordinates.longitude}
            </p>

            <h2>Site Area</h2>
            <p>
              {project.siteArea.value} {project.siteArea.unit}
            </p>

            <h2>Buildup Area</h2>
            <p>
              {project.builtUpArea.value} {project.builtUpArea.unit}
            </p>

            <h2>Materials Used</h2>
            <ul>
              {project.materialsUsed.map((material, index) => (
                <li key={index}>{material}</li>
              ))}
            </ul>

            <h2>Features</h2>
            <ul>
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </Col>

          {/* Sidebar: Client and Architect Details */}
          <Col md={4} className="project-sidebar">
            <Card className="mb-4 p-3 shadow-sm">
              <Card.Body>
                <Card.Title>Client</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {project.client.name}
                </Card.Text>
                <Card.Text>
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${project.client.contact.email}`}>
                    {project.client.contact.email}
                  </a>
                </Card.Text>
                <Card.Text>
                  <strong>Phone:</strong>{" "}
                  {project.client.contact.phone.join(", ")}
                </Card.Text>
              </Card.Body>
            </Card>

            <Card className="mb-4 p-3 shadow-sm">
              <Card.Body>
                <Card.Title>Design Architect</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {project.designArchitect.name}
                </Card.Text>
                <Card.Text>
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${project.designArchitect.email}`}>
                    {project.designArchitect.email}
                  </a>
                </Card.Text>
                <Card.Text>
                  <strong>Position:</strong> {project.designArchitect.position}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProjectDescription;

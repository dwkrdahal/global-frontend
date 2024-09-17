import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { BreadCrumb } from "../../../components";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "./project.css"; // Ensure this imports the slick-carousel CSS

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Service from "../../../service/ImageService";

const myService = new Service();
const URL = import.meta.env.VITE_APP_URL;

function ProjectDescription() {
  const { id } = useParams(); // Get the project ID from URL parameters
  const [project, setProject] = useState(null);

  // Fetch project data based on ID
  const fetchProject = async () => {
    try {
      const response = await fetch(`${URL}/project/${id}`);
      const data = await response.json();
      if (data.status) {
        setProject(data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  // Check if project data is loaded
  if (!project) {
    return <p>Loading...</p>;
  }

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <>
      <BreadCrumb args="Project Description"></BreadCrumb>
      <Container className="project-section project-description-container">
        {/* Project Header */}
        <Row>
          <Col md={8} className="project-header">
            <h1>{project?.title}</h1>
            <Badge bg="secondary" className="me-2">
              {project?.projectType}
            </Badge>
            <Badge bg="info">{project?.architectureStyle}</Badge>
            <Badge bg="success" className="ms-2">
              {project?.projectStatus}
            </Badge>
          </Col>
          <Col md={4} className="text-md-end project-header-info">
            <p>
              <FaMapMarkerAlt /> {project?.location}
            </p>
            <p>
              <FaCalendarAlt />{" "}
              {new Date(project?.year.started).toLocaleDateString()} -{" "}
              {project?.year.completion
                ? new Date(project?.year.completion).toLocaleDateString()
                : "TBD"}
            </p>
          </Col>
        </Row>

        {/* Project Images Slider */}
        <Slider {...sliderSettings} className="my-4 project-slider">
          {project?.images.map((img, index) => (
            <div key={index}>
              <img
                className="d-block w-100"
                src={myService.getRelativePath(img.url)}
                alt={img.caption}
                style={{ height: "500px", objectFit: "cover" }}
              />
            </div>
          ))}
        </Slider>

        {/* Project Description and Details */}
        <Row>
          <Col md={8} className="project-details">
            <div
              dangerouslySetInnerHTML={{ __html: project?.description }}
            ></div>
          </Col>

          {/* Sidebar: Client and Architect Details */}
          <Col md={4} className="project-sidebar">
            <Card className="my-4 shadow-sm">
              <Card.Body>
                <Card.Text>
                  <p>
                    <strong>Site Area :</strong> {project?.siteArea?.value}{" "}
                    {project?.siteArea?.unit}
                  </p>

                  <p>
                    <strong>Built-Up Area: </strong> {project?.builtUpArea?.value}{" "}
                    {project?.builtUpArea?.unit}
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="mb-4 p-3 shadow-sm">
              <Card.Body>
                <Card.Title className="text-center">Client</Card.Title>
                <Card.Text>
                  <strong>{project?.client?.name}</strong>
                </Card.Text>
                <Card.Text>
                  <strong>
                    <a href={`mailto:${project?.client?.email}`}>
                      {project?.client?.email}
                    </a>
                  </strong>
                </Card.Text>
                <Card.Text>
                  <strong>{project?.client?.contact}</strong>
                </Card.Text>
              </Card.Body>
            </Card>

            <Card className="mb-4 p-3 shadow-sm">
              <Card.Body>
                <Card.Title className="text-center">Designer</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {project?.designArchitect?.name}
                </Card.Text>
                <Card.Text>
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${project?.designArchitect?.email}`}>
                    {project?.designArchitect?.email}
                  </a>
                </Card.Text>
                <Card.Text>
                  <strong>Position:</strong> {project?.designArchitect?.position}
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

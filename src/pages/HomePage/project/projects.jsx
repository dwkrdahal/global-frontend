import React, { useEffect, useState } from "react";
import "./project.css";
import { Card, Col, Nav, Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import URL from "../../../config";

const styles = [
  "All",
  "Residential",
  "Commercial",
  "Industrial",
  "Construction",
];

function Projects({ featured }) {
  const [projects, setProjects] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [fadeOut, setFadeOut] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch projects based on the selected style
  const fetchProjects = async () => {
    try {
      const response = await fetch(
        `${URL}/project${featured ? "/featured" : ""}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();

      if (data.status) {
        // Filter results to include only those with isActive: true
        const activeProjects = data.result.filter(
          (project) => project.isActive
        );

        // If featured is true, take only the first 8 projects
        const displayedProjects = featured
          ? activeProjects.slice(0, 8)
          : activeProjects;

        // Set the projects and displayed projects state
        setProjects(activeProjects);
        setDisplayedProjects(displayedProjects);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch projects when component mounts or style changes
  useEffect(() => {
    fetchProjects(selectedStyle);
  }, [selectedStyle, featured]);

  // Handle filtering and transitions
  useEffect(() => {
    if (projects.length > 0) {
      setFadeOut(true);
      const timer = setTimeout(() => {
        const filteredProjects =
          selectedStyle === "All"
            ? projects
            : projects.filter(
                (project) =>
                  project.projectType && // Ensure projectType exists
                  project.projectType.toLowerCase() ===
                    selectedStyle.toLowerCase()
              );

        // Apply search filter to multiple fields
        const searchedProjects = filteredProjects.filter(
          (project) =>
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (project.description &&
              project.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (project.location &&
              project.location
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (project.client &&
              project.client.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (project.architectureStyle &&
              project.architectureStyle
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (project.projectType &&
              project.projectType
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (project.projectStatus &&
              project.projectStatus
                .toLowerCase()
                .includes(searchTerm.toLowerCase()))
        );

        setDisplayedProjects(searchedProjects);
        setFadeOut(false);
      }, 300); // Shortened to 300ms for a quicker response

      return () => clearTimeout(timer);
    }
  }, [selectedStyle, projects, searchTerm]);

  return (
    <>
      <div className="filter text-center mb-4">
        <Nav variant="tabs" className="justify-content-center">
          {styles.map((style) => (
            <Nav.Item key={style}>
              <Nav.Link
                className={`filter-btn ${
                  selectedStyle === style ? "active" : ""
                }`}
                onClick={() => setSelectedStyle(style)}
              >
                {style}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
      <div className="search-container text-center mb-4">
        <Form.Control
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <Button
            variant="secondary"
            onClick={() => setSearchTerm("")}
            className="clear-search"
          >
            Clear
          </Button>
        )}
      </div>
      <Row>
        {displayedProjects.map((project) => (
          <Col
            xl={3}
            lg={4}
            md={6}
            sm={12}
            key={project._id} // Ensure you use a unique key
            className={`mb-4 project-card-container ${
              fadeOut ? "fade-out" : "fade-in"
            }`}
          >
            <Link to={`/project/${project._id}`}>
              <Card className="project-card">
                <Card.Img
                  variant="top"
                  src={(project?.images[0]?.url)} // Assume the first image is the main one
                  alt={project.title}
                  className="project-img"
                />
                <div className="overlay">
                  <Card.Body className="text">
                    <Card.Title className="title">{project.title}</Card.Title>
                    <Card.Text className="location">
                      {project.location}
                    </Card.Text>
                  </Card.Body>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Projects;

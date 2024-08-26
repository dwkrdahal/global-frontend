import React, { useEffect, useState } from 'react'
import "./project.css"; // Ensure this file contains the CSS for styling
import { Card, Col, Nav, Row } from 'react-bootstrap';
import { Button } from '../../../components';


const projects = [
  {
    id: 1,
    image: "images/image-6.jpg",
    title: "Project Title 1",
    location: "Location 1",
    category: "Residential",
  },
  {
    id: 2,
    image: "images/image-5.jpg",
    title: "Project Title 2",
    location: "Location 2",
    category: "Commercial",
  },
  {
    id: 3,
    image: "images/image-7.jpg",
    title: "Project Title 2",
    location: "Location 2",
    category: "Industrial",
  },
  {
    id: 4,
    image: "images/image-5.jpg",
    title: "Project Title 2",
    location: "Location 2",
    category: "Commercial",
  },
  {
    id: 5,
    image: "images/image-7.jpg",
    title: "Project Title 2",
    location: "Location 2",
    category: "Residential",
  },
  {
    id: 6,
    image: "images/image-6.jpg",
    title: "Project Title 2",
    location: "Location 2",
    category: "Residential",
  },
  {
    id: 7,
    image: "images/image-5.jpg",
    title: "Project Title 2",
    location: "Location 2",
    category: "Residential",
  },
];

const categories = ["All", "Residential", "Commercial", "Industrial"];

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setFadeOut(true);
    const timer = setTimeout(() => {
      const filteredProjects =
        selectedCategory === "All"
          ? projects.slice(0, 6) // Show up to 6 projects for 'All'
          : projects
              .filter((project) => project.category === selectedCategory)
              .slice(0, 3); // Show up to 3 projects per category
      setDisplayedProjects(filteredProjects);
      setFadeOut(false);
    }, 500); // Match the duration of the fade-out transition

    return () => clearTimeout(timer);
  }, [selectedCategory]);
  return (
    <>
      <div className="filter text-center mb-4">
          <Nav variant="tabs" className="justify-content-center">
            {categories.map((category) => (
              <Nav.Item key={category}>
                <Nav.Link
                  className={`filter-btn ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <Row>
          {displayedProjects.map((project) => (
            <Col
              xl={3}
              lg={4}
              md={6}
              sm={12}
              key={project.id}
              className={`mb-4 project-card-container ${
                fadeOut ? "fade-out" : "fade-in"
              }`}
            >
              <Card className="project-card">
                <Card.Img
                  variant="top"
                  src={project.image}
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
            </Col>
          ))}
        </Row>
    </>
  )
}

export default Projects

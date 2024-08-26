import React from "react";

export default function Project({}) {
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
                  <Card.Text className="location">{project.location}</Card.Text>
                  <Button variant="primary" className="view-project-btn">
                    View Project
                  </Button>
                </Card.Body>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

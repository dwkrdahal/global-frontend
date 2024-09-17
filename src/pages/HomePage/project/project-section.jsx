import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./project.css"; // Ensure this file contains the CSS for styling
import Projects from "./projects";
import { Link } from "react-router-dom";

const OurProjects = () => {
  return (
    <section id="our-projects">
      <Container>
        <Row className="text-center mb-4">
          <Col>
            <p>PROJECTS</p>
            <h2>Featured Projects</h2>
          </Col>
        </Row>

        <Projects featured={true} />

        <div className="text-center mt-4">
        <Link to="/project">
          <Button variant="info">
            View All Projects
          </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default OurProjects;

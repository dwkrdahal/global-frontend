import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Projects from './projects';
import './project.css';
import { BreadCrumb } from '../../../components';

export default function ProjectPage() {
  return (
    <div className="project-page-container container-fluid">
      {/* Hero Section */}
      <div className="project-page-hero">
        <Container>
          <Row>
            <Col>
              <BreadCrumb args="Projects"></BreadCrumb>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Projects Section */}
      <Container className="projects-section" style={{ marginTop: '40px' }}>
        <Projects />
      </Container>
    </div>
  );
}

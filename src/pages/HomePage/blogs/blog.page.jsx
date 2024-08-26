import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './blog.css';
import { BreadCrumb } from '../../../components';

export default function BlogPage() {
  return (
    <div className="blog-page-container container">
      {/* Hero Section */}
      <div className="blog-page-hero">
        <Container>
          <Row>
            <Col>
              <BreadCrumb args="Blogs"></BreadCrumb>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Blogs Section */}
      <Container className="blogs-section" style={{ marginTop: '40px' }}>
        <h4>No Blogs are written yet</h4>
      </Container>
    </div>
  );
}

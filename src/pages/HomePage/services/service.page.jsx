import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Services from './services';
import './services.css';
import { BreadCrumb } from '../../../components';

export default function ServicePage() {
  return (
    <div className="service-page-container container">
      {/* Hero Section */}
      <div className="service-page-hero">
        <Container>
          <Row>
            <Col>
              <BreadCrumb args="Services"></BreadCrumb>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Services Section */}
      <Container className="services-section" style={{ marginTop: '40px' }}>
        <Services />
      </Container>
    </div>
  );
}

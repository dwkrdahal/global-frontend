import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Services from "./services";
import "./services.css";
import { BreadCrumb } from "../../../components";
import { Helmet } from "react-helmet";

export default function ServicePage() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Services | Global Construction & Engineering</title>

        {/* Meta Description */}
        <meta
          name="description"
          content="Explore a range of construction and engineering services including architectural design, construction management, sustainable renovations, and infrastructure development across Nepal. Expert solutions for residential, commercial, and public projects."
        />

        {/* Meta Keywords */}
        <meta
          name="keywords"
          content="construction services Nepal, architectural design, construction management, sustainable renovations, project consultation, building security, residential projects, commercial developments, infrastructure development"
        />

        {/* Canonical Link */}
        <link
          rel="canonical"
          href="https://www.globalconstruction.com.np/services"
        />

        {/* Open Graph (OG) Tags for Facebook and Social Sharing */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Services - Global Construction & Engineering"
        />
        <meta
          property="og:description"
          content="Global Construction & Engineering offers a wide array of services, from architectural design and sustainable renovations to construction management and infrastructure development across Nepal."
        />
        <meta
          property="og:url"
          content="https://www.globalconstruction.com.np/services"
        />
        <meta
          property="og:image"
          content="https://www.globalconstruction.com.np/images/logo.jpg"
        />
        <meta
          property="og:site_name"
          content="Global Construction & Engineering"
        />

        {/* Twitter Card for Social Sharing */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Services | Global Construction & Engineering"
        />
        <meta
          name="twitter:description"
          content="Discover Global Construction & Engineering's services, from architectural design and sustainable renovations to construction management and infrastructure development across Nepal."
        />
        <meta
          name="twitter:image"
          content="https://www.globalconstruction.com.np/images/logo.jpg"
        />

        {/* Robots Meta Tag */}
        <meta name="robots" content="index, follow" />
      </Helmet>

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
        <Container className="services-section" style={{ marginTop: "40px" }}>
          <Services />
        </Container>
      </div>
    </>
  );
}

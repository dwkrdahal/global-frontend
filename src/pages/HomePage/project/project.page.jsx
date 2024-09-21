import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Projects from "./projects";
import "./project.css";
import { BreadCrumb } from "../../../components";
import { Helmet } from "react-helmet";

export default function ProjectPage() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Our Projects | Global Construction & Engineering</title>

        {/* Meta Description */}
        <meta
          name="description"
          content="Explore the diverse range of successful projects by Global Construction & Engineering, including residential, commercial, and infrastructure developments across Nepal. High-quality construction solutions tailored to local needs."
        />

        {/* Meta Keywords */}
        <meta
          name="keywords"
          content="construction projects Nepal, residential projects, commercial developments, infrastructure projects, building construction Nepal, Global Construction projects, construction portfolio, naksa pass, ghar, naksa, ghar nirman, baneshwor construction, sasto ghar, sasto construction Nepal, kathmandu builders, civil engineering Nepal, construction companies in Nepal, building design Nepal, construction cost Nepal, naksa banaune, ghar ko naksa, ghar banau Nepal"
        />

        {/* Canonical Link */}
        <link
          rel="canonical"
          href="https://www.globalconstruction.com.np/project"
        />

        {/* Open Graph (OG) Tags for Facebook and Social Sharing */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Our Projects - Global Construction & Engineering"
        />
        <meta
          property="og:description"
          content="Take a look at the successful projects completed by Global Construction & Engineering. From residential homes to large-scale infrastructure developments, see how we bring quality to every build."
        />
        <meta
          property="og:url"
          content="https://www.globalconstruction.com.np/project"
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
          content="Our Projects - Global Construction & Engineering"
        />
        <meta
          name="twitter:description"
          content="Explore Global Construction & Engineering's portfolio of successful projects. We specialize in residential, commercial, and infrastructure developments across Nepal."
        />
        <meta
          name="twitter:image"
          content="https://www.globalconstruction.com.np/images/logo.jpg"
        />

        {/* Robots Meta Tag */}
        <meta name="robots" content="index, follow" />
      </Helmet>

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
        <Container className="projects-section" style={{ marginTop: "40px" }}>
          <Projects featured={false} />
        </Container>
      </div>
    </>
  );
}

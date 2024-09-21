import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./blog.css";
import { BreadCrumb } from "../../../components";
import { Helmet } from "react-helmet";

export default function BlogPage() {
  return (
    <>
      <Helmet>
        {/* Page Title */}
        <title>
          Blog | Insights & Updates | Global Construction & Engineering
        </title>

        {/* Meta Description */}
        <meta
          name="description"
          content="Stay updated with the latest industry news, construction trends, project insights, and expert tips from Global Construction & Engineering."
        />

        {/* Meta Keywords */}
        <meta
          name="keywords"
          content="construction blog, engineering insights, construction industry news, project management tips, global construction updates"
        />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content="Blog | Global Construction & Engineering"
        />
        <meta
          property="og:description"
          content="Explore the latest insights, trends, and news in construction and project management from Global Construction & Engineering."
        />
        <meta
          property="og:url"
          content="https://globalconstruction.com.np/blog"
        />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="Blog | Global Construction & Engineering"
        />
        <meta
          name="twitter:description"
          content="Discover expert insights, news, and trends in the construction industry."
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://globalconstruction.com.np/blog" />
      </Helmet>

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
        <Container className="blogs-section" style={{ marginTop: "40px" }}>
          <h4>No Blogs are written yet</h4>
        </Container>
      </div>
    </>
  );
}

import { BreadCrumb, FeatureCard, FeatureCounters } from "../../../components";
import { Container, Row, Col } from "react-bootstrap";
import "./about-us.css";
import TeamSection from "../team-section/team-section";
import {Helmet} from "react-helmet";

const AboutUsPage = () => {
  return (
    <>
      {/* SEO with React Helmet */}
      <Helmet>
        {/* Basic Meta Tags */}
        <meta charSet="utf-8" />
        <title>About Us | Global Construction & Engineering</title>
        <meta
          name="description"
          content="Learn about Global Construction & Engineering Pvt. Ltd., a leading construction company in Nepal offering quality, innovative solutions for residential, commercial, and infrastructure projects since 2018."
        />
        {/* Keywords for SEO */}
        <meta
          name="keywords"
          content="About Global Construction, Construction Company Nepal, Engineering Services Nepal, Quality Construction Nepal, Residential Projects Nepal, Commercial Projects Nepal, Infrastructure Development Nepal, building the future in Nepal, Global Construction team, construction experts Nepal, innovative engineering Nepal"
        />
        {/* Open Graph Meta Tags for Social Sharing */}
        <meta
          property="og:title"
          content="About Us - Global Construction & Engineering"
        />
        <meta
          property="og:description"
          content="Discover how Global Construction & Engineering Pvt. Ltd. is shaping the future of construction in Nepal with innovative, high-quality projects."
        />
        <meta
          property="og:image"
          content="path-to-your-social-share-image.jpg"
        />{" "}
        {/* Ensure to use an appropriate image path */}
        <meta property="og:url" content="https://globalconstruction.com.np/about-us" />
        <meta property="og:type" content="website" />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About Us - Global Construction & Engineering"
        />
        <meta
          name="twitter:description"
          content="Learn about the mission, vision, and values of Global Construction & Engineering Pvt. Ltd., a leading construction company in Nepal."
        />
        <meta
          name="twitter:image"
          content="https://www.globalconstruction.com.np/images/logo.jpg"
        />
        {/* Robots Meta Tag */}
        <meta name="robots" content="index, follow" />
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.globalconstruction.com.np/about-us" />
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Global Construction & Engineering Pvt. Ltd.",
            "url": "https://www.globalconstruction.com.np",
            "logo": "https://www.globalconstruction.com.np/image/logo.jpg",
            "sameAs": [
              "https://facebook.com/globalconstructionofficial",
              "https://instagram.com/globalconstruction_group",
            ],
            "description": "Global Construction & Engineering is a leading construction company based in Nepal, specializing in residential, commercial, and infrastructure development projects.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "New Baneshwor",
              "addressLocality": "Kathmandu",
              "addressCountry": "NP"
            }
          }
          `}
        </script>
      </Helmet>

      <BreadCrumb args="About Us" />

      <section className="about-us">
        <Container>
          <Row className="align-items-stretch">
            <Col lg={6}>
              <img
                src="images/picture3.jpg" // Replace with the actual image path
                alt="About Us"
                className="about-us-image"
              />
            </Col>
            <Col lg={6}>
              <div className="about-us-content">
                <p>GLOBAL CONSTRUCTION & ENGINEERING PVT. LTD.</p>
                <h2>Building the Future with Quality and Innovation.</h2>
                <p>
                  Founded in 2018, we evolved from a visionary startup into a
                  leading firm in the construction industry. With a portfolio of
                  diverse projects and a commitment to quality, we specialize in
                  delivering state-of-the-art construction and engineering
                  solutions.
                </p>
                <p>
                  Our company provides comprehensive services ranging from
                  residential and commercial construction to large-scale
                  infrastructure projects. With a dedicated team of experts, we
                  ensure excellence in every project we undertake.
                </p>
                <p>
                  We are committed to meeting and exceeding client expectations
                  through innovative design, meticulous planning, and
                  exceptional execution.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="mission-vision">
        <Container>
          <Row>
            <Col md={6}>
              <h2>Mission Statement</h2>
              <p>
                Our mission is to provide exceptional construction and
                engineering services that exceed client expectations and
                contribute to the development of sustainable and innovative
                infrastructure.
              </p>
            </Col>
            <Col md={6}>
              <h2>Vision Statement</h2>
              <p>
                Our vision is to be the leading construction and engineering
                firm, renowned for our commitment to quality, innovation, and
                excellence in every project we undertake.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <TeamSection />

      <FeatureCounters />
    </>
  );
};

export default AboutUsPage;

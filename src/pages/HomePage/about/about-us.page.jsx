import { BreadCrumb, FeatureCard, FeatureCounters } from "../../../components";
import { Container, Row, Col } from "react-bootstrap";
import "./about-us.css";
import TeamSection from "../team-section/team-section";

const AboutUsPage = () => {
  return (
    <>
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

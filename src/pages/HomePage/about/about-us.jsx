import {useNavigate} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./about-us.css";
import { Button } from "../../../components";

const AboutUs = ({Image}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/about-us")
  }

  return (
    <section className="about-us">
      <Container>
        <Row className="align-items-stretch">
          <Col lg={6}>
            <img
              src={Image}
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
                <p> Our company provides comprehensive services ranging from
                residential and commercial construction to large-scale
                infrastructure projects. With a dedicated team of experts, we
                ensure excellence in every project we undertake.
              </p>
              <p>
                We are committed to meeting and exceeding client expectations
                through innovative design, meticulous planning, and exceptional
                execution.
              </p>
              <Button primary size="sm" onClick={handleClick} >
                More About Us
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;

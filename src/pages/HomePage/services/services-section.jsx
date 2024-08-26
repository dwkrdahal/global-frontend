import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./services.css";
import { Button, ServiceCard } from "../../../components";
import OurServices from "./services";


const ServiceSection = () => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <section className="our-services">
      <Container>
        <Row className="text-center mb-4">
          <Col>
            <p>Our Services</p>
            <h2>Advance Construction Services with Cutting-Edge Technology</h2>
          </Col>
        </Row>
        <OurServices />
        
      </Container>
    </section>
  );
};

export default ServiceSection;

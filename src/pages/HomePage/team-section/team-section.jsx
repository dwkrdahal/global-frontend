import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./team.css";
import Team from "./team";



const TeamSection = () => {
  return (
    <section className="team-section">
    <Container>
      <Row className="text-center mb-4">
        <Col>
          <p>Meet Our Team</p>
          <h2>Skilled and Experienced Team Members</h2>
        </Col>
      </Row>
      <Team/>
    </Container>
  </section>
  );
};

export default TeamSection;

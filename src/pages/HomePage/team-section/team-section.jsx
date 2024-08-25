import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaPhone } from "react-icons/fa";
import "./team-section.css";
import { Button } from "../../../components";

const teamMembers = [
  { name: "John Doe", position: "Chief Executive Officer", image: "/images/avatar1.png" },
  { name: "Jane Smith", position: "Project Manager", image: "/images/avatar2.png" },
  { name: "Michael Brown", position: "Lead Engineer", image: "/images/avatar1.png" },
  { name: "Sarah Davis", position: "Architect", image: "/images/avatar2.png" },
  { name: "Emily Johnson", position: "Marketing Head", image: "/images/avatar1.png" },
  { name: "David Wilson", position: "Operations Manager", image: "/images/avatar2.png" },
];

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
      <Row>
        {teamMembers.map((member, index) => (
          <Col key={index} md={6} lg={4} className="mb-4">
            <div className="team-card">
              <div className="team-image-wrapper">
                <img src={member.image} alt={member.name} className="team-image" />
                <div className="hover-content">
                  <div className="hover-info">
                    <h5>{member.name}</h5>
                    <p>{member.position}</p>
                  </div>
                  <FaPhone className="call-icon" />
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <Row className="text-center mt-4">
        <Col>
          <Button primary>
            Explore All Team
          </Button>
        </Col>
      </Row>
    </Container>
  </section>
  );
};

export default TeamSection;

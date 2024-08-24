import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./services.css";
import { Button, ServiceCard } from "../../../components";

const services = [
  { icon: "fas fa-pencil-ruler", title: "Design", description: "Transforming visions into exquisite designs with precision and creativity.", link: "#" },
  { icon: "fas fa-hammer", title: "Build", description: "Turning detailed plans into high-quality, on-time constructions.", link: "#" },
  { icon: "fas fa-tools", title: "Renovate", description: "Revitalizing spaces with thoughtful renovations that blend style and function.", link: "#" },
  { icon: "fas fa-cogs", title: "Consult", description: "Providing expert advice and solutions tailored to your unique needs.", link: "#" },
  { icon: "fas fa-shield-alt", title: "Secure", description: "Ensuring safety and security through advanced technologies and practices.", link: "#" },
  { icon: "fas fa-lightbulb", title: "Innovate", description: "Driving innovation with cutting-edge solutions and creative approaches.", link: "#" },
  { icon: "fas fa-rocket", title: "Launch", description: "Launching projects with seamless execution and precision.", link: "#" },
]

const OurServices = () => {
  const [showMore, setShowMore] = useState(false);

  const visibleServices = showMore ? services : services.slice(0, 6);

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
        <Row className="justify-content-center">
          {visibleServices.map((service, index) => (
            <Col key={index} md={6} lg={4} className="mb-4">
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                link={service.link}
              />
            </Col>
          ))}
        </Row>
        {services.length > 6 && (
          <Row className="text-center mt-4">
            <Col>
              <Button onClick={handleShowMore} primary>
                {showMore ? "Show Less" : "Explore All Services"}
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
};

export default OurServices;

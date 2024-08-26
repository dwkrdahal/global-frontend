import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./services.css";
import { Button, ServiceCard } from "../../../components";

const services = [
  {
    icon: "fas fa-drafting-compass",
    title: "Architectural Design",
    description: "Blending traditional and modern styles to create functional and aesthetically pleasing designs for homes, offices, and public spaces in Nepal.",
    link: "#"
  },
  {
    icon: "fas fa-hard-hat",
    title: "Construction Management",
    description: "Expert management of construction projects, ensuring timely delivery, budget adherence, and compliance with local regulations across Nepal.",
    link: "#"
  },
  {
    icon: "fas fa-recycle",
    title: "Sustainable Renovations",
    description: "Eco-friendly renovation services that enhance energy efficiency and reduce environmental impact, using sustainable materials and practices.",
    link: "#"
  },
  {
    icon: "fas fa-comments",
    title: "Project Consultation",
    description: "Tailored advice and planning to navigate construction and design challenges, including feasibility studies, cost estimation, and regulatory compliance.",
    link: "#"
  },
  {
    icon: "fas fa-lock",
    title: "Building Security",
    description: "Advanced security solutions, including surveillance and access control systems, to ensure your property’s safety and meet local security standards.",
    link: "#"
  },
  {
    icon: "fas fa-lightbulb",
    title: "Innovative Solutions",
    description: "Cutting-edge technologies and creative approaches to address unique challenges and enhance the functionality and appeal of your projects.",
    link: "#"
  },
  {
    icon: "fas fa-check-circle",
    title: "Project Delivery",
    description: "Seamless execution of projects from planning to completion, ensuring high-quality results and adherence to local standards.",
    link: "#"
  },
  {
    icon: "fas fa-building",
    title: "Infrastructure Development",
    description: "Design and construction of essential infrastructure, including roads and bridges, to support community development and enhance connectivity.",
    link: "#"
  },
  {
    icon: "fas fa-home",
    title: "Residential Projects",
    description: "Custom home designs and construction management to create living spaces that reflect personal style and meet practical needs.",
    link: "#"
  },
  {
    icon: "fas fa-city",
    title: "Commercial Developments",
    description: "Services for developing office buildings, retail spaces, and hospitality projects, focusing on functionality, aesthetics, and business needs.",
    link: "#"
  }
];




const OurServices = () => {
  const [showMore, setShowMore] = useState(false);

  const visibleServices = showMore ? services : services.slice(0, 6);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <section className="our-services">
      <Container>

        <Row className="justify-content-center">
          {visibleServices.map((service, index) => (
            <Col key={index} md={6} lg={4} xl={4} className="mb-4">
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

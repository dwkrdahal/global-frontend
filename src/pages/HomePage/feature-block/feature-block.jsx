import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { FeatureCard } from "../../../components";
import "./feature-block.css";


const FeatureBlock = () => {
  const [showMore, setShowMore] = useState(false);

  const features = [
    {
      icon: "fas fa-pencil-ruler",
      title: "Design",
      description:
        "Transforming visions into exquisite designs with precision and creativity.",
      link: "/project", // You can specify project routes here
    },
    {
      icon: "fas fa-hammer",
      title: "Build",
      description:
        "Turning detailed plans into high-quality, on-time constructions.",
      link: "/project",
    },
    {
      icon: "fas fa-tools",
      title: "Renovate",
      description:
        "Revitalizing spaces with thoughtful renovations that blend style and function.",
      link: "/project",
    },
  ];

  const handleViewMore = () => {
    setShowMore(!showMore);
  };

  return (
    <section className="our-features">
      <Container>
        <Row className="justify-content-center">
          {features
            .slice(0, showMore ? features.length : 4)
            .map((service, index) => (
              <Col key={index} md={5} lg={4} className="mb-4">
                <div className="overlap-features">
                  {/* Wrap the FeatureCard with Link to navigate */}
                  <Link to={service.link}>
                    <FeatureCard
                      icon={service.icon}
                      title={service.title}
                      description={service.description}
                      link={service.link}
                    />
                  </Link>
                </div>
              </Col>
            ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeatureBlock;

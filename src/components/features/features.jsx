import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "./features.css";

const features = [
  { count: 30000, label: "Sites" },
  { count: 17000, label: "Workers" },
  { count: 22000, label: "Resources" },
  { count: 50000, label: "Clients" },
];

const FeatureCounters = () => {
  // Set up Intersection Observer to detect when the section is in view
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once when in view
    threshold: 0.2, // Trigger when 20% of the section is in view
  });

  return (
    <section ref={ref} className="feature-counters">
      <Container >
        <Row className="justify-content-center">
          <p className="text-center">WE PROUDLY FEATURES</p>
          {features.map((feature, index) => (
            <Col key={index} md={3} sm={6} xs={12} className="text-center mb-3">
              <div className="counter-item">
                <h2>
                  {inView && (
                    <CountUp end={feature.count} duration={3} separator="," />
                  )}
                  +
                </h2>
                <p>{feature.label}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeatureCounters;

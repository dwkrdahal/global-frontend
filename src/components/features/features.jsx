import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "./features.css";

const URL = import.meta.env.VITE_APP_URL;

const FeatureCounters = () => {
  const [features, setFeatures] = useState([]);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Function to fetch and process feature data from API
  const fetchFeatures = async () => {
    try {
      const response = await fetch(`${URL}/feature`);
      const data = await response.json();
      
      // Filter, sort, and map the features based on your requirements
      const processedFeatures = data.result
        .filter(feature => feature.isActive) // Only include active features
        .sort((a, b) => a.rank - b.rank) // Sort by rank in ascending order

      setFeatures(processedFeatures);
    } catch (error) {
      // console.error("Failed to fetch feature data", error);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  return (
    <section ref={ref} className="feature-counters">
      <Container>
        <Row className="justify-content-center">
          <p className="text-center">WE PROUDLY FEATURE</p>
          {features.map((feature, index) => (
            <Col key={index} md={3} sm={6} xs={12} className="text-center mb-3">
              <div className="counter-item">
              <p>{feature.title}</p>
                <h2>
                  {inView && (
                    <CountUp end={feature.number} duration={3} separator="," />
                  )}
                  {feature.addPlus && "+"}
                  <p>{feature?.unit ? feature.unit : " "}</p>
                </h2>
                
                
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeatureCounters;

import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./services.css";
import { Button, ServiceCard } from "../../../components";
import { toast } from "react-toastify";
import URL from "../../../config";

const OurServices = () => {
  const serviceURL = URL + "/service";

  const [showMore, setShowMore] = useState(false);
  const [services, setServices] = useState([]);

  const visibleServices = showMore ? services : services.slice(0, 6);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const fetchServices = async () => {
    try {
      const result = await fetch(serviceURL, {
        method: "GET",
      });
      const data = await result.json();

      if (data.status) {
        const activeServices = data.result.filter(service => service.status === true);
        setServices(activeServices);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

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

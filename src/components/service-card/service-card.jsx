import React from "react";
import { Card } from "react-bootstrap";
import "./service-card.css"; 

const ServiceCard = ({ icon, title, description, link }) => {
  return (
    <Card className="service-card text-center">
      <Card.Body>
        <div className="card-icon-container">
          <div className="card-icon">
            <i className={icon} />
          </div>
        </div>
        <Card.Title className="service-title">{title}</Card.Title>
        <Card.Text className="service-description">{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;

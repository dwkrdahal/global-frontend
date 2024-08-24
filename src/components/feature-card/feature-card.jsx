import React from "react";
import { Card } from "react-bootstrap";
import "./feature-card.css"; // Import the custom CSS file

const FeatureCard = ({ icon, title, description, link }) => {
  return (
    <Card className="feature-card">
      <Card.Body>
        <div className="feature-card-icon">
          <i className={icon} />
        </div>
        <Card.Title className="feature-title">{title}</Card.Title>
        <Card.Text className="feature-description">{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FeatureCard;

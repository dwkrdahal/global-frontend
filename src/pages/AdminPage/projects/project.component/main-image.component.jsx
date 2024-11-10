import React, { useState } from "react";
import { Card, Button, Carousel, Form, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

import Service from "../../../../service/ImageService";
const myService = new Service();

export default function MainImageComponent({ project, projectURL, token }) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMainImage, setSelectedMainImage] = useState(project.mainImage);

  // Handle selection of new main image
  const handleMainImageChange = (image) => {
    setSelectedMainImage(image);
  };

  // Save the selected main image
  const handleSave = async () => {
    try {
      const response = await fetch(`${projectURL}/updateMainImage`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ selectedMainImage }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.msg || "Something went wrong");
      }
  
      if (data.status) {
        toast.success("Main image updated successfully!");
        setIsEditing(false)
      } else {
        toast.error("Sorry! Update failed");
        console.log(data);
      }
    } catch (error) {
      toast.error("Server error! Update failed");
      console.error("Failed to update main image:", error);
    }
  };

  return (
    <Card className="project-detail-card mb-4">
      <Card.Header
        as="h5"
        className="d-flex justify-content-between align-items-center"
      >
        Main Image
        <div className="ms-auto d-flex align-items-center">
          {!isEditing && (
            <Button variant="link" onClick={() => setIsEditing(true)}>
              <i className="fas fa-pen"></i>
            </Button>
          )}
        </div>
      </Card.Header>
      <Card.Body>
        <img
          className="d-block w-100"
          src={(selectedMainImage?.url)}
          alt="Main Image"
        />

        {isEditing && (
          <>
            <Row className="mt-4">
              {project.images.map((image) => (
                <Col key={image.url} xs={6} md={4} lg={3}>
                  <Card onClick={() => handleMainImageChange(image)}>
                    <Card.Img
                      variant="top"
                      src={(image.url)}
                      alt={`Thumbnail for ${image.caption}`}
                      style={{ height: "100px", objectFit: "cover" }}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
            <Button variant="primary" className="mt-3" onClick={handleSave}>
              Save
            </Button>
            <Button
              variant="secondary"
              className="mt-3 ms-2"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

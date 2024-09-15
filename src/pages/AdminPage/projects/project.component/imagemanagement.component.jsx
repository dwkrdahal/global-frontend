import React, { useState } from "react";
import { Card, Button, Carousel, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import Service from "../../../../service/ImageService";
const myService = new Service();

export default function ImageManagementComponent({ project, projectURL, token }) {
  const [images, setImages] = useState(project.images || []);
  const [isEditing, setIsEditing] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [isFormChanged, setIsFormChanged] = useState(false);

  // Handle image uploads
  const handleImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const imageFiles = selectedFiles.map((file) => ({
      file, // Store file data for uploading
      url: URL.createObjectURL(file), // Create a temporary URL for preview
      caption: "", // Optionally add a caption input
    }));
    setNewImages([...newImages, ...imageFiles]);
    setIsFormChanged(true);
  };

  // Handle deleting an existing image
  const handleDeleteImage = (index) => {
    const imageToDelete = images[index];
    setDeletedImages([...deletedImages, imageToDelete.url]); // Add image URL to the deleted images array
    const updatedImages = images.filter((_, imgIndex) => imgIndex !== index);
    setImages(updatedImages);
    setIsFormChanged(true);
  };

  // Handle deleting a newly uploaded image before submitting
  const handleDeleteNewImage = (index) => {
    const updatedNewImages = newImages.filter((_, imgIndex) => imgIndex !== index);
    setNewImages(updatedNewImages);
  };

  // Handle saving changes (uploading new images, deleting unwanted ones)
  const handleSave = async () => {
    const formData = new FormData();

    // Add new images to formData
    newImages.forEach((image) => {
      formData.append("images", image.file);
    });

    // Add deleted image URLs
    formData.append("deletedImages", JSON.stringify(deletedImages));

    try {
      const result = await fetch(`${projectURL}`, {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      const data = await result.json();

      if (data.status) {
        toast.success("Images updated successfully");
        // Reload updated images from the response
        setImages(data.result.images);
        setNewImages([]);
        setDeletedImages([]);
        setIsFormChanged(false);
        setIsEditing(false);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error while updating images");
    }
  };

  // Discard changes
  const handleDiscard = () => {
    setImages(project.images || []);
    setNewImages([]);
    setDeletedImages([]);
    setIsEditing(false);
  };

  return (
    <Card className="project-detail-card mb-4">
      <Card.Header as="h5" className="section-title">
        Project Images
      </Card.Header>
      <Card.Body>
        <Carousel>
          {images?.map((image, index) => (
            <Carousel.Item key={index}>
              <img className="d-block w-100" src={myService.getRelativePath(image.url)} alt={`Slide ${index}`} />
              <Carousel.Caption>
                <p>{image.caption}</p>
                {isEditing && (
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteImage(index)}
                  >
                    Delete
                  </Button>
                )}
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Display newly uploaded images */}
        {newImages.length > 0 && (
          <>
            <h6>New Images</h6>
            <Carousel>
              {newImages.map((image, index) => (
                <Carousel.Item key={index}>
                  <img className="d-block w-100" src={image.url} alt={`New Image ${index}`} />
                  <Carousel.Caption>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteNewImage(index)}
                    >
                      Remove
                    </Button>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </>
        )}

        {isEditing && (
          <>
            <Form.Group controlId="imageUpload">
              <Form.Label>Upload New Images</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={handleImageUpload}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
            &nbsp;
            <Button variant="secondary" onClick={handleDiscard}>
              Discard Changes
            </Button>
          </>
        )}

        {!isEditing && (
          <Button variant="link" onClick={() => setIsEditing(true)}>
            Edit Images
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

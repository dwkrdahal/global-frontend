import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

export default function ServiceEdit({ show, handleClose, service, token, fetchServices }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [status, setStatus] = useState(false);

  const URL = import.meta.env.VITE_APP_URL;
  const serviceURL = URL + "/service";

  // Set the current service details in the form fields when the modal is opened
  useEffect(() => {
    if (service) {
      setTitle(service.title);
      setDescription(service.description);
      setLink(service.link || "");
      setStatus(service.status);
    }
  }, [service]);

  // Handle updating the service
  const handleUpdateService = async () => {
    const updatedService = { title, description, link, status };

    try {
      const result = await fetch(`${serviceURL}/${service._id}`, {
        method: "PATCH",
        headers: {
          "Authorization": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedService),
      });
      const data = await result.json();

      if (data.status) {
        toast.success("Service updated successfully");
        handleClose(); 
        fetchServices(); // Refresh the service list
      } else {
        toast.error(data.msg || "Failed to update service");
      }
    } catch (error) {
      toast.error("Failed to update service.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Display the icon at the top */}
        <div className="text-center mb-3">
          {service?.icon && <i className={`${service.icon} fa-3x`}></i>}
        </div>
        <Form>
          <Form.Group controlId="formTitle" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formLink" className="mb-3">
            <Form.Label>Link</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formStatus" className="mb-3">
            <Form.Check
              type="switch"
              label="Active"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateService}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

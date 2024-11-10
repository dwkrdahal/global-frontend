import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button } from "../../../components";
import URL from "../../../config";

function ContactForm() {
  const [formData, setFormData] = useState({
    senderName: "",
    senderPhone: "",
    senderEmail: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setResponseMessage("");
    setError("")
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponseMessage("");

    console.log(formData);
    
    try {
      const response = await fetch(`${URL}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status) {
        setResponseMessage("Your message has been sent successfully!");
        setFormData({ senderName: "", senderPhone: "", message: "" }); 
        // Clear form fields
      } else {
        setError(result.msg || "Something went wrong, please try again.");
      }
    } catch (error) {
      console.log(error)
      // setError("Failed to send message, please check your network connection.");
    }
  };

  return (
    <>
      {responseMessage && <Alert variant="success">{responseMessage}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label className="form-label">Name</Form.Label>
          <Form.Control
            type="text"
            name="senderName"
            value={formData?.senderName}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </Form.Group>
        <Form.Group controlId="formPhone">
          <Form.Label className="form-label">Phone Number</Form.Label>
          <Form.Control
            name="senderPhone"
            type="phone"
            value={formData?.senderPhone}
            onChange={handleChange}
            placeholder="Enter your contact number"
            required
          />
        </Form.Group>
        <Form.Group controlId="formMessage">
          <Form.Label className="form-label">Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="message"
            value={formData?.message}
            onChange={handleChange}
            placeholder="Your message"
            required
          />
        </Form.Group>
        <Button secondary>Send Message</Button>
      </Form>
    </>
  );
}

export default ContactForm;

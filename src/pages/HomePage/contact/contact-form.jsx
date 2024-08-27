import React from "react";
import { Form } from "react-bootstrap";
import { Button } from "../../../components";

function ContactForm() {
  return (
    <>
      <Form>
        <Form.Group controlId="formName">
          <Form.Label className="form-label">Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label className="form-label">Phone Number</Form.Label>
          <Form.Control type="phone" placeholder="Enter your contact number" />
        </Form.Group>
        <Form.Group controlId="formMessage">
          <Form.Label className="form-label">Message</Form.Label>
          <Form.Control as="textarea" rows={4} placeholder="Your message" />
        </Form.Group>
        <Button secondary>Send Message</Button>
      </Form>
    </>
  );
}

export default ContactForm;

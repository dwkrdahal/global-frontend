import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Button } from '../../../components';
import './contact.css'; // Ensure this file contains the CSS for styling

const ContactPage = () => {
  return (
    <section id="contact">
      <Container>
        <div className="section-header text-center mb-5">
          <p>Contact Us</p>
          <h2>Get in Touch With Us</h2>
        </div>
        <Row className="contact-page">
          <Col lg={5} className="contact-form">
            <h3>Contact Form</h3>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label className="form-label">Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label className="form-label">Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>
              <Form.Group controlId="formMessage">
                <Form.Label className="form-label">Message</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Your message" />
              </Form.Group>
              <Button secondary>
                Send Message
              </Button>
            </Form>
          </Col>
          <Col lg={7}>
            <div className="contact-map">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d441.6253242120819!2d85.33243861690715!3d27.68631471539065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19b8e0842bbb%3A0x477d3c74ef9c6e41!2sGlobal%20Construction%20%26%20Engineering%20Pvt.%20Ltd!5e0!3m2!1sen!2snp!4v1724570763456!5m2!1sen!2snp"
                width="100%"
                height="550"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
              
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactPage;

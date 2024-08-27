import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Button } from '../../../components';
import './contact.css'; // Ensure this file contains the CSS for styling
import ContactForm from './contact-form';
import ContactMap from './contact-map';

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
            <ContactForm />
          </Col>
          <Col lg={7}>
            <div className="contact-map">
              <ContactMap />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactPage;

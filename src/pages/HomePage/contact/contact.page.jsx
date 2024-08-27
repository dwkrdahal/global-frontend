import { Col, Container, Row, Card } from "react-bootstrap";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock, FaHeadset } from 'react-icons/fa';
import { BreadCrumb } from "../../../components";
import ContactForm from "./contact-form";
import ContactMap from "./contact-map";
import "./contact.css"; // Import the custom CSS for styling

function ContactPage() {
  return (
    <>
    <BreadCrumb args="Contact Us"></BreadCrumb>
    <div className="contact-page-container">
     
      <Container>
        
        <Row className="contact-page mt-5 mb-5">
        <Col lg={5} className="contact-details-box">
      <h3 className="text-center">Get In Touch</h3>
      <Card className="mt-4 p-4 shadow-sm">
        <Card.Body>
          <Card.Title>Head Office</Card.Title>
          <Card.Text>
            <FaMapMarkerAlt className="me-2" />
             New Baneshwor, Kathmandu, Nepal
          </Card.Text>
          <Card.Text>
            <FaEnvelope className="me-2" />
            info@globalconstruction.com.np
          </Card.Text>
          <Card.Text>
            <FaPhoneAlt className="me-2" />
             +977 01-5908145
          </Card.Text>
          <Card.Text>
            <FaClock className="me-2" />
             Mon - Fri, 9 AM - 6 PM
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="mt-4 p-4 shadow-sm">
        <Card.Body>
          <Card.Title>Customer Support</Card.Title>
          <Card.Text>
            <FaHeadset className="me-2" />
             +977 9851131874
          </Card.Text>
          <Card.Text>
            <FaEnvelope className="me-2" />
            support@globalconstruction.com.np
          </Card.Text>
          <Card.Text>
            <FaClock className="me-2" />
             24/7 for urgent inquiries
          </Card.Text>
          <Card.Text>
            <FaMapMarkerAlt className="me-2" />
             Available across all regions in Nepal
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>

          {/* Right Side: Contact Form */}
          <Col lg={7} className="contact-form">
            <h3 className="text-center">Just Leave a Message</h3>
            <ContactForm />
          </Col>

          {/* Bottom: Map */}
          <Col lg={12} className="mt-5">
            <div className="contact-map">
              <ContactMap />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  );
}

export default ContactPage;

import React from "react";
import Slider from "react-slick";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./testimonials.css"; // Custom styles

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const testimonials = [
  {
    name: "Luke Colman",
    position: "Director, Streich PLC",
    feedback:
      "Fusce dapibus tellus ac cursus commodo tortor mauris condimentum nibh ut fermentum massa justo sit amet risus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.",
    image: "images/picture1.jpg",
  },
  {
    name: "Jane Doe",
    position: "CEO, XYZ Corp",
    feedback:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas sed diam eget risus varius blandit sit amet non magna.",
    image: "images/picture2.jpg",
  },
  // Add more testimonials here
];

const Testimonials = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <section className="testimonials-section">
      <Container>
        <Row className="text-center mb-4">
          <Col>
            <h5 className="section-subtitle">TESTIMONIALS</h5>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-description">
              Our top priority is customer satisfaction, and we work closely
              with clients to understand their unique needs and goals.
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg={8} className="mx-auto">
            <Slider {...settings}>
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="testimonial-card">
                  <Card.Body>
                    <div className="testimonial-image-wrapper">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="testimonial-image"
                      />
                    </div>
                    <Card.Text className="testimonial-feedback">
                      {testimonial.feedback}
                    </Card.Text>
                    <h5 className="testimonial-name">{testimonial.name}</h5>
                    <p className="testimonial-position">
                      {testimonial.position}
                    </p>
                  </Card.Body>
                </Card>
              ))}
            </Slider>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;

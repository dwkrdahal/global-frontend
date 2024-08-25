import React from "react";
import Slider from "react-slick";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./testimonials.css"; // Custom styles

const testimonials = [
  {
    name: "Luke Colman",
    position: "Director, Streich PLC",
    feedback:
      "Fusce dapibus tellus ac cursus commodo tortor mauris condimentum nibh ut fermentum massa justo sit amet risus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.",
    image: "images/avatar1.png",
  },
  {
    name: "Jane Doe",
    position: "CEO, XYZ Corp",
    feedback:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas sed diam eget risus varius blandit sit amet non magna.",
    image: "images/avatar2.png",
  },
  // Add more testimonials here
];

const Testimonials = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <section className="testimonials-section">
      <Container>
        <Row>
          <Col lg={7}>
            <div className="testimonial-content">
              <h5 className="section-subtitle">TESTIMONIALS</h5>
              <h2 className="section-title">What Our Clients Say</h2>
              <p className="section-description">
                Our top priority is customer satisfaction, and we work closely
                with clients to understand their unique needs and goals.
              </p>
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
            </div>
          </Col>
          <Col lg={5} className="testimonial-image-column">
            <img
              src="images/image-5.jpg"
              alt="Right Side"
              className="testimonial-side-image"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;

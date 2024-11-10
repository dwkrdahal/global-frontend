import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./testimonials.css";
import URL from "../../../config";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${URL}/testimony`, {
          method: "GET",
        });

        // Parse the response as JSON
        const data = await response.json();

        // Filter testimonials with isActive true
        if (data.status) {
          const activeTestimonials = data.result.filter(
            (testimonial) => testimonial.isActive
          );
          setTestimonials(activeTestimonials);
        } else {
          setTestimonials([]); // Set empty array if status is false
        }
      } catch (err) {
        // console.error("Fetch error: ", err); // Log error to console
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>No Data Available ...</p>;

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
              {testimonials.length > 0 ? (
                <Slider {...settings}>
                  {testimonials.map((testimonial, index) => (
                    <Card key={index} className="testimonial-card">
                      <Card.Body>
                        <div className="testimonial-image-wrapper">
                          <img
                            src={(testimonial?.image?.url)}
                            alt={testimonial?.name}
                            className="testimonial-image"
                          />
                        </div>
                        <Card.Text className="testimonial-feedback">
                          {testimonial?.testimony}
                        </Card.Text>
                        <h5 className="testimonial-name">
                          {testimonial?.company}
                        </h5>
                        <p className="testimonial-position">
                          {testimonial?.position}
                        </p>
                      </Card.Body>
                    </Card>
                  ))}
                </Slider>
              ) : (
                <p>No testimonials available at the moment.</p>
              )}
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

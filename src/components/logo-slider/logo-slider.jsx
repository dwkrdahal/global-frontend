import React from "react";
import Slider from "react-slick";
import { Container } from "react-bootstrap";
import "./logo-slider.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Sample logos (replace with your actual logo images)
const logos = [
  { src: "/images/logos/logo1.png", alt: "Company 1" },
  { src: "/images/logos/logo2.png", alt: "Company 2" },
  { src: "/images/logos/logo3.jpg", alt: "Company 3" },
  { src: "/images/logos/logo4.jpg", alt: "Company 4" },
  { src: "/images/logos/logo5.png", alt: "Company 5" },
  { src: "/images/logos/logo6.png", alt: "Company 6" },
];

const LogoSlider = () => {
  // Slider settings
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="logo-slider">
      <Container>
      <p className="text-center">WE HAVE ALREADY WORKED WITH</p>
        <Slider {...settings}>
          {logos.map((logo, index) => (
            <div key={index} className="logo-item">
              <img src={logo.src} alt={logo.alt} className="img-fluid" />
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default LogoSlider;

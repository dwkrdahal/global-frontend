import React from "react";
import Slider from "react-slick";
import { Container } from "react-bootstrap";
import "./logo-slider.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Sample logos (replace with your actual logo images)
const logos = [
  { src: "/images/logos/logo1.png", name: "Company 1" },
  { src: "/images/logos/logo2.png", name: "Company 2" },
  { src: "/images/logos/logo3.jpg", name: "Company 3" },
  { src: "/images/logos/logo4.jpg", name: "Company 4" },
  { src: "/images/logos/logo5.png", name: "Company 5" },
  { src: "/images/logos/logo6.png", name: "Company 6" },
];

const LogoSlider = () => {
  // Slider settings
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
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
        <p className="text-center">We are proud working with</p>
        <Slider {...settings}>
          {logos.map((logo, index) => (
            <div key={index} className="logo-item">
              <img src={logo.src} alt={logo.name} className="img-fluid" />
              <div className="tooltip">{logo.name}</div>
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default LogoSlider;

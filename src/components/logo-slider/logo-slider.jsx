import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Container } from "react-bootstrap";
import "./logo-slider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Service from "../../service/ImageService";

const myService = new Service();
const URL = import.meta.env.VITE_APP_URL;

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

const LogoSlider = () => {
  const [logos, setLogos] = useState([]);

  const fetchLogo = async (req, res, next) => {
    try {
      const response = await fetch(`${URL}/logo`);
      const data = await response.json();

      if (data.status) {
        // Filter logos where isActive is true
        const activeLogos = data.result.filter((logo) => logo.isActive);
        setLogos(activeLogos);
      } else {
        console.error("Failed to fetch logos:", data.msg);
      }
    } catch (error) {
      console.error("Error fetching logos:", error);
    }
  };

  useEffect(() => {
    fetchLogo();
  }, []);

  return (
    <section className="logo-slider">
      <Container>
        <div className="text-center"><strong><h3>WE ARE PROUD</h3> </strong>
        working with</div>
        <Slider {...settings}>
          {logos.map((logo, index) => (
            <div key={index} className="logo-item">
              <img
                src={myService.getRelativePath(logo?.image?.url)}
                alt={logo?.image?.caption}
                className="img-fluid"
              />
              <div className="tooltip">{logo?.companyName}</div>
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default LogoSlider;

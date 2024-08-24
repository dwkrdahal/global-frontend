import "./hero-slider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Hero from "./hero";

function HeroSlider() {
  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: true,
  };
  const backgroundImage = "images/picture3.jpg";
  return (
    <>
      <Slider {...settings}>
        {/* <Hero backgroundImage="images/picture1.jpg" /> */}
        <Hero backgroundImage="images/855271-hd_1920_1080_25fps.mp4" />
        {/* <Hero backgroundImage="images/picture2.jpg" /> */}
      </Slider>
    </>
  );
}

export default HeroSlider;

import "./hero-slider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Hero from "./hero";

function HeroSlider() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };
  const backgroundImage = "images/picture3.jpg";
  return (
    <>
      <Slider {...settings}>
        <Hero
          backgroundImage="images/image-5.jpg"
          title="Crafting Excellence"
          subtitle="Bringing visionary ideas to life with precision, expertise, and a commitment to quality construction."
        />
        <Hero
          backgroundImage="images/image-6.jpg"
          title="Innovative Designs"
          subtitle="Blending creativity and functionality to design spaces that inspire and elevate lifestyles."
        />
        <Hero
          backgroundImage="images/855271-hd_1920_1080_25fps.mp4"
          title="A Legacy of Trust"
          subtitle="Our work speaks for itself — built on trust, shaped by innovation, and delivered with excellence."
        />
        <Hero
          backgroundImage="images/image-7.jpg"
          title="Building Your Dreams"
          subtitle="We provide top-notch services to help you achieve your goals. Our team is dedicated to delivering quality and excellence."
        />
      </Slider>
    </>
  );
}

export default HeroSlider;

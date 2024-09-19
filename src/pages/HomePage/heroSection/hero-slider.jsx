import "./hero-slider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Hero from "./hero";
import Service from "../../../service/ImageService";
import { useEffect, useState } from "react";

const myService = new Service();
const URL = import.meta.env.VITE_APP_URL;

const HeroSlider = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await fetch(`${URL}/banner`, {
          method: "GET",
        });

        const data = await response.json();

        // Filter banners with isActive true
        if (data.status) {
          const activeBanner = data.result.filter((banner) => banner.isActive);
          setBanners(activeBanner);
        }
      } catch (err) {
        console.error("Fetch error: ", err); // Log error to console
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {banners.length > 0 ? (
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <Hero
              key={index} // Add a unique key
              backgroundImage={
                banner?.media === "image"
                  ? myService.getRelativePath(banner?.image?.url)
                  : myService.getRelativePath(banner?.video?.url)
              }
              title={banner?.title}
              subtitle={banner?.subtitle}
              media={banner?.media} // Keep track of media type
            />
          ))}
        </Slider>
      ) : (
        <Slider {...settings}>
          <Hero
            backgroundImage="images/image-5.jpg"
            title="Crafting Excellence"
            subtitle="Bringing visionary ideas to life with precision, expertise, and a commitment to quality construction."
            media="image"
          />
          <Hero
            backgroundImage="images/855271-hd_1920_1080_25fps.mp4"
            title="Crafting Excellence"
            subtitle="Bringing visionary ideas to life with precision, expertise, and a commitment to quality construction."
            media="video"
          />
        </Slider>
      )}
    </>
  );
};

export default HeroSlider;

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Hero from "./hero";
import Service from "../../../service/ImageService";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "./hero-slider.css";
import URL from "../../../config";

const myService = new Service();

const HeroSlider = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

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
        // console.error("Fetch error: ", err);
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

  return (
    <>
      <Helmet>
        {/* Page Title */}
        <title>Home | Global Construction & Engineering</title>

        {/* Meta Description */}
        <meta
          name="description"
          content="Global Construction & Engineering - Delivering innovative construction solutions and transforming ideas into reality with precision and quality."
        />

        {/* Meta Keywords */}
        <meta
          name="keywords"
          content="construction, engineering, project management, architecture, construction solutions, innovative design, quality construction, Nepal construction, Kathmandu builders, residential construction, commercial construction, civil engineering, construction services in Nepal, sustainable building, infrastructure development, architectural design, home renovation, construction contractors in Nepal"
        />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content="Home | Global Construction & Engineering"
        />
        <meta
          property="og:description"
          content="Explore innovative construction solutions and projects at Global Construction & Engineering."
        />
        <meta property="og:url" content="https://globalconstruction.com.np/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://globalconstruction.com.np/images/logo.jpg"
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Home | Global Construction & Engineering"
        />
        <meta
          name="twitter:description"
          content="Discover quality construction services and innovative solutions with Global Construction & Engineering."
        />
        <meta
          name="twitter:image"
          content="https://globalconstruction.com.np/images/logo.jpg"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://globalconstruction.com.np/" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      {banners.length > 0 ? (
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <Hero
              key={index} // Add a unique key
              backgroundImage={
                banner?.media === "image"
                  ? (banner?.image?.url)
                  : (banner?.video?.url)
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

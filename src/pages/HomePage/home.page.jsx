import React from "react";
import HeroSlider from "./heroSection/hero-slider";
import AboutUs from "./about/about-us";
import Services from "./services/services";
import FeatureBlock from "./feature-block/feature-block";
import FeaturesSection from "../../components/features/features";
import LogoSlider from "../../components/logo-slider/logo-slider";
import Testimonials from "./testimonials/testimonials";


function HomePage() {
  return (
    <div className="">
      <HeroSlider />
      <FeatureBlock/>
      <div id="about-us">
        <AboutUs Image={"images/picture3.jpg"} />
      </div>
      <div id="services">
        <Services/>
      </div>
      <div id="features">
        <FeaturesSection />
      </div>
      <div id="testimonials">
        <Testimonials/>
      </div>
      <div id="logo-slider">
        <LogoSlider />
      </div>
    </div>
  );
}

export default HomePage;

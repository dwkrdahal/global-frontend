import React from "react";
import HeroSlider from "./heroSection/hero-slider";
import AboutUs from "./about/about-us";
import Services from "./services/services";
import FeatureBlock from "./feature-block/feature-block";
import FeaturesSection from "../../components/features/features";
import LogoSlider from "../../components/logo-slider/logo-slider";
import Testimonials from "./testimonials/testimonials";
import TeamSection from "./team-section/team-section";
import OurProjects from "./project/project-section";
import ContactPage from "./contact/contact-section";
import Footer from "../../components/common/footer/footer";
import ServiceSection from "./services/services-section";

function HomePage() {
  return (
    <div className="">
      <HeroSlider />
      <FeatureBlock />

      <div id="about-us">
        <AboutUs Image={"images/picture3.jpg"} />
      </div>
       
      <div id="projects">
        <OurProjects />
      </div>

      <div id="logo-slider">
        <LogoSlider />
      </div>

      <div id="testimonials">
        <Testimonials />
      </div>

      <div id="features">
        <FeaturesSection />
      </div>

      <div id="contact">
        <ContactPage />
      </div>
    </div>
  );
}

export default HomePage;

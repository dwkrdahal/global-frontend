import { Carousel } from "react-bootstrap";
import "./hero.css";

function Hero() {
  return (
    <>
      <Carousel
        data-bs-theme="dark"
        interval={2000} // Auto transition every 2 seconds
        controls={true} // Remove left/right controls for simplicity
        indicators={true} // Show indicators for navigating slides
        className="home-carousel"
      >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/picture1.jpg"
            alt="First slide"
            style={{ height: "100vh", objectFit: "cover" }} // Full height for large screens
          />
          <Carousel.Caption>
            <h3>First Project</h3>
            <p>Beautifully designed homes with modern architecture.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/picture2.jpg"
            alt="Second slide"
            style={{ height: "100vh", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Second Project</h3>
            <p>Creating spaces that inspire and elevate lifestyles.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/picture3.jpg"
            alt="Third slide"
            style={{ height: "100vh", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Third Project</h3>
            <p>Innovative architecture that stands the test of time.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      
      <Carousel
        data-bs-theme="dark"
        interval={2000} // Auto transition every 2 seconds
        controls={true} // Remove left/right controls for simplicity
        indicators={true} // Show indicators for navigating slides
        className="home-carousel"
      >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/picture1.jpg"
            alt="First slide"
            style={{ height: "100vh", objectFit: "cover" }} // Full height for large screens
          />
          <Carousel.Caption>
            <h3>First Project</h3>
            <p>Beautifully designed homes with modern architecture.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/picture2.jpg"
            alt="Second slide"
            style={{ height: "100vh", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Second Project</h3>
            <p>Creating spaces that inspire and elevate lifestyles.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/picture3.jpg"
            alt="Third slide"
            style={{ height: "100vh", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Third Project</h3>
            <p>Innovative architecture that stands the test of time.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      
      <Carousel
        data-bs-theme="dark"
        interval={2000} // Auto transition every 2 seconds
        controls={true} // Remove left/right controls for simplicity
        indicators={true} // Show indicators for navigating slides
        className="home-carousel"
      >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/picture1.jpg"
            alt="First slide"
            style={{ height: "100vh", objectFit: "cover" }} // Full height for large screens
          />
          <Carousel.Caption>
            <h3>First Project</h3>
            <p>Beautifully designed homes with modern architecture.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/picture2.jpg"
            alt="Second slide"
            style={{ height: "100vh", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Second Project</h3>
            <p>Creating spaces that inspire and elevate lifestyles.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/picture3.jpg"
            alt="Third slide"
            style={{ height: "100vh", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Third Project</h3>
            <p>Innovative architecture that stands the test of time.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

    </>
  );
}

export default Hero;

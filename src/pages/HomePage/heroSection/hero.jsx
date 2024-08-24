import { Container, Row, Col } from "react-bootstrap";
import { Button } from "../../../components";
import "./hero.css";
import ScrollAnimation from "react-animate-on-scroll";

function Hero({ backgroundImage }) {
  const isVideo =
    backgroundImage.endsWith(".mp4") || backgroundImage.endsWith(".webm");

  return (
    <>
      <div className="hero">
        {isVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-background"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: -1,
            }}
          >
            <source src={backgroundImage} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div
            className="hero-background"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: -1,
            }}
          />
        )}
        <div className="hero-overlay" />
        <Container className="hero-content">
          <Row className="justify-content-start">
            <Col xs={12} md={8} lg={6}>
              <ScrollAnimation
                animateIn="slideInDown"
                animateOut="slideOut"
                duration={4}
                delay={600}
              >
                <h1 className="hero-heading">Building Your Dreams</h1>
              </ScrollAnimation>

              <ScrollAnimation
                animateIn="slideInDown"
                animateOut="slideOut"
                duration={4}
                delay={600}
              >
                <p>
                  We provide top-notch services to help you achieve your goals.
                  Our team is dedicated to delivering quality and excellence.
                </p>
              </ScrollAnimation>

              <div className="button-container">
                <ScrollAnimation
                  animateIn="bounceIn"
                  animateOut="slideOut"
                  duration={4}
                  delay={900}
                >
                  <Button primary size="md">
                    Learn More
                  </Button>
                  <Button className="button ms-2" secondary size="md">
                    Get Started
                  </Button>
                </ScrollAnimation>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Hero;

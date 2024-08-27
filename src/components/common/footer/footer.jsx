import React from "react";
import { Container } from "react-bootstrap";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaViber,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <Container>
        <div className="footer-columns">
          <div className="footer-left">
            <img src="images/global-logo.png" alt="Company Logo" />
            <p className="footer-description">DESIGN | BUILD | RENOVATE</p>
          </div>
          <div className="footer-right">
            <div className="footer-contact">
              <p>New Baneshwor, Kathmandu, Nepal</p>
              <p>
                Phone: <a href="tel:+977015908145">+977 01-5908145</a>
              </p>
              <p>
                <a href="mailto:info@globalconstruction.com.np">
                  info@globalconstruction.com.np
                </a>
              </p>
            </div>

            <div className="footer-social-icons">
              <a
                target="_blank"
                href="https://facebook.com/globalconstructionofficial"
              >
                <FaFacebook />
              </a>
              <a
                target="_blank"
                href="https://instagram.com/globalconstruction_group"
              >
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/9779851154436"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
              </a>
              <a
                href="viber://chat?number=%2B977015908145"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaViber />
              </a>
              <a
                target="_blank"
                href="https://www.youtube.com/@GlobalConstruction1"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Global Construction & Engineering.
            All rights reserved.
          </p>
          <p className="developed-by">
            Design & Developed by: <br />
            <a href="https://dahaldiwakar.com.np">
              <img src="images/favicon.png" alt="Diwakar Dahal" />
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

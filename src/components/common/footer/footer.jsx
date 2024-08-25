import React from "react";
import { Container } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
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
              <a target="_blank" href="https://facebook.com">
                <FaFacebook />
              </a>
              <a target="_blank" href="https://instagram.com">
                <FaInstagram />
              </a>
              <a target="_blank" href="https://twitter.com">
                <FaTwitter />
              </a>
              <a target="_blank" href="https://youtube.com">
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
              <img src="images/favicon.png" alt="Developed By Logo" />
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

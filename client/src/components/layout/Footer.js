import React from "react";
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          <div className="footer-section footer-brand">
            <div className="brand-logo">
              <h2 className="brand-name">FinTrack</h2>
              <div className="brand-tagline">Smart Financial Management</div>
            </div>
            <p className="brand-description">
              Empowering individuals and businesses to make smarter financial decisions 
              through intelligent expense tracking and analytics.
            </p>
            <div className="social-links">
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="social-link facebook"
              >
                <FacebookOutlined />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="social-link twitter"
              >
                <TwitterOutlined />
              </a>
              <a
                href="https://www.linkedin.com/in/tushar-tekchandani-b234bb2b4/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-link linkedin"
              >
                <LinkedinOutlined />
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-link instagram"
              >
                <InstagramOutlined />
              </a>
            </div>
          </div>

              <div className="contact-item">
                <EnvironmentOutlined className="contact-icon" />
                <span>Wardha,Maharashtra</span>
              </div>
            </div>
          </div>
  


        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>© {new Date().getFullYear()} TechExpense. All rights reserved.</p>
            <div className="legal-links">
              <a href="/privacy">Privacy Policy</a>
              <span className="separator">•</span>
              <a href="/terms">Terms of Service</a>
              <span className="separator">•</span>
              <a href="/cookies">Cookie Policy</a>
            </div>
          </div>
          <div className="footer-bottom-right">
          </div>
        </div>
    </footer>
  );
};

export default Footer;
import React from "react";

const ContactInfo = () => {
  return (
    <>
      <div className="contact-info">
        <h3>Contact Address:</h3>
        <p>
          Contact us with your details & ready to start with us. Get In Touch!
        </p>

        <ul className="contact-list">
          <li>
            <div className="icon">
              <i className="bx bx-support"></i>
            </div>
            <p>
              <a href="tel:+44587154756">+44 587 154756</a>
            </p>
          </li>
          <li>
            <div className="icon">
              <i className="bx bx-globe"></i>
            </div>
            <p>
              <a href="mailto:hello@novis.com">hello@novis.com</a>
            </p>
          </li>
          <li>
            <div className="icon">
              <i className="bx bx-map"></i>
            </div>
            <p>2750, Quadra Street Victoria, Canada</p>
          </li>
        </ul>

        <ul className="social-links">
          <li>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              className="facebook"
            >
              <i className="bx bxl-facebook"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.twitter.com/"
              target="_blank"
              className="twitter"
            >
              <i className="bx bxl-twitter"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              className="linkedin"
            >
              <i className="bx bxl-linkedin"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              className="instagram"
            >
              <i className="bx bxl-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ContactInfo;

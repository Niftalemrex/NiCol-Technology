import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About */}
        <div>
          <h2>NiCol Technologies</h2>
          <p>We build AI, Web, and Mobile solutions.</p>
        </div>

        {/* Contact */}
        <div>
          <h2>Contact</h2>
          <p>Email: info@nicoltech.com</p>
          <p>Phone: +251 11 123 4567</p>
          <p>Address: Addis Ababa, Ethiopia</p>
        </div>

        {/* Links */}
        <div>
          <h2>Quick Links</h2>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/reviews">Reviews</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} NiCol Technologies. All rights reserved.
      </div>
    </footer>
  );
}
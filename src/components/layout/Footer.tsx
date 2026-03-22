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
          <p>
            Email:{" "}
            <a href="mailto:Niftalemawel@gmail.com" className="footer-link">
              Niftalemawel@gmail.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+251939193603" className="footer-link">
              +251 939 193603
            </a>
          </p>
          <p>Address: Addis Ababa, Ethiopia</p>
        </div>

        {/* Links */}
        <div>
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/reviews">Reviews</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} NiCol Technologies. All rights reserved.
      </div>
    </footer>
  );
}
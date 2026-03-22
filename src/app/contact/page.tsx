"use client";

import React, { useEffect, useRef, useState } from "react";
import StructuredData from "../../components/seo/StructuredData";
import "./ContactPage.css";

export default function ContactPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hoveredField, setHoveredField] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);

    const section = sectionRef.current;
    if (!section) return;

    // Create floating icons for background
    const floatingIcons: HTMLElement[] = [];
    const iconClasses = [
      'fa-regular fa-message', 'fa-regular fa-envelope', 'fa-regular fa-phone',
      'fa-regular fa-location-dot', 'fa-regular fa-clock', 'fa-regular fa-user',
      'fa-regular fa-paper-plane', 'fa-regular fa-comment', 'fa-regular fa-star'
    ];

    iconClasses.forEach((iconClass, index) => {
      for (let i = 0; i < 3; i++) {
        const icon = document.createElement('i');
        icon.className = `floating-contact-icon ${iconClass}`;
        icon.style.left = `${Math.random() * 100}%`;
        icon.style.top = `${Math.random() * 100}%`;
        icon.style.animationDelay = `${Math.random() * 15}s`;
        icon.style.animationDuration = `${Math.random() * 30 + 20}s`;
        icon.style.fontSize = `${Math.random() * 2 + 1}rem`;
        icon.style.opacity = `${Math.random() * 0.08 + 0.02}`;
        section.appendChild(icon);
        floatingIcons.push(icon);
      }
    });

    // Mouse move effect for cards
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll<HTMLElement>('.info-card, .form-card, .faq-item');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      });
    };

    section.addEventListener('mousemove', handleMouseMove);

    return () => {
      floatingIcons.forEach(icon => icon.remove());
      section.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setForm({ name: "", email: "", message: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    } finally {
      setSubmitting(false);
    }
  }

  // Structured data for SEO
  const contactData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact NiCol Technologies",
    url: "https://www.nicol.com/contact",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+251-911-123456",
        contactType: "Customer Service",
        areaServed: "ET",
        availableLanguage: ["English", "Amharic"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Getu Commercial Center, Bole",
      addressLocality: "Addis Ababa",
      postalCode: "1000",
      addressCountry: "ET",
    },
  };

  return (
    <>
      <StructuredData data={contactData} />
      
      <div 
        className={`contact-page ${isVisible ? 'visible' : ''}`} 
        ref={sectionRef}
      >
        {/* Floating Background Icons */}
        <div className="contact-floating-icons"></div>

        {/* Hero Section */}
        <section className="contact-hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-star">✦</span>
                Get In Touch
                <span className="badge-star">✦</span>
              </div>
              <h1 className="hero-title">
                Let's <span className="gradient-text">Connect</span>
              </h1>
              <p className="hero-subtitle">
                Have a project in mind? We'd love to hear about it. 
                Reach out and let's start a conversation.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="contact-main">
          <div className="container">
            <div className="contact-grid">
              {/* Contact Information Column */}
              <div className="contact-info-column">
                <div className="info-card glass-card">
                  <h2 className="info-card-title">
                    <i className="fa-regular fa-circle-info"></i>
                    Contact Information
                  </h2>
                  <p className="info-card-subtitle">
                    We're here to help and answer any questions you might have
                  </p>
                  
                  <div className="info-items">
                    <div 
                      className={`info-item ${hoveredField === 'phone' ? 'hovered' : ''}`}
                      onMouseEnter={() => setHoveredField('phone')}
                      onMouseLeave={() => setHoveredField(null)}
                    >
                      <div className="info-icon-wrapper">
                        <i className="fa-regular fa-phone"></i>
                      </div>
                      <div className="info-details">
                        <h3 className="info-label">Phone</h3>
                        <a href="tel:+251939193603" className="info-value">+251-939-193603</a>
                        <p className="info-note">Mon-Fri 9am-6pm</p>
                      </div>
                    </div>

                    <div 
                      className={`info-item ${hoveredField === 'email' ? 'hovered' : ''}`}
                      onMouseEnter={() => setHoveredField('email')}
                      onMouseLeave={() => setHoveredField(null)}
                    >
                      <div className="info-icon-wrapper">
                        <i className="fa-regular fa-envelope"></i>
                      </div>
                      <div className="info-details">
                        <h3 className="info-label">Email</h3>
                        <a href="mailto:info@nicol.com" className="info-value">Niftalemrex@gmail.com</a>
                        <p className="info-note">24/7 support</p>
                      </div>
                    </div>

                    <div 
                      className={`info-item ${hoveredField === 'address' ? 'hovered' : ''}`}
                      onMouseEnter={() => setHoveredField('address')}
                      onMouseLeave={() => setHoveredField(null)}
                    >
                      <div className="info-icon-wrapper">
                        <i className="fa-regular fa-location-dot"></i>
                      </div>
                      <div className="info-details">
                        <h3 className="info-label">Office</h3>
                        <p className="info-value">Getu Commercial Center</p>
                        <p className="info-note">Bole, Addis Ababa, Ethiopia</p>
                      </div>
                    </div>
                  </div>

                  <div className="business-hours">
                    <h3 className="hours-title">
                      <i className="fa-regular fa-clock"></i>
                      Business Hours
                    </h3>
                    <div className="hours-grid">
                      <div className="hours-row">
                        <span className="days">Monday - Friday</span>
                        <span className="time">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="hours-row">
                        <span className="days">Saturday</span>
                        <span className="time">10:00 AM - 2:00 PM</span>
                      </div>
                      <div className="hours-row">
                        <span className="days">Sunday</span>
                        <span className="time closed">Closed</span>
                      </div>
                    </div>
                  </div>

                  <div className="social-links">
                    <h3 className="social-title">Follow Us</h3>
                    <div className="social-icons">
                      <a href="#" className="social-icon" aria-label="Facebook">
                        <i className="fa-brands fa-facebook-f"></i>
                      </a>
                      <a href="#" className="social-icon" aria-label="Twitter">
                        <i className="fa-brands fa-x-twitter"></i>
                      </a>
                      <a href="#" className="social-icon" aria-label="LinkedIn">
                        <i className="fa-brands fa-linkedin-in"></i>
                      </a>
                      <a href="#" className="social-icon" aria-label="Instagram">
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form Column */}
              <div className="contact-form-column">
                <div className="form-card glass-card">
                  <h2 className="form-card-title">
                    <i className="fa-regular fa-pen-to-square"></i>
                    Send a Message
                  </h2>
                  <p className="form-card-subtitle">
                    We'll get back to you within 24 hours
                  </p>

                  {success && (
                    <div className="success-message">
                      <i className="fa-regular fa-circle-check"></i>
                      <div>
                        <strong>Message sent successfully!</strong>
                        <p>Thank you for contacting us. We'll respond shortly.</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name" className="form-label">
                          <i className="fa-regular fa-user"></i>
                          Full Name <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          placeholder="John Doe"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="form-input"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email" className="form-label">
                          <i className="fa-regular fa-envelope"></i>
                          Email Address <span className="required">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          placeholder="john@example.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="form-input"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message" className="form-label">
                        <i className="fa-regular fa-message"></i>
                        Your Message <span className="required">*</span>
                      </label>
                      <textarea
                        id="message"
                        placeholder="Tell us about your project or inquiry..."
                        rows={6}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="form-textarea"
                        required
                      ></textarea>
                    </div>

                    <div className="form-checkbox">
                      <input type="checkbox" id="consent" required />
                      <label htmlFor="consent">
                        I agree to the <a href="/privacy">privacy policy</a> and consent to being contacted
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="submit-button"
                    >
                      {submitting ? (
                        <>
                          <span className="spinner"></span>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <i className="fa-regular fa-paper-plane"></i>
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <section className="map-section">
          <div className="container">
            <div className="map-card glass-card">
              <div className="map-header">
                <h2 className="map-title">
                  <i className="fa-regular fa-map"></i>
                  Our Location
                </h2>
                <p className="map-subtitle">Visit us at our office in Addis Ababa</p>
              </div>
              <div className="map-container">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.845008905784!2d38.76958806966799!3d9.002166623768426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85ae1242b7f9%3A0xcd63ab57ec12af64!2sGetu%20Commercial%20Center.!5e0!3m2!1sen!2set!4v1773867270452!5m2!1sen!2set" 
                  className="google-map"
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Getu Commercial Center Location"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <div className="container">
            <div className="faq-header">
              <h2 className="faq-title">
                <span className="gradient-text">Frequently</span> Asked Questions
              </h2>
              <p className="faq-subtitle">
                Quick answers to common questions about our services
              </p>
            </div>
            
            <div className="faq-grid">
              <div className="faq-item glass-card">
                <div className="faq-icon">
                  <i className="fa-regular fa-clock"></i>
                </div>
                <h3 className="faq-question">How quickly do you respond?</h3>
                <p className="faq-answer">We typically respond within 24 hours during business days. For urgent matters, give us a call.</p>
              </div>
              
              <div className="faq-item glass-card">
                <div className="faq-icon">
                  <i className="fa-regular fa-globe"></i>
                </div>
                <h3 className="faq-question">Do you support international clients?</h3>
                <p className="faq-answer">Yes, we work with clients worldwide via video calls, email, and project management tools.</p>
              </div>
              
              <div className="faq-item glass-card">
                <div className="faq-icon">
                  <i className="fa-regular fa-code"></i>
                </div>
                <h3 className="faq-question">What services do you offer?</h3>
                <p className="faq-answer">AI solutions, web development, mobile apps, cloud computing, UI/UX design, and IT consulting.</p>
              </div>
              
              <div className="faq-item glass-card">
                <div className="faq-icon">
                  <i className="fa-regular fa-handshake"></i>
                </div>
                <h3 className="faq-question">Do you provide free consultations?</h3>
                <p className="faq-answer">Yes, we offer a free 30-minute consultation to discuss your project and explore potential solutions.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
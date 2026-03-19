"use client";

import React, { useEffect, useRef, useState } from "react";
import "./ServicesPage.css";
import StructuredData from "../../components/seo/StructuredData";

// TypeScript Interfaces
interface ServiceStat {
  projects: string;
  satisfaction: string;
}

interface Service {
  title: string;
  description: string;
  icon: string;
  stats: ServiceStat;
}

interface IconSet {
  class: string;
  count: number;
}

interface MousePosition {
  x: number;
  y: number;
}

const ServicesPage: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Structured data for SEO
  const servicesData = {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "Organization",
      name: "NiCol Technologies",
      url: "https://www.nicol.com/services",
    },
    serviceType: ["Web Development", "Mobile App Development", "AI Solutions", "Cloud Computing", "UI/UX Design", "IT Consulting"],
    areaServed: "ET",
    description:
      "NiCol Technologies provides web, mobile, AI, cloud, design, and consulting services to Ethiopian businesses and startups.",
  };

  // Service list with icons and stats - ALL CARDS NOW HAVE ICONS
  const serviceList: Service[] = [
    { 
      title: "Web Development", 
      description: "Responsive, modern websites using React, Next.js, and Tailwind CSS. Full-stack solutions with optimal performance and SEO.",
      icon: "fa-solid fa-laptop-code", // Web development icon
      stats: { projects: "50+", satisfaction: "98%" }
    },
    { 
      title: "Mobile App Development", 
      description: "Native Android & iOS apps using Kotlin, Java, Flutter, and Dart. Cross-platform solutions with seamless UX.",
      icon: "fa-solid fa-mobile-screen", // Mobile app icon
      stats: { projects: "30+", satisfaction: "95%" }
    },
    { 
      title: "AI Solutions", 
      description: "Intelligent solutions using Python, OpenCV, and machine learning. Custom AI models for your business needs.",
      icon: "fa-solid fa-robot", // AI/robot icon
      stats: { projects: "20+", satisfaction: "97%" }
    },
    { 
      title: "Cloud Computing", 
      description: "Scalable cloud infrastructure on AWS, Azure, and Google Cloud. DevOps practices for continuous delivery.",
      icon: "fa-solid fa-cloud", // Cloud icon
      stats: { projects: "25+", satisfaction: "96%" }
    },
    { 
      title: "UI/UX Design", 
      description: "User-centered design with modern aesthetics. Wireframing, prototyping, and user testing for optimal experiences.",
      icon: "fa-solid fa-paint-brush", // Design brush icon
      stats: { projects: "40+", satisfaction: "99%" }
    },
    { 
      title: "IT Consulting", 
      description: "Strategic technology advice, architecture planning, and digital transformation for businesses of all sizes.",
      icon: "fa-solid fa-headset", // Consulting/headset icon
      stats: { projects: "60+", satisfaction: "100%" }
    },
  ];

  // Expanded icon sets for floating background
  const iconSets: IconSet[] = [
    { class: 'fa-solid fa-cloud', count: 8 }, // Cloud icon for cloud computing
    { class: 'fa-solid fa-laptop-code', count: 6 }, // Web dev icon
    { class: 'fa-solid fa-mobile-screen', count: 7 }, // Mobile icon
    { class: 'fa-solid fa-robot', count: 5 }, // AI icon
    { class: 'fa-solid fa-paint-brush', count: 4 }, // Design icon
    { class: 'fa-solid fa-headset', count: 6 }, // Consulting icon
    { class: 'fa-solid fa-database', count: 5 }, // Database icon
    { class: 'fa-solid fa-shield', count: 4 }, // Security icon
    { class: 'fa-solid fa-chart-line', count: 5 }, // Analytics icon
    { class: 'fa-solid fa-gear', count: 8 } // General gear icon
  ];

  useEffect(() => {
    setIsVisible(true);

    const section = sectionRef.current;
    if (!section) return;

    // Create floating icons
    const floatingIcons: HTMLElement[] = [];

    iconSets.forEach(set => {
      for (let i = 0; i < set.count; i++) {
        const icon = document.createElement('i');
        icon.className = `floating-service-icon ${set.class}`;
        icon.style.left = `${Math.random() * 100}%`;
        icon.style.top = `${Math.random() * 100}%`;
        icon.style.animationDelay = `${Math.random() * 15}s`;
        icon.style.animationDuration = `${Math.random() * 30 + 20}s`;
        icon.style.fontSize = `${Math.random() * 2 + 1}rem`;
        icon.style.opacity = `${Math.random() * 0.1 + 0.02}`;
        section.appendChild(icon);
        floatingIcons.push(icon);
      }
    });

    // Mouse move effect for cards (3D tilt)
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll<HTMLElement>('.service-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      });
    };

    section.addEventListener('mousemove', handleMouseMove);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card) => observer.observe(card));

    // Cleanup function
    return () => {
      floatingIcons.forEach(icon => icon.remove());
      section.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []); // Empty dependency array means this runs once on mount

  // Handle card click
  const handleCardClick = (serviceTitle: string): void => {
    const slug = serviceTitle.toLowerCase().replace(/\s+/g, '-');
    window.location.href = `/services/${slug}`;
  };

  return (
    <section 
      id="services" 
      className={`services ${isVisible ? 'visible' : ''}`} 
      ref={sectionRef}
      aria-label="Our Services Section"
    >
      <StructuredData data={servicesData} />
      <div className="container">
        {/* Section Header */}
        <div className="services-header">
          <span className="services-badge" role="text">
            ✦ Premium Services ✦
          </span>
          <h2 className="services-title">
            <span 
              className="gradient-text" 
              data-text="Professional"
              aria-label="Professional Solutions"
            >
              Professional
            </span> Solutions
          </h2>
          <p className="services-subtitle">
            From concept to deployment, we deliver high‑quality solutions tailored to your needs.
            Experience excellence with our comprehensive service offerings.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div 
          className="services-grid" 
          role="list" 
          aria-label="List of services"
        >
          {serviceList.map((service, idx) => (
            <article
              key={idx}
              className="service-card"
              role="listitem"
              onClick={() => handleCardClick(service.title)}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCardClick(service.title);
                }
              }}
              tabIndex={0}
              aria-labelledby={`service-title-${idx}`}
            >
              <div className="card-icon" aria-hidden="true">
                <i className={service.icon}></i>
              </div>
              
              <h3 
                id={`service-title-${idx}`} 
                className="card-title"
              >
                {service.title}
              </h3>
              
              <p className="card-desc">{service.description}</p>
              
              {/* Stats Section */}
              <div 
                className="service-stats" 
                role="group" 
                aria-label="Service statistics"
              >
                <div className="stat-item">
                  <span 
                    className="stat-number" 
                    aria-label={`${service.stats.projects} projects completed`}
                  >
                    {service.stats.projects}
                  </span>
                  <span className="stat-label">Projects</span>
                </div>
                <div className="stat-item">
                  <span 
                    className="stat-number"
                    aria-label={`${service.stats.satisfaction} client satisfaction rate`}
                  >
                    {service.stats.satisfaction}
                  </span>
                  <span className="stat-label">Satisfaction</span>
                </div>
              </div>

              <a 
                href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`} 
                className="card-link"
                aria-label={`Learn more about ${service.title}`}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                Learn more <span className="arrow" aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
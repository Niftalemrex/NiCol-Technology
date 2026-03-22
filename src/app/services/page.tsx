"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // ========== CONFIGURE BASE PATH ==========
  // Use the actual folder name (no spaces). For example:
  const basePath = "/services/our-services";

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

  // Service list with icons and stats
  const serviceList: Service[] = [
    { 
      title: "Web Development", 
      description: "Responsive, modern websites using React, Next.js, and Tailwind CSS. Full-stack solutions with optimal performance and SEO.",
      icon: "fa-solid fa-laptop-code",
      stats: { projects: "50+", satisfaction: "98%" }
    },
    { 
      title: "Mobile App Development", 
      description: "Native Android & iOS apps using Kotlin, Java, Flutter, and Dart. Cross-platform solutions with seamless UX.",
      icon: "fa-solid fa-mobile-screen",
      stats: { projects: "30+", satisfaction: "95%" }
    },
    { 
      title: "AI Solutions", 
      description: "Intelligent solutions using Python, OpenCV, and machine learning. Custom AI models for your business needs.",
      icon: "fa-solid fa-robot",
      stats: { projects: "20+", satisfaction: "97%" }
    },
    { 
      title: "Cloud Computing", 
      description: "Scalable cloud infrastructure on AWS, Azure, and Google Cloud. DevOps practices for continuous delivery.",
      icon: "fa-solid fa-cloud",
      stats: { projects: "25+", satisfaction: "96%" }
    },
    { 
      title: "UI/UX Design", 
      description: "User-centered design with modern aesthetics. Wireframing, prototyping, and user testing for optimal experiences.",
      icon: "fa-solid fa-paint-brush",
      stats: { projects: "40+", satisfaction: "99%" }
    },
    { 
      title: "IT Consulting", 
      description: "Strategic technology advice, architecture planning, and digital transformation for businesses of all sizes.",
      icon: "fa-solid fa-headset",
      stats: { projects: "60+", satisfaction: "100%" }
    },
  ];

  // Expanded icon sets for floating background
  const iconSets: IconSet[] = [
    { class: 'fa-solid fa-cloud', count: 8 },
    { class: 'fa-solid fa-laptop-code', count: 6 },
    { class: 'fa-solid fa-mobile-screen', count: 7 },
    { class: 'fa-solid fa-robot', count: 5 },
    { class: 'fa-solid fa-paint-brush', count: 4 },
    { class: 'fa-solid fa-headset', count: 6 },
    { class: 'fa-solid fa-database', count: 5 },
    { class: 'fa-solid fa-shield', count: 4 },
    { class: 'fa-solid fa-chart-line', count: 5 },
    { class: 'fa-solid fa-gear', count: 8 }
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
  }, []);

  // Handle card click: navigate to the single page
  const handleCardClick = (serviceTitle: string): void => {
    // Option 1: Navigate to the base path without any identifier
    router.push(basePath);

    // Option 2: If you need to know which service was clicked on the destination page,
    // you can pass a query parameter, like this:
    // const slug = serviceTitle.toLowerCase().replace(/\s+/g, '-');
    // router.push(`${basePath}?service=${slug}`);
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
        <div className="services-grid">
  {serviceList.map((service, idx) => (
    <article
      key={idx}
      className="service-card"
      role="link"
      tabIndex={0}
      onClick={() => handleCardClick(service.title)}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick(service.title);
        }
      }}
      aria-labelledby={`service-title-${idx}`}
    >
      <div className="card-icon" aria-hidden="true">
        <i className={service.icon}></i>
      </div>
      
      <h3 id={`service-title-${idx}`} className="card-title">
        {service.title}
      </h3>
      
      <p className="card-desc">{service.description}</p>
      
      {/* Stats Section */}
      <div className="service-stats" role="group" aria-label="Service statistics">
        <div className="stat-item">
          <span className="stat-number" aria-label={`${service.stats.projects} projects completed`}>
            {service.stats.projects}
          </span>
          <span className="stat-label">Projects</span>
        </div>
        <div className="stat-item">
          <span className="stat-number" aria-label={`${service.stats.satisfaction} client satisfaction rate`}>
            {service.stats.satisfaction}
          </span>
          <span className="stat-label">Satisfaction</span>
        </div>
      </div>

      {/* See More link */}
      <div className="see-more-container">
        <span 
          className="see-more-link" 
          onClick={(e) => {
            e.stopPropagation(); // prevent card click from firing twice
            handleCardClick(service.title);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation();
              handleCardClick(service.title);
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`Learn more about ${service.title}`}
        >
          See More <span className="arrow">→</span>
        </span>
      </div>
    </article>
  ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
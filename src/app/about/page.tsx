"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation"; // 👈 Add this import
import "./AboutPage.css";

// TypeScript Interfaces
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  icon: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

const AboutPage: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter(); // 👈 Initialize router
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);

    const section = sectionRef.current;
    if (!section) return;

    // Create floating particles/tech icons for background
    const floatingIcons: HTMLElement[] = [];
    const iconClasses = [
      'fa-solid fa-lightbulb', 'fa-solid fa-rocket', 'fa-solid fa-code',
      'fa-solid fa-cloud', 'fa-solid fa-robot', 'fa-solid fa-database',
      'fa-solid fa-shield', 'fa-solid fa-chart-line', 'fa-solid fa-brain',
      'fa-regular fa-compass', 'fa-solid fa-microchip', 'fa-solid fa-cubes'
    ];

    iconClasses.forEach((iconClass, index) => {
      for (let i = 0; i < 3; i++) {
        const icon = document.createElement('i');
        icon.className = `floating-about-icon ${iconClass}`;
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
      const cards = document.querySelectorAll<HTMLElement>('.value-card, .team-card');
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

  const milestones: Milestone[] = [
    { year: '2020', title: 'Company Founded', description: 'NiCol Technologies was established with a vision to transform Ethiopian businesses through technology.' },
    { year: '2021', title: 'First 10 Projects', description: 'Successfully delivered web and mobile solutions for local startups and enterprises.' },
    { year: '2022', title: 'AI & Cloud Expansion', description: 'Launched AI solutions and cloud consulting services for enterprise clients.' },
    { year: '2023', title: '50+ Projects Milestone', description: 'Reached 50+ successful projects across 10+ industries with 99% client satisfaction.' }
  ];

  const values = [
    { title: 'Innovation', icon: 'fa-solid fa-lightbulb', description: 'Pushing boundaries with cutting-edge technology and creative solutions.' },
    { title: 'Quality', icon: 'fa-solid fa-medal', description: 'Delivering excellence through rigorous testing and best practices.' },
    { title: 'Integrity', icon: 'fa-solid fa-handshake', description: 'Building trust through transparency, honesty, and ethical practices.' },
    { title: 'Client Success', icon: 'fa-solid fa-trophy', description: 'Your success is our success - we measure our achievements by yours.' }
  ];

  const teamMembers: TeamMember[] = [
    { name: 'Niftalem Awel', role: 'Founder & CEO', bio: 'Full-stack developer with 10+ years experience in building scalable solutions.', icon: 'fa-solid fa-user-tie' },
    { name: 'Hibist Demu', role: 'Lead AI Engineer', bio: 'AI specialist focused on machine learning and computer vision applications.', icon: 'fa-solid fa-brain' },
    { name: 'Merdekiyos Tasew', role: 'Senior Developer', bio: 'Expert in web technologies and cloud architecture.', icon: 'fa-solid fa-laptop-code' },
    { name: 'Abel Tesfu', role: 'UI/UX Director', bio: 'Passionate about creating intuitive and beautiful user experiences.', icon: 'fa-solid fa-paint-brush' }
  ];

  // Handler for contact button click
  const handleContactClick = () => {
    router.push('/contact');
  };

  return (
    <section 
      id="about" 
      className={`about-page ${isVisible ? 'visible' : ''}`} 
      ref={sectionRef}
      aria-label="About Us Section"
    >
      <div className="container">
        {/* Hero Section */}
        <div className="about-hero">
          <div className="about-badge">
            <span className="badge-star">✦</span>
            Who We Are
            <span className="badge-star">✦</span>
          </div>
          
          <h1 className="about-title">
            Building <span className="gradient-text">Digital Excellence</span>
            <br />in Ethiopia
          </h1>
          
          <p className="about-subtitle">
            NiCol Technologies is a premier software development company dedicated to transforming 
            Ethiopian businesses through innovative web, mobile, and AI solutions. 
            We combine global expertise with local understanding.
          </p>
        </div>

        {/* Stats/Metrics Section */}
        <div className="about-stats-grid">
          <div className="stat-card">
            <span className="stat-number">50+</span>
            <span className="stat-label">Projects Completed</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">10+</span>
            <span className="stat-label">Industries Served</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Support Available</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">99%</span>
            <span className="stat-label">Client Satisfaction</span>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mission-section">
          <div className="mission-content">
            <h2 className="section-title">
              Our <span className="gradient-text">Mission</span>
            </h2>
            <p className="mission-text">
              To empower Ethiopian businesses with world-class technology solutions that drive growth, 
              efficiency, and innovation. We believe in the power of technology to transform industries 
              and improve lives.
            </p>
            <div className="mission-highlight">
              <i className="fa-solid fa-quote-left"></i>
              <p>Technology is best when it brings people together and solves real problems.</p>
            </div>
          </div>
          <div className="mission-image">
            <div className="image-placeholder">
              <i className="fa-solid fa-rocket"></i>
              <span>Innovation in Action</span>
            </div>
          </div>
        </div>

        {/* Journey/Milestones */}
        <div className="journey-section">
          <h2 className="section-title centered">
            Our <span className="gradient-text">Journey</span>
          </h2>
          
          <div className="timeline">
            {milestones.map((milestone, idx) => (
              <div className="timeline-item" key={idx}>
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="values-section">
          <h2 className="section-title centered">
            Our <span className="gradient-text">Core Values</span>
          </h2>
          
          <div className="values-grid">
            {values.map((value, idx) => (
              <div 
                className="value-card" 
                key={idx}
                style={{ '--card-index': idx } as React.CSSProperties}
              >
                <div className="value-icon">
                  <i className={value.icon}></i>
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <h2 className="section-title centered">
            Meet Our <span className="gradient-text">Team</span>
          </h2>
          <p className="team-subtitle">
            Passionate experts dedicated to your success
          </p>

          <div className="team-grid">
            {teamMembers.map((member, idx) => (
              <div className="team-card" key={idx}>
                <div className="team-icon">
                  <i className={member.icon}></i>
                </div>
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="about-cta">
          <h2>Ready to Start Your Project?</h2>
          <p>Let's discuss how we can help bring your ideas to life</p>
          <button className="cta-button" onClick={handleContactClick}>
            <span>Contact Us Today</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
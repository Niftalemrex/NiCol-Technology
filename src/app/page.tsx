"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import "./HomePage.css";

interface Review {
  id?: string;
  name: string;
  comment: string;
  rating: number;
  created_at?: string;
}

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
    const hero = heroRef.current;
    if (!hero) return;

    // Create star particles - subtle background effect
    const particles: HTMLDivElement[] = [];
    const numParticles = 1500;

    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.className = 'star-particle';
      
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      
      const size = Math.random() * 2.5 + 1;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (Math.random() * 15 + 15) + 's';
      
      hero.appendChild(particle);
      particles.push(particle);
    }

    // Create shooting stars - just a few for subtle effect
    const shootingStars: HTMLDivElement[] = [];
    const numShootingStars = 50;

    for (let i = 0; i < numShootingStars; i++) {
      const shootingStar = document.createElement('div');
      shootingStar.className = 'shooting-star';
      
      shootingStar.style.left = Math.random() * 100 + '%';
      shootingStar.style.top = Math.random() * 100 + '%';
      shootingStar.style.animationDelay = Math.random() * 15 + 's';
      shootingStar.style.animationDuration = (Math.random() * 4 + 3) + 's';
      
      hero.appendChild(shootingStar);
      shootingStars.push(shootingStar);
    }

    return () => {
      particles.forEach(p => p.remove());
      shootingStars.forEach(s => s.remove());
    };
  }, []);

  const handlePortfolioClick = () => {
    router.push('/services/our-services');
  };

  const handleStartProjectClick = () => {
    router.push('/contact');
  };

  return (
    <section id="hero" className={`hero ${isVisible ? 'visible' : ''}`} ref={heroRef}>
      
     
      {/* Floating Tech Icons - Slightly More Visible */}
      <i className="floating-icon fab fa-react"></i>
      <i className="floating-icon fab fa-python"></i>
      <i className="floating-icon fab fa-js"></i>
      <i className="floating-icon fab fa-docker"></i>
      <i className="floating-icon fab fa-aws"></i>
      <i className="floating-icon fab fa-github"></i>
      <i className="floating-icon fab fa-node-js"></i>
      <i className="floating-icon fas fa-database"></i>
      <i className="floating-icon fab fa-vuejs"></i>
      <i className="floating-icon fab fa-angular"></i>
      <i className="floating-icon fab fa-golang"></i>
      <i className="floating-icon fas fa-cloud"></i>

      <div className="container">
        <div className="hero-center">
          
          {/* Badge */}
          <div className="hero-badge">
            <span className="badge-star">✦</span>
            Full-Stack Developer • Cloud Engineer • AI Specialist
            <span className="badge-star">✦</span>
          </div>

          {/* Headline */}
          <h1 className="hero-title">
            Building <span className="gradient-text">Scalable Software</span>
            <br /> for the <span className="gradient-text">Digital Age</span>
          </h1>

          {/* Description */}
          <p className="hero-desc">
            Architecting powerful web applications, cloud infrastructure,
            and AI solutions that help companies scale faster and operate smarter
            in today's digital landscape.
          </p>

          {/* Tech Stack Pills - Individual Technologies */}
          <div className="tech-stack">
            <span className="tech-pill">React</span>
            <span className="tech-pill">Next.js</span>
            <span className="tech-pill">Node.js</span>
            <span className="tech-pill">Python</span>
            <span className="tech-pill">AWS</span>
            <span className="tech-pill">Azure</span>
            <span className="tech-pill">Docker</span>
            <span className="tech-pill">Kubernetes</span>
            <span className="tech-pill">GraphQL</span>
            <span className="tech-pill">REST</span>
            <span className="tech-pill">MongoDB</span>
            <span className="tech-pill">PostgreSQL</span>
          </div>

          {/* Buttons */}
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={handlePortfolioClick}>
              <span>View Portfolio</span>
              <svg className="btn-icon" viewBox="0 0 24 24" width="20" height="20">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </button>
            <button className="btn btn-secondary" onClick={handleStartProjectClick}>
              <span>Start Project</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
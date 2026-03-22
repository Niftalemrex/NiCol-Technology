"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import "./HomePage.css";

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
    const hero = heroRef.current;
    if (!hero) return;

    // Star particles (unchanged)
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

    // Shooting stars
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

  const handlePortfolioClick = () => router.push('/services/our-services');
  const handleStartProjectClick = () => router.push('/contact');

  // Expanded tech list (40 items)
  const techItems = [
    // Frontend
    'React', 'Next.js', 'Vue.js', 'Angular', 'Svelte', 'TypeScript', 'Tailwind CSS', 'Chakra UI', 'Material-UI', 'Redux', 'Recoil', 'RxJS',
  
    // Backend & APIs
    'Node.js', 'Express.js', 'NestJS', 'Python', 'Django', 'Flask', 'Spring Boot', 'Go', 'Rust', 'C#', '.NET', 'PHP', 'Laravel', 'Ruby on Rails', 'GraphQL', 'REST', 'gRPC',
  
    // Databases
    'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'Elasticsearch', 'Cassandra', 'MariaDB', 'Neo4j', 'Firebase Realtime DB', 'Firestore', 'DynamoDB',
  
    // Cloud / DevOps
    'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Prometheus', 'Grafana', 'Jenkins', 'GitHub Actions', 'CircleCI', 'Travis CI', 'Nginx', 'Apache', 'HAProxy', 'Vercel', 'Netlify', 'Cloudflare',
  
    // Machine Learning / AI
    'TensorFlow', 'PyTorch', 'scikit-learn', 'OpenCV', 'Keras', 'Hugging Face', 'MLflow', 'Pandas', 'NumPy', 'Matplotlib',
  
    // Messaging / Streaming
    'Kafka', 'RabbitMQ', 'MQTT', 'ActiveMQ', 'ZeroMQ',
  
    // Design / Prototyping
    'Figma', 'Adobe XD', 'Sketch', 'InVision', 'Photoshop', 'Illustrator',
  
    // Others / Tools
    'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Swagger', 'Postman', 'Jira', 'Confluence', 'Sentry', 'LogRocket', 'Vite', 'Webpack', 'Babel', 'ESLint', 'Prettier'
  ];

  // Use 4 copies to ensure the track is much wider than the viewport (seamless loop)
  const longList = [...techItems, ...techItems, ...techItems, ...techItems];

  return (
    <section id="hero" className={`hero ${isVisible ? 'visible' : ''}`} ref={heroRef}>
      {/* Floating Icons (unchanged) */}
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
          <div className="hero-badge">
            <span className="badge-star">✦</span>
            Full-Stack Developer • Cloud Engineer • AI Specialist
            <span className="badge-star">✦</span>
          </div>

          <h1 className="hero-title">
            Building <span className="gradient-text">Scalable Software</span>
            <br /> for the <span className="gradient-text">Digital Age</span>
          </h1>

          <p className="hero-desc">
            Architecting powerful web applications, cloud infrastructure,
            and AI solutions that help companies scale faster and operate smarter
            in today's digital landscape.
          </p>

          {/* Tech Stack Marquee – now with 3 rows and expanded list */}
          <div className="tech-marquee-container">
            {/* Row 1: moves left */}
            <div className="marquee-row scroll-left">
              <div className="marquee-track">
                {longList.map((tech, idx) => (
                  <span key={idx} className="tech-pill">{tech}</span>
                ))}
              </div>
            </div>
            {/* Row 2: moves right */}
            <div className="marquee-row scroll-right">
              <div className="marquee-track">
                {longList.map((tech, idx) => (
                  <span key={idx} className="tech-pill">{tech}</span>
                ))}
              </div>
            </div>
            {/* Row 3: moves left */}
            <div className="marquee-row scroll-left">
              <div className="marquee-track">
                {longList.map((tech, idx) => (
                  <span key={idx} className="tech-pill">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={handlePortfolioClick}>
              <span>View Services</span>
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
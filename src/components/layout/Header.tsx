"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import "./Header.css";

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isAdminKeyVisible, setIsAdminKeyVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const autoHideTimer = useRef<NodeJS.Timeout | null>(null);

  // Constants (in milliseconds)
  const LONG_PRESS_DELAY = 2000;      // hold to trigger key
  const SLIDE_OUT_DURATION = 2000;    // matches CSS transition for showing
  const VISIBLE_DURATION = 1000;      // time fully visible before auto‑hide

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Clear all timers
  const clearTimers = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    if (autoHideTimer.current) {
      clearTimeout(autoHideTimer.current);
      autoHideTimer.current = null;
    }
  };

  // Show key and schedule auto‑hide
  const showKeyAndScheduleHide = () => {
    setIsAdminKeyVisible(true);
    // Cancel any existing auto‑hide
    if (autoHideTimer.current) {
      clearTimeout(autoHideTimer.current);
    }
    // Schedule hide after slide‑out + visible duration
    autoHideTimer.current = setTimeout(() => {
      setIsAdminKeyVisible(false);
      autoHideTimer.current = null;
    }, SLIDE_OUT_DURATION + VISIBLE_DURATION);
  };

  // Long press start
  const startLongPress = () => {
    // Clear any previous long‑press timer
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    longPressTimer.current = setTimeout(() => {
      showKeyAndScheduleHide();
      longPressTimer.current = null;
    }, LONG_PRESS_DELAY);
  };

  // Cancel long press (if released early)
  const cancelLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  // Prevent context menu on long press
  const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();

  // Handle key click – navigate to admin auth and cancel auto‑hide
  const handleKeyClick = () => {
    clearTimers(); // stop any pending auto‑hide
    // Navigation is handled by Link, so no extra action needed
  };

  // Close mobile nav when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileNavOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => clearTimers();
  }, []);

  // Close mobile nav when clicking a link
  const handleMobileLinkClick = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Logo + Key Icon */}
          <div
            className="header-logo-wrapper"
            onMouseDown={startLongPress}
            onMouseUp={cancelLongPress}
            onMouseLeave={cancelLongPress}
            onTouchStart={startLongPress}
            onTouchEnd={cancelLongPress}
            onTouchCancel={cancelLongPress}
            onContextMenu={handleContextMenu}
          >
            <Link href="/" className="header-logo">
              <span className="logo-text">NiCol</span>
              <span className="logo-accent">Technologies</span>
            </Link>

            {/* 🔐 Key icon link */}
            <div className={`key-icon ${isAdminKeyVisible ? "visible" : ""}`}>
              <Link
                href="/admin/auth"
                className="key-link"
                title="Admin Access"
                onClick={handleKeyClick}
              >
                <span className="key-emoji">🔑</span>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="header-nav-desktop">
            <ul>
              <li><Link href="/" className="nav-link">Home</Link></li>
              <li><Link href="/about" className="nav-link">About</Link></li>
              <li><Link href="/services" className="nav-link">Services</Link></li>
              <li><Link href="/reviews" className="nav-link">Reviews</Link></li>
              <li><Link href="/contact" className="nav-link">Contact</Link></li>
            </ul>
          </nav>

          {/* Mobile Burger Button */}
          <button
            className={`header-burger ${isMobileNavOpen ? "open" : ""}`}
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileNavOpen}
          >
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </button>
        </div>

        {/* Mobile Navigation Slide-down */}
        <div className={`mobile-nav ${isMobileNavOpen ? "open" : ""}`}>
          <nav>
            <ul>
              <li><Link href="/" onClick={handleMobileLinkClick} className="mobile-nav-link">Home</Link></li>
              <li><Link href="/about" onClick={handleMobileLinkClick} className="mobile-nav-link">About</Link></li>
              <li><Link href="/services" onClick={handleMobileLinkClick} className="mobile-nav-link">Services</Link></li>
              <li><Link href="/reviews" onClick={handleMobileLinkClick} className="mobile-nav-link">Reviews</Link></li>
              <li><Link href="/contact" onClick={handleMobileLinkClick} className="mobile-nav-link">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
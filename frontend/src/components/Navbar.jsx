import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, CloseIcon } from './Icons';
import { gsap } from 'gsap';
import '../styles/style-navbar.css';

export default function Navbar({ activeTab = 'home', onNavClick = () => {} }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const wrapperRef = useRef(null);
  const brandRef   = useRef(null);
  const linksRef   = useRef(null);

  const closeMenu = () => setMobileMenuOpen(false);

  /* ── GSAP entrance: navbar drops from above, then brand + links stagger in ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Navbar bar drops in from above
      tl.fromTo(
        wrapperRef.current,
        { y: -80, opacity: 0 },
        { y: 0,   opacity: 1, duration: 0.7 }
      )
      // Brand fades in from left
      .fromTo(
        brandRef.current,
        { x: -30, opacity: 0 },
        { x: 0,   opacity: 1, duration: 0.5 },
        '-=0.35'
      )
      // Nav links stagger in from top
      .fromTo(
        linksRef.current?.querySelectorAll('li') ?? [],
        { y: -16, opacity: 0 },
        { y: 0,   opacity: 1, duration: 0.4, stagger: 0.08 },
        '-=0.25'
      );
    });

    return () => ctx.revert();
  }, []);

  const handleHomeClick = (e) => {
    e.preventDefault();
    closeMenu();
    onNavClick('home');
  };

  const handleRentClick = (e) => {
    e.preventDefault();
    closeMenu();
    onNavClick('rent');
  };

  const isHomeActive = location.pathname === '/' && activeTab === 'home';
  const isRentActive = location.pathname === '/' && activeTab === 'rent';

  return (
    <div className="floating-navbar-wrapper" ref={wrapperRef} style={{ opacity: 0 }}>
      <header className="site-header floating-navbar">
        <nav className="navbar">
          {/* Logo Brand */}
          <a
            href="/"
            className="navbar-brand"
            onClick={handleHomeClick}
            ref={brandRef}
            style={{ opacity: 0 }}
          >
            <span className="brand-script-text">
              GarbaFits
            </span>
          </a>

          {/* Nav Links */}
          <ul
            className={`navbar-links ${mobileMenuOpen ? 'open' : ''}`}
            ref={linksRef}
          >
            <li>
              <button
                type="button"
                className={`nav-link ${isHomeActive ? 'active' : ''}`}
                onClick={handleHomeClick}
              >
                Home
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`nav-link ${isRentActive ? 'active' : ''}`}
                onClick={handleRentClick}
              >
                Rent
              </button>
            </li>
            <li>
              <Link
                to="/about"
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </nav>
      </header>
    </div>
  );
}

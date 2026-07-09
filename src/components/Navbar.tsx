"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./Navbar.module.css";

const NAV_LINKS = ["Menu", "Experience", "Gallery", "Reservations", "Contact"];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Stagger nav links on mount
  useEffect(() => {
    const links = navRef.current?.querySelectorAll(`.${styles.navLink}`);
    if (!links) return;
    gsap.fromTo(
      links,
      { y: -12, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.4,
      }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}
    >
      {/* Logo */}
      <a href="/" className={styles.logo} aria-label="ADapollo Home">
        <Image
          src="/logo.png"
          alt="ADapollo Logo"
          width={120}
          height={48}
          priority
          className={styles.logoImg}
        />
        <span className={styles.logoText}>ADapollo</span>
      </a>

      {/* Desktop Nav Links */}
      <ul className={styles.navLinks} role="list">
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`} className={styles.navLink}>
              <span>{link}</span>
              <span className={styles.linkUnderline} />
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a href="#reservations" className={styles.reserveBtn}>
        <span>Reserve</span>
      </a>

      {/* Mobile hamburger */}
      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span className={`${styles.bar} ${menuOpen ? styles.open : ""}`} />
        <span className={`${styles.bar} ${menuOpen ? styles.open : ""}`} />
        <span className={`${styles.bar} ${menuOpen ? styles.open : ""}`} />
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={styles.mobileLink}
              style={{ animationDelay: `${i * 0.06}s` }}
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <a href="#reservations" className={styles.mobileReserve} onClick={() => setMenuOpen(false)}>
            Reserve a Table
          </a>
        </div>
      )}
    </nav>
  );
}

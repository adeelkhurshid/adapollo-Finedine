"use client";

import Image from "next/image";
import styles from "./Footer.module.css";

const NAV = ["Menu", "Experience", "Gallery", "Reservations", "Contact"];
const SOCIAL = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "TripAdvisor", href: "#" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Top rule */}
      <div className={styles.topRule} />

      <div className={styles.container}>
        {/* Brand + tagline */}
        <div className={styles.brand}>
          <Image
            src="/logo.png"
            alt="ADapollo"
            width={40}
            height={40}
            className={styles.logoImg}
          />
          <span className={styles.logoName}>ADapollo</span>
          <p className={styles.tagline}>
            Michelin-Star Fine Dining<br />London, SW1X 8HT
          </p>
          <div className={styles.stars}>
            {[...Array(3)].map((_, i) => <span key={i} className={styles.star}>★</span>)}
          </div>
        </div>

        {/* Nav Links */}
        <div className={styles.links}>
          <p className={styles.colTitle}>Navigation</p>
          <ul className={styles.linkList}>
            {NAV.map((n) => (
              <li key={n}>
                <a href={`#${n.toLowerCase()}`} className={styles.link}>{n}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Opening Hours */}
        <div className={styles.hours}>
          <p className={styles.colTitle}>Opening Hours</p>
          <div className={styles.hoursList}>
            {[
              ["Wednesday", "18:00 – 23:00"],
              ["Thursday", "18:00 – 23:00"],
              ["Friday", "18:00 – 23:30"],
              ["Saturday", "17:30 – 23:30"],
              ["Sunday", "17:30 – 22:30"],
            ].map(([day, time]) => (
              <div key={day} className={styles.hourRow}>
                <span className={styles.day}>{day}</span>
                <span className={styles.time}>{time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact + Social */}
        <div className={styles.contact}>
          <p className={styles.colTitle}>Contact</p>
          <div className={styles.contactList}>
            <a href="tel:+442071234567" className={styles.contactItem}>+44 20 7123 4567</a>
            <a href="mailto:hello@adapollo.com" className={styles.contactItem}>hello@adapollo.com</a>
            <p className={styles.contactItem}>12 Belgravia Row, London</p>
          </div>
          <div className={styles.social}>
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} className={styles.socialLink} aria-label={s.label}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className={styles.bottomRule} />
      <div className={styles.bottom}>
        <p>© 2026 ADapollo Restaurant. All rights reserved.</p>
        <p>Privacy Policy · Terms of Service</p>
      </div>
    </footer>
  );
}

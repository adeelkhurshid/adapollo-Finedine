"use client";

import { useRef } from "react";
import styles from "./ReservationSection.module.css";

export default function ReservationSection() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production this would POST to a reservation API
    alert("Thank you for your reservation request. Our team will confirm within 24 hours.");
  };

  return (
    <section className={styles.section} id="reservations">
      {/* Background accent */}
      <div className={styles.bgAccent} />

      <div className={styles.container}>
        {/* Left: Text */}
        <div className={styles.left}>
          <span className={styles.label}>Reservations</span>
          <h2 className={styles.title}>
            Reserve Your<br />
            <em>Table</em>
          </h2>
          <p className={styles.desc}>
            We seat 50 guests per evening across two sittings.
            Reservations are strongly recommended and can be made up to
            90 days in advance.
          </p>

          {/* Info blocks */}
          <div className={styles.infoGrid}>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Dinner Service</span>
              <span className={styles.infoValue}>Wed – Sun</span>
              <span className={styles.infoSub}>18:00 & 20:30</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Location</span>
              <span className={styles.infoValue}>12 Belgravia Row</span>
              <span className={styles.infoSub}>London, SW1X 8HT</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Dress Code</span>
              <span className={styles.infoValue}>Smart Elegant</span>
              <span className={styles.infoSub}>Business casual minimum</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Contact</span>
              <span className={styles.infoValue}>+44 20 7123 4567</span>
              <span className={styles.infoSub}>hello@adapollo.com</span>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className={styles.right}>
          <div className={styles.formCard}>
            <h3 className={styles.formTitle}>Make a Reservation</h3>

            <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="res-name">Full Name</label>
                  <input
                    id="res-name"
                    type="text"
                    required
                    placeholder="Your name"
                    className={styles.input}
                    autoComplete="name"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="res-email">Email</label>
                  <input
                    id="res-email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className={styles.input}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="res-date">Date</label>
                  <input
                    id="res-date"
                    type="date"
                    required
                    className={styles.input}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="res-time">Sitting</label>
                  <select id="res-time" className={styles.input} required>
                    <option value="">Select sitting</option>
                    <option value="18:00">18:00 – First Sitting</option>
                    <option value="20:30">20:30 – Second Sitting</option>
                  </select>
                </div>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="res-guests">Guests</label>
                  <select id="res-guests" className={styles.input} required>
                    <option value="">Party size</option>
                    {[1,2,3,4,5,6,7,8].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="res-occasion">Occasion</label>
                  <select id="res-occasion" className={styles.input}>
                    <option value="">Select (optional)</option>
                    <option value="birthday">Birthday</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="business">Business Dinner</option>
                    <option value="proposal">Proposal</option>
                    <option value="celebration">Celebration</option>
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="res-notes">Special Requests</label>
                <textarea
                  id="res-notes"
                  placeholder="Dietary requirements, allergies, special arrangements..."
                  className={`${styles.input} ${styles.textarea}`}
                  rows={3}
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                <span>Confirm Reservation</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <p className={styles.disclaimer}>
                Reservations are subject to availability. A credit card is required to hold your booking. Cancellations within 24 hours may incur a charge.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

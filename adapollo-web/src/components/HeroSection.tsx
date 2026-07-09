"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "./HeroSection.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const plateImgRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Entrance Animations ──────────────────────────────────
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        eyebrowRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
        .fromTo(
          headlineRef.current?.children ?? [],
          { y: 60, opacity: 0, skewY: 2 },
          { y: 0, opacity: 1, skewY: 0, duration: 1.2, stagger: 0.12, ease: "power4.out" },
          "-=0.6"
        )
        .fromTo(
          sublineRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.7"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          plateRef.current,
          { scale: 0.88, opacity: 0, y: 40, rotate: -3 },
          { scale: 1, opacity: 1, y: 0, rotate: 0, duration: 1.6, ease: "power4.out" },
          "-=1.2"
        );

      // ── Scroll-driven Plate Animation ───────────────────────
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        // Desktop: plate exits bottom-right with rotation
        const plateTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
            pin: true,
            pinSpacing: true,
          },
        });

        plateTl
          .to(
            plateRef.current,
            {
              x: "52vw",
              y: "70vh",
              rotation: 95,
              scale: 0.75,
              ease: "power2.inOut",
              duration: 1,
            },
            0
          )
          .to(
            plateImgRef.current,
            {
              filter: "drop-shadow(0 0 120px rgba(201,168,76,0.4)) drop-shadow(0 40px 100px rgba(0,0,0,0.9))",
              ease: "none",
              duration: 0.4,
            },
            0
          )
          .to(
            headlineRef.current,
            { y: -80, opacity: 0, ease: "power2.in", duration: 0.5 },
            0
          )
          .to(
            sublineRef.current,
            { y: -40, opacity: 0, ease: "power2.in", duration: 0.4 },
            0
          )
          .to(
            ctaRef.current,
            { y: -30, opacity: 0, scale: 0.95, ease: "power2.in", duration: 0.35 },
            0
          )
          .to(
            eyebrowRef.current,
            { y: -20, opacity: 0, ease: "power2.in", duration: 0.3 },
            0
          )
          .to(
            ambientRef.current,
            { opacity: 0, duration: 0.5 },
            0
          );
      });

      mm.add("(max-width: 768px)", () => {
        // Mobile: simpler downward exit
        gsap.to(plateRef.current, {
          y: "60vh",
          x: "25vw",
          rotation: 60,
          scale: 0.65,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "60% top",
            scrub: 1.5,
          },
        });
        gsap.to([headlineRef.current, sublineRef.current, ctaRef.current], {
          y: -50,
          opacity: 0,
          ease: "power2.in",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "30% top",
            scrub: 1,
          },
        });
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero} id="home">
      {/* Ambient background blobs */}
      <div ref={ambientRef} className={styles.ambient}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />
        <div className={styles.blob3} />
      </div>

      {/* Grain overlay */}
      <div className={styles.grain} />

      {/* Text Content */}
      <div className={styles.textContent}>
        {/* Eyebrow */}
        <div ref={eyebrowRef} className={styles.eyebrow}>
          <span className={styles.eyebrowLine} />
          <span>Michelin Star Dining · Est. 2019</span>
          <span className={styles.eyebrowLine} />
        </div>

        {/* Headline */}
        <div ref={headlineRef} className={styles.headline}>
          <span className={styles.headlineRow}>Culinary</span>
          <span className={`${styles.headlineRow} ${styles.headlineGold}`}>
            Excellence
          </span>
          <span className={styles.headlineRow}>Redefined</span>
        </div>

        {/* Subline */}
        <p ref={sublineRef} className={styles.subline}>
          A sensory journey through the finest seasonal ingredients,<br />
          crafted with obsessive precision and served with grace.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className={styles.cta}>
          <a href="#reservations" className={styles.ctaBtn}>
            <span>Reserve a Table</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#menu" className={styles.ctaSecondary}>Explore Menu</a>
        </div>

        {/* Scroll indicator */}
        <div className={styles.scrollHint}>
          <div className={styles.scrollLine} />
          <span>Scroll</span>
        </div>
      </div>

      {/* Plate */}
      <div ref={plateRef} className={styles.plateWrapper}>
        {/* Plate glow */}
        <div className={styles.plateGlow} />
        {/* Plate shadow on floor */}
        <div className={styles.plateShadow} />
        {/* Actual plate image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={plateImgRef}
          src="/steak.png"
          alt="ADapollo signature Wagyu steak, plated with Michelin-star precision"
          className={styles.plateImg}
          loading="eager"
        />
      </div>

      {/* Decorative vertical text */}
      <div className={styles.verticalText}>ADapollo · Fine Dining</div>
    </section>
  );
}

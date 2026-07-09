"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ExperienceSection.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PILLARS = [
  {
    number: "I",
    title: "The Craft",
    desc: "Every component of each dish is hand-made with obsessive attention to technique, from hand-rolled pasta to hand-churned butter.",
  },
  {
    number: "II",
    title: "The Season",
    desc: "Our menu changes with the harvest. We work directly with farmers and foragers to access ingredients at their absolute peak.",
  },
  {
    number: "III",
    title: "The Space",
    desc: "50 covers. Low candlelight. A room designed for conversation, intimacy, and the unhurried pleasure of a great meal.",
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on background
      gsap.to(bgRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Quote reveal
      gsap.fromTo(
        quoteRef.current?.children ?? [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Pillars
      const pillars = pillarsRef.current?.querySelectorAll(`.${styles.pillar}`);
      if (pillars) {
        gsap.fromTo(
          pillars,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="experience">
      {/* Parallax BG */}
      <div ref={bgRef} className={styles.bg}>
        <div className={styles.bgGrad} />
      </div>

      {/* Top rule */}
      <div className={styles.rule} />

      <div className={styles.container}>
        {/* Quote Block */}
        <div ref={quoteRef} className={styles.quoteBlock}>
          <div className={styles.quoteIcon}>"</div>
          <blockquote className={styles.quote}>
            Every plate tells a story<br />
            <em>of obsession</em>
          </blockquote>
          <cite className={styles.author}>— Chef Elara Danton, Executive Chef</cite>
          <div className={styles.stars}>
            {[...Array(3)].map((_, i) => (
              <span key={i} className={styles.star}>★</span>
            ))}
            <span className={styles.starsLabel}>Michelin Stars</span>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.centerRule} />

        {/* Pillars */}
        <div ref={pillarsRef} className={styles.pillars}>
          {PILLARS.map((p) => (
            <div key={p.number} className={styles.pillar}>
              <span className={styles.pillarNumber}>{p.number}</span>
              <div className={styles.pillarLine} />
              <h3 className={styles.pillarTitle}>{p.title}</h3>
              <p className={styles.pillarDesc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom rule */}
      <div className={styles.rule} />
    </section>
  );
}

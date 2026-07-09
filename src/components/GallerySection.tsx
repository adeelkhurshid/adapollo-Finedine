"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./GallerySection.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const IMAGES = [
  { src: "/steak.png",        alt: "Wagyu A5 — Signature steak, matte ceramic plate",          label: "Wagyu A5",       span: "wide" },
  { src: "/dish-scallops.png",alt: "Pan-Seared Scallops — sea herbs, foam velouté",             label: "Scallops",       span: "tall" },
  { src: "/dish-duck.png",    alt: "Duck Magret — cherry reduction, heritage carrots",           label: "Duck Magret",    span: "normal" },
  { src: "/dish-dessert.png", alt: "Valrhona Sphere — 24k gold, raspberry coulis",              label: "Valrhona Sphere",span: "normal" },
  { src: "/dish-duck.png",    alt: "Duck breast — close-up, crispy skin detail",                label: "The Detail",     span: "wide" },
  { src: "/dish-scallops.png",alt: "Scallops — overhead editorial shot",                        label: "Editorial",      span: "normal" },
];

export default function GallerySection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const titleRef     = useRef<HTMLDivElement>(null);
  const gridRef      = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        titleRef.current?.children ?? [],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Grid items stagger
      const items = gridRef.current?.querySelectorAll(`.${styles.item}`);
      if (items) {
        gsap.fromTo(
          items,
          { y: 50, opacity: 0, scale: 0.97 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.85, stagger: 0.1, ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // close lightbox on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveIdx(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="gallery">
      <div className={styles.topRule} />

      <div className={styles.container}>
        {/* Title */}
        <div ref={titleRef} className={styles.titleBlock}>
          <span className={styles.label}>Gallery</span>
          <h2 className={styles.title}>
            Through the<br /><em>Lens</em>
          </h2>
          <p className={styles.sub}>
            Every plate is a canvas. Every ingredient, a brushstroke.
          </p>
        </div>

        {/* Masonry Grid */}
        <div ref={gridRef} className={styles.grid}>
          {IMAGES.map((img, i) => (
            <button
              key={i}
              className={`${styles.item} ${styles[img.span]}`}
              onClick={() => setActiveIdx(i)}
              aria-label={`View ${img.label}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.img}
              />
              <div className={styles.overlay}>
                <div className={styles.overlayInner}>
                  <span className={styles.overlayLabel}>{img.label}</span>
                  <svg className={styles.overlayIcon} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.bottomRule} />

      {/* Lightbox */}
      {activeIdx !== null && (
        <div
          className={styles.lightbox}
          onClick={() => setActiveIdx(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button className={styles.lightboxClose} onClick={() => setActiveIdx(null)} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Prev */}
          {activeIdx > 0 && (
            <button
              className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
              onClick={(e) => { e.stopPropagation(); setActiveIdx(activeIdx - 1); }}
              aria-label="Previous image"
            >‹</button>
          )}

          <div className={styles.lightboxImg} onClick={(e) => e.stopPropagation()}>
            <Image
              src={IMAGES[activeIdx].src}
              alt={IMAGES[activeIdx].alt}
              fill
              sizes="90vw"
              className={styles.lightboxImgEl}
              priority
            />
            <p className={styles.lightboxCaption}>{IMAGES[activeIdx].label}</p>
          </div>

          {/* Next */}
          {activeIdx < IMAGES.length - 1 && (
            <button
              className={`${styles.lightboxNav} ${styles.lightboxNext}`}
              onClick={(e) => { e.stopPropagation(); setActiveIdx(activeIdx + 1); }}
              aria-label="Next image"
            >›</button>
          )}
        </div>
      )}
    </section>
  );
}

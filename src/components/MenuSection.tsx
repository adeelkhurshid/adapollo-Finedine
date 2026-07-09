"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./MenuSection.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DISHES = [
  {
    id: "steak",
    number: "01",
    name: "Wagyu A5",
    subtitle: "The Signature",
    description:
      "Japanese Wagyu, grade A5. Aged 28 days. Served with black truffle jus, roasted bone marrow, and smoked maldon.",
    src: "/steak.png",
    price: "£185",
    category: "Main Course",
  },
  {
    id: "scallops",
    number: "02",
    name: "Pan-Seared Scallops",
    subtitle: "From the Sea",
    description:
      "Hand-dived king scallops, cauliflower velouté, crispy capers, lemon oil, and sea herbs.",
    src: "/dish-scallops.png",
    price: "£68",
    category: "Starter",
  },
  {
    id: "duck",
    number: "03",
    name: "Duck Magret",
    subtitle: "Farm to Table",
    description:
      "Barbary duck breast, cherry reduction, roasted heritage carrots, juniper jus.",
    src: "/dish-duck.png",
    price: "£94",
    category: "Main Course",
  },
  {
    id: "dessert",
    number: "04",
    name: "Valrhona Sphere",
    subtitle: "Sweet Finale",
    description:
      "Dark chocolate sphere, salted caramel heart, raspberry coulis, edible 24k gold leaf.",
    src: "/dish-dessert.png",
    price: "£42",
    category: "Dessert",
  },
];

export default function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        titleRef.current?.children ?? [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards stagger
      const cards = cardsRef.current?.querySelectorAll(`.${styles.card}`);
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="menu">
      {/* Top gold rule */}
      <div className={styles.topRule} />

      <div className={styles.container}>
        {/* Section Title */}
        <div ref={titleRef} className={styles.titleBlock}>
          <span className={styles.sectionLabel}>The Menu</span>
          <h2 className={styles.sectionTitle}>
            Signatures of<br />
            <em>Excellence</em>
          </h2>
          <p className={styles.sectionSub}>
            Each dish is a meditation — a balance of memory, technique, and season.
            Our menu evolves with the finest ingredients available.
          </p>
        </div>

        {/* Dishes Grid */}
        <div ref={cardsRef} className={styles.grid}>
          {DISHES.map((dish) => (
            <article key={dish.id} className={styles.card}>
              {/* Image */}
              <div className={styles.imgWrapper}>
                <Image
                  src={dish.src}
                  alt={dish.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.img}
                />
                <div className={styles.imgOverlay} />
                <span className={styles.category}>{dish.category}</span>
              </div>

              {/* Card Body */}
              <div className={styles.cardBody}>
                <span className={styles.dishNumber}>{dish.number}</span>
                <div className={styles.dishMeta}>
                  <p className={styles.dishSubtitle}>{dish.subtitle}</p>
                  <h3 className={styles.dishName}>{dish.name}</h3>
                  <p className={styles.dishDesc}>{dish.description}</p>
                </div>
                <div className={styles.dishFooter}>
                  <div className={styles.rule} />
                  <span className={styles.price}>{dish.price}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.menuCta}>
          <a href="#" className={styles.fullMenuBtn}>
            <span>View Full Menu</span>
          </a>
        </div>
      </div>
    </section>
  );
}

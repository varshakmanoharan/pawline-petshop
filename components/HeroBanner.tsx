"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const AUTOPLAY_MS = 6000;

const slides = [
  {
    image: "/assets/banner1.png",
    alt: "Woman hugging her golden retriever in warm natural light",
    ctaLabel: "Shop new arrivals",
    ctaHref: "/shop",
  },
  {
    image: "/assets/banner2.png",
    alt: "Dog catching a frisbee mid-air in a sunny park",
    ctaLabel: "Shop toys",
    ctaHref: "/shop?category=Dogs",
  },
  {
    image: "/assets/banner3.png",
    alt: "Dog sleeping peacefully on a cozy bed",
    ctaLabel: "Shop beds",
    ctaHref: "/shop?category=Cats",
  },
];

const slideVariants = {
  enter: (direction) => ({ opacity: 0, x: direction > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (direction) => ({ opacity: 0, x: direction > 0 ? -60 : 60 }),
};

export default function HeroBanner() {
  const prefersReducedMotion = useReducedMotion();
  const [[index, direction], setSlide] = useState([0, 0]);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((next) => {
    setSlide(([current]) => {
      const normalized = (next + slides.length) % slides.length;
      return [
        normalized,
        normalized > current ||
        (current === slides.length - 1 && normalized === 0)
          ? 1
          : -1,
      ];
    });
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    timerRef.current = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [paused, prefersReducedMotion, next]);

  const slide = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured promotions"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative flex min-h-[78svh] w-full items-end overflow-hidden md:min-h-[86svh]"
    >
      {/* ============== SLIDES ============== */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={index}
          custom={direction}
          variants={prefersReducedMotion ? undefined : slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: "easeInOut" }}
          drag={prefersReducedMotion ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) next();
            else if (info.offset.x > 80) goTo(index - 1);
          }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            sizes="100vw"
            className="pointer-events-none object-cover object-[50%_65%]"
            priority={index === 0}
          />

          {/* ============== GRADIENT OVERLAYS ============== */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ============== CONTENT ============== */}
      <div className="relative z-10 mx-auto w-full max-w-content px-6 pb-14 pt-32 md:pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex justify-start"
          >
            <div className="flex flex-wrap items-center gap-4">
              {/* Primary CTA — pine green */}
              <Link
                href={slide.ctaHref}
                className="group inline-flex items-center gap-2.5 rounded-full bg-pine px-9 py-4 text-base font-semibold text-white shadow-lg shadow-pine/20 transition-all hover:-translate-y-0.5 hover:bg-pine/90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ink md:px-10 md:text-lg"
              >
                {slide.ctaLabel}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full px-9 py-4 text-base font-semibold text-white ring-2 ring-white/40 backdrop-blur-sm transition-colors hover:bg-white/10 hover:ring-pine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine focus-visible:ring-offset-2 focus-visible:ring-offset-ink md:px-10 md:text-lg"
              >
                Explore categories
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ============== DOTS ============== */}
        <div className="mt-10 flex items-center gap-2 md:mt-14">
          {slides.map((s, i) => (
            <button
              key={s.alt}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className="group flex h-6 items-center focus-visible:outline-none"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-8 bg-pine"
                    : "w-4 bg-white/40 group-hover:bg-white/70"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
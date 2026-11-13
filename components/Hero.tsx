"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className="mx-auto max-w-content px-6 pb-16 pt-10 md:pb-24 md:pt-16">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid items-center gap-10 md:grid-cols-2 md:gap-6"
      >
        <div>
          <motion.p
            variants={item}
            className="text-sm font-semibold text-pine"
          >
            Open daily on Maple Street
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-4 font-display text-[2.75rem] font-bold leading-[1.05] tracking-tight md:text-6xl"
          >
            Good stuff for
            <br />
            the animals in
            <br />
            your house.
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-5 max-w-[42ch] text-base leading-relaxed text-ink/70"
          >
            We taste-test the treats, wash-test the beds, and only carry what
            we'd bring home ourselves — for dogs, cats, small pets, birds,
            and aquariums alike.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex items-center gap-4">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 rounded-full bg-pine px-5 px-6 py-3 text-sm font-semibold text-parchment transition-colors hover:bg-pine-dark"
            >
              Browse the shop
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold text-ink/70 hover:text-ink"
            >
              Visit us
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={item}
          className="relative grid grid-cols-2 gap-3 md:gap-4"
        >
          {/* ============ MAIN IMAGE — dog in-store, shopping cart ============ */}
          <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-card">
            <Image
              src="/assets/image1.png"
              alt="Beagle resting in a navy and orange dog bed"
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover object-center"
              priority
            />
          </div>

          {/* ============ PRODUCT IN USE — matches "wash-test the beds" ============ */}
          <div className="relative aspect-square overflow-hidden rounded-card">
            <Image
              src="/assets/image3.png"
              alt="Small dog resting in a mustard-colored covered bed"
              fill
              sizes="(min-width: 768px) 20vw, 45vw"
              className="object-cover object-center"
            />
          </div>

          {/* ============ FEATURED PET IMAGE ============ */}
          <div className="relative aspect-square overflow-hidden rounded-card">
            <Image
              src="/assets/image2.jpg"
              alt="Small dog wearing a red plaid bandana"
              fill
              sizes="(min-width: 768px) 20vw, 45vw"
              className="object-cover object-center"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    label: "Toys",
    href: "/shop/toys",
    image: "/assets/offer1.png",
    alt: "Colorful pet toys",
  },
  {
    label: "Beds",
    href: "/shop/beds",
    image: "/assets/offer2.png",
    alt: "Cozy pet beds",
  },
  {
    label: "Treats",
    href: "/shop/treats",
    image: "/assets/offer3.png",
    alt: "Tasty pet treats",
  },
  {
    label: "Accessories",
    href: "/shop/accessories",
    image: "/assets/offer4.png",
    alt: "Pet accessories like collars and leashes",
  },
];

export default function Offer() {
  return (
    <section className="mx-auto max-w-content px-6 pb-14">
      <Link
        href="/shop"
        className="relative block rounded-card bg-[#f0bf2c] ring-1 ring-ink/10"
        aria-label="Shop pet treats and accessories"
      >
        <div className="relative h-[260px] md:h-[350px] overflow-hidden">
          <Image
            src="/assets/banner.png"
            alt="Promotional pet treat banner with a happy dog"
            fill
            priority
            sizes="(min-width: 768px) 100vw, 100vw"
            className="object-contain object-left"
            style={{ objectPosition: "left center" }}
          />
        </div>
      </Link>

      {/* Category grid */}
      <div className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <h3 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Shop by category
          </h3>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink/70 transition-colors hover:text-pine"
          >
            View all
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.label}
              href={category.href}
              className="group relative overflow-hidden rounded-card bg-parchment"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="(min-width: 768px) 22vw, 45vw"
                  className="object-contain object-center p-4 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/5 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3">
                <span className="font-display text-base font-bold text-parchment md:text-lg">
                  {category.label}
                </span>
                <ArrowRight className="h-4 w-4 text-parchment transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

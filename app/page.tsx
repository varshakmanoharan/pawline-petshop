import Hero from "@/components/Hero";
import CategoryStrip from "@/components/CategoryStrip";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/products";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroBanner from "@/components/HeroBanner";
import Offer from "@/components/Offer";

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <>
    <HeroBanner />
      <Hero />
      <CategoryStrip />
      <Offer />

      <section className="mx-auto max-w-content px-6 py-14">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-pine">Currently favorite</p>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight">
              What's flying off the shelf
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden items-center gap-1 text-sm font-semibold text-ink/70 hover:text-ink md:flex"
          >
            View full catalog <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.$id} product={p} />
          ))}
        </div>
      </section>

      <section className="bg-pine">
        <div className="mx-auto grid max-w-content items-center gap-8 px-6 py-16 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold leading-tight text-parchment md:text-4xl">
              Not sure what your animal needs? Ask at the counter.
            </h2>
            <p className="mt-4 max-w-[46ch] text-parchment/80">
              Every person on the floor has raised, fostered, or fixed
              something with fur, feathers, or fins. Come in and describe the
              problem — we'll point you at the shelf.
            </p>
          </div>
          <div className="flex justify-start md:justify-end">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-marigold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-marigold-dark"
            >
              Get directions & hours
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

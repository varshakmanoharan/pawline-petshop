import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/products";

const CATEGORIES = ["All", "Dogs", "Cats", "Small Pets", "Birds", "Aquatic"];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const products = await getProducts();
  const active = searchParams.category || "All";
  const filtered =
    active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <div className="mx-auto max-w-content px-6 py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold text-pine">Full catalog</p>
        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight md:text-4xl">
          Shop everything
        </h1>
      </div>

      <div className="mb-10 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const href = cat === "All" ? "/shop" : `/shop?category=${encodeURIComponent(cat)}`;
          const isActive = active === cat;
          return (
            <Link
              key={cat}
              href={href}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-ink bg-ink text-parchment"
                  : "border-line text-ink/70 hover:border-ink"
              }`}
            >
              {cat}
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-ink/60">
          Nothing in this category yet — check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.$id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

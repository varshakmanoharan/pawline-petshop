import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getProductBySlug, getProducts } from "@/lib/products";
import AddToCartPanel from "@/components/AddToCartPanel";
import ProductCard from "@/components/ProductCard";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductBySlug(params.id);
  if (!product) notFound();

  const all = await getProducts();
  const related = all
    .filter((p) => p.category === product.category && p.$id !== product.$id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-content px-6 py-10">
      <Link
        href="/shop"
        className="inline-flex items-center gap-1 text-sm font-medium text-ink/60 hover:text-ink"
      >
        <ChevronLeft className="h-4 w-4" /> Back to shop
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-card bg-white">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 45vw, 90vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-blue">
            {product.category}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 font-display text-2xl font-semibold text-pine">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-5 max-w-[52ch] leading-relaxed text-ink/70">
            {product.description}
          </p>
          <p className="mt-3 text-sm text-ink/50">
            {product.stock > 0
              ? `${product.stock} in stock`
              : "Currently out of stock"}
          </p>

          <div className="mt-8">
            <AddToCartPanel product={product} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="mb-6 font-display text-2xl font-bold tracking-tight">
            More from {product.category}
          </h2>
          <div className="grid grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.$id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

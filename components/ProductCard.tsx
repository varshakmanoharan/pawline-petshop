"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "./CartProvider";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group flex flex-col"
    >
      <Link
        href={`/shop/${product.slug}`}
        className="relative block aspect-square overflow-hidden rounded-card bg-white"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-marigold px-3 py-1 text-xs font-semibold text-ink">
            Low stock
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          aria-label={`Add ${product.name} to cart`}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-ink text-parchment opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100"
        >
          <Plus className="h-5 w-5" />
        </button>
      </Link>
      <Link href={`/shop/${product.slug}`} className="mt-3">
        <p className="text-xs uppercase tracking-wide text-slate-blue">
          {product.category}
        </p>
        <h3 className="mt-1 font-display text-base font-semibold leading-snug">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-ink/70">
          ${product.price.toFixed(2)}
        </p>
      </Link>
    </motion.div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "./CartProvider";

export default function AddToCartPanel({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-3 rounded-full border border-line px-3 py-2">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="Decrease quantity"
          className="p-1"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-5 text-center text-sm font-medium">{qty}</span>
        <button
          onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
          aria-label="Increase quantity"
          className="p-1"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <motion.button
        onClick={handleAdd}
        whileTap={{ scale: 0.96 }}
        disabled={product.stock === 0}
        className="flex-1 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-parchment transition-colors hover:bg-pine-dark disabled:cursor-not-allowed disabled:opacity-40"
      >
        {product.stock === 0
          ? "Out of stock"
          : justAdded
          ? "Added ✓"
          : "Add to cart"}
      </motion.button>
    </div>
  );
}

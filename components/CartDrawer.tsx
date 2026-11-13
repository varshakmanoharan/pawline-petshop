"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "./CartProvider";

export default function CartDrawer() {
  const { lines, isOpen, closeCart, setQuantity, removeFromCart, subtotal } =
    useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-ink/40"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-parchment shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="font-display text-lg font-bold">Your cart</h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="rounded-full p-1 hover:bg-ink/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {lines.length === 0 ? (
                <p className="mt-10 text-center text-sm text-ink/60">
                  Nothing here yet — go find something for your animal.
                </p>
              ) : (
                <ul className="space-y-5">
                  {lines.map((line) => (
                    <li key={line.productId} className="flex gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white">
                        <Image
                          src={line.image}
                          alt={line.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium leading-snug">
                            {line.name}
                          </p>
                          <button
                            onClick={() => removeFromCart(line.productId)}
                            aria-label={`Remove ${line.name}`}
                            className="text-ink/40 hover:text-ink"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-line px-2 py-1">
                            <button
                              onClick={() =>
                                setQuantity(line.productId, line.quantity - 1)
                              }
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-4 text-center text-sm">
                              {line.quantity}
                            </span>
                            <button
                              onClick={() =>
                                setQuantity(line.productId, line.quantity + 1)
                              }
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold">
                            ${(line.price * line.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-line px-6 py-5">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-ink/60">Subtotal</span>
                <span className="font-display text-lg font-bold">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <Link
                href="/cart"
                onClick={closeCart}
                className="block w-full rounded-full bg-pine px-6 py-3 text-center text-sm font-semibold text-parchment transition-colors hover:bg-pine-dark"
              >
                Go to checkout
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

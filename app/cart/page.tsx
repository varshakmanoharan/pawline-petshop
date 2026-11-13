"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, X, Check } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { createOrder } from "@/lib/orders";

export default function CartPage() {
  const { lines, setQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [submitting, setSubmitting] = useState(false);
  const [placed, setPlaced] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lines.length === 0) return;
    setSubmitting(true);
    try {
      await createOrder({
        customerName: form.name,
        email: form.email,
        address: form.address,
        items: JSON.stringify(lines),
        total: subtotal,
        createdAt: new Date().toISOString(),
      });
      setPlaced(true);
      clearCart();
    } catch (err) {
      console.error("Failed to place order", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-content px-6 py-24 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pine text-parchment"
        >
          <Check className="h-8 w-8" />
        </motion.div>
        <h1 className="mt-6 font-display text-3xl font-bold">Order placed</h1>
        <p className="mt-2 text-ink/70">
          Thanks{form.name ? `, ${form.name}` : ""} — we'll email you at{" "}
          {form.email || "the address you gave us"} once it's ready.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-parchment hover:bg-pine-dark"
        >
          Keep browsing
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-content px-6 py-12">
      <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
        Your cart
      </h1>

      {lines.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-ink/60">Your cart is empty.</p>
          <Link
            href="/shop"
            className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-parchment hover:bg-pine-dark"
          >
            Browse the shop
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 md:grid-cols-3">
          <ul className="space-y-6 md:col-span-2">
            {lines.map((line) => (
              <li
                key={line.productId}
                className="flex gap-4 border-b border-line pb-6"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-white">
                  <Image
                    src={line.image}
                    alt={line.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium">{line.name}</p>
                    <button
                      onClick={() => removeFromCart(line.productId)}
                      aria-label={`Remove ${line.name}`}
                      className="text-ink/40 hover:text-ink"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 rounded-full border border-line px-3 py-1.5">
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
                    <span className="font-semibold">
                      ${(line.price * line.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div>
            <div className="rounded-card border border-line p-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink/60">Subtotal</span>
                <span className="font-display text-xl font-bold">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <p className="mt-1 text-xs text-ink/50">
                Shipping and pickup options shown at checkout.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                <input
                  required
                  type="text"
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-pine"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-pine"
                />
                <input
                  required
                  type="text"
                  placeholder="Delivery or pickup address"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className="w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-pine"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-parchment transition-colors hover:bg-pine-dark disabled:opacity-50"
                >
                  {submitting ? "Placing order…" : "Place order"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

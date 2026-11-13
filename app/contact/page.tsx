"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Check } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Hook this up to an Appwrite "messages" collection the same way
    // lib/orders.ts writes to the orders collection, if you want to
    // persist contact form submissions.
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 600);
  };

  return (
    <div className="mx-auto max-w-content px-6 py-12">
      <p className="text-sm font-semibold text-pine">Get in touch</p>
      <h1 className="mt-1 font-display text-3xl font-bold tracking-tight md:text-4xl">
        Visit &amp; contact
      </h1>

      <div className="mt-10 grid gap-12 md:grid-cols-2">
        <div className="space-y-8">
          <div className="flex gap-4">
            <MapPin className="h-5 w-5 shrink-0 text-pine" />
            <div>
              <p className="font-medium">128 Maple Street, Riverton</p>
              <p className="text-sm text-ink/60">Free parking behind the shop</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Phone className="h-5 w-5 shrink-0 text-pine" />
            <div>
              <p className="font-medium">(555) 014-7788</p>
              <p className="text-sm text-ink/60">Mon–Sat, 9am–6pm</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Mail className="h-5 w-5 shrink-0 text-pine" />
            <div>
              <p className="font-medium">hello@pawline.shop</p>
              <p className="text-sm text-ink/60">We reply within a day</p>
            </div>
          </div>

          <div className="rounded-card border border-line p-5">
            <h3 className="font-display font-semibold">Hours</h3>
            <ul className="mt-2 space-y-1 text-sm text-ink/70">
              <li>Monday – Friday: 9am – 7pm</li>
              <li>Saturday: 9am – 6pm</li>
              <li>Sunday: 10am – 4pm</li>
            </ul>
          </div>
        </div>

        <div className="rounded-card border border-line p-6">
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center py-10 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-pine text-parchment"
              >
                <Check className="h-7 w-7" />
              </motion.div>
              <p className="mt-4 font-medium">Message sent</p>
              <p className="mt-1 text-sm text-ink/60">
                We'll get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                required
                type="text"
                placeholder="Your name"
                className="w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-pine"
              />
              <input
                required
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-pine"
              />
              <textarea
                required
                placeholder="What can we help with?"
                rows={5}
                className="w-full resize-none rounded-lg border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-pine"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-parchment transition-colors hover:bg-pine-dark disabled:opacity-50"
              >
                {submitting ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { PawPrint } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-pine text-parchment">
      <div className="mx-auto grid max-w-content gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <PawPrint className="h-5 w-5" strokeWidth={2.2} />
            <span className="font-display text-lg font-bold">Pawline</span>
          </div>
          <p className="mt-3 max-w-[26ch] text-sm text-parchment/75">
            A neighborhood pet shop, stocked with things we'd actually give
            our own animals.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-parchment/60">
            Shop
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/shop?category=Dogs" className="hover:text-marigold">Dogs</Link></li>
            <li><Link href="/shop?category=Cats" className="hover:text-marigold">Cats</Link></li>
            <li><Link href="/shop?category=Small%20Pets" className="hover:text-marigold">Small pets</Link></li>
            <li><Link href="/shop?category=Birds" className="hover:text-marigold">Birds</Link></li>
            <li><Link href="/shop?category=Aquatic" className="hover:text-marigold">Aquatic</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-parchment/60">
            Shop info
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/contact" className="hover:text-marigold">Visit &amp; contact</Link></li>
            <li><Link href="/shop" className="hover:text-marigold">Full catalog</Link></li>
            <li><Link href="/cart" className="hover:text-marigold">Your cart</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-parchment/60">
            Hours
          </h3>
          <ul className="mt-3 space-y-1 text-sm text-parchment/85">
            <li>Mon–Fri: 9am – 7pm</li>
            <li>Saturday: 9am – 6pm</li>
            <li>Sunday: 10am – 4pm</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-parchment/15 px-6 py-4 text-center text-xs text-parchment/60">
        © {new Date().getFullYear()} Pawline Pet Shop. All rights reserved.
      </div>
    </footer>
  );
}

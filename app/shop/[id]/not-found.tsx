import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="mx-auto max-w-content px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Product not found</h1>
      <p className="mt-2 text-ink/60">
        That item may have sold out or moved.
      </p>
      <Link
        href="/shop"
        className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-parchment hover:bg-pine-dark"
      >
        Back to shop
      </Link>
    </div>
  );
}

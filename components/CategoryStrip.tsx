import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    name: "Dogs",
    image:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&q=80",
  },
  {
    name: "Cats",
    image:
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500&q=80",
  },
  {
    name: "Small Pets",
    image:
      "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=500&q=80",
  },
  {
    name: "Birds",
    image:
      "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=500&q=80",
  },
  {
    name: "Aquatic",
    image:
      "https://images.unsplash.com/photo-1524704796725-9fc3044a58b2?w=500&q=80",
  },
];

export default function CategoryStrip() {
  return (
    <section className="mx-auto max-w-content px-6 py-10">
      <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible">
        {categories.map((c) => (
          <Link
            key={c.name}
            href={`/shop?category=${encodeURIComponent(c.name)}`}
            className="group relative flex h-32 min-w-[9.5rem] shrink-0 items-end overflow-hidden rounded-card md:min-w-0"
          >
            <Image
              src={c.image}
              alt={c.name}
              fill
              sizes="220px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <span className="relative z-10 p-3 text-sm font-semibold text-parchment">
              {c.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

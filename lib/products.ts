import {
  APPWRITE_DATABASE_ID,
  APPWRITE_PRODUCTS_COLLECTION_ID,
  databases,
  Query,
} from "./appwrite";
import { Product } from "./types";

// Used when Appwrite env vars aren't set yet, or a request fails,
// so the storefront is still browsable during setup.
export const SAMPLE_PRODUCTS: Product[] = [
  {
    $id: "sample-1",
    name: "Orchard Oat Dog Biscuits",
    slug: "orchard-oat-dog-biscuits",
    price: 12.5,
    category: "Dogs",
    description:
      "Slow-baked oat and apple biscuits, sized for daily training rounds. No fillers, no fuss.",
    image:
      "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=800&q=80",
    stock: 24,
    featured: true,
    tags: ["treats", "baked"],
  },
  {
    $id: "sample-2",
    name: "Harbor Rope Tug",
    slug: "harbor-rope-tug",
    price: 9.0,
    category: "Dogs",
    description:
      "Hand-braided cotton rope for tug-of-war and solo chewing. Machine washable.",
    image:
      "https://images.unsplash.com/photo-1544568100-847a948585b9?w=800&q=80",
    stock: 40,
    tags: ["toys"],
  },
  {
    $id: "sample-3",
    name: "Wool Felt Cat Cave",
    slug: "wool-felt-cat-cave",
    price: 38.0,
    category: "Cats",
    description:
      "Hand-felted 100% wool cave that holds its shape and muffles sound for anxious nappers.",
    image:
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&q=80",
    stock: 12,
    featured: true,
    tags: ["beds"],
  },
  {
    $id: "sample-4",
    name: "Feather Wand, Set of 2",
    slug: "feather-wand-set",
    price: 11.0,
    category: "Cats",
    description:
      "Two interchangeable feather ends on a flexible bamboo wand for evening play sessions.",
    image:
      "https://images.unsplash.com/photo-1526336179256-1347bdb255ee?w=800&q=80",
    stock: 30,
    tags: ["toys"],
  },
  {
    $id: "sample-5",
    name: "Timothy Hay, 2kg",
    slug: "timothy-hay-2kg",
    price: 14.0,
    category: "Small Pets",
    description:
      "Sun-cured second-cut Timothy hay for rabbits and guinea pigs. Harvested this season.",
    image:
      "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&q=80",
    stock: 18,
    tags: ["food"],
  },
  {
    $id: "sample-6",
    name: "Cedar Hideaway Hutch",
    slug: "cedar-hideaway-hutch",
    price: 27.5,
    category: "Small Pets",
    description:
      "Untreated cedar hideout sized for hamsters and small rabbits, safe to chew.",
    image:
      "https://images.unsplash.com/photo-1591561582301-7ce6588cc286?w=800&q=80",
    stock: 15,
    featured: true,
    tags: ["habitat"],
  },
  {
    $id: "sample-7",
    name: "Millet Spray Bundle",
    slug: "millet-spray-bundle",
    price: 7.5,
    category: "Birds",
    description:
      "Natural millet sprays for finches, budgies, and canaries. Sold in a bundle of six.",
    image:
      "https://images.unsplash.com/photo-1522858547137-f1dcec554f55?w=800&q=80",
    stock: 22,
    tags: ["food"],
  },
  {
    $id: "sample-8",
    name: "Driftwood Aquascape Piece",
    slug: "driftwood-aquascape-piece",
    price: 21.0,
    category: "Aquatic",
    description:
      "Pre-soaked spider driftwood, sinks immediately and softens tank water tone over time.",
    image:
      "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800&q=80",
    stock: 9,
    tags: ["decor"],
  },
];

const usingAppwrite = () =>
  Boolean(APPWRITE_DATABASE_ID && APPWRITE_PRODUCTS_COLLECTION_ID);

export async function getProducts(): Promise<Product[]> {
  if (!usingAppwrite()) return SAMPLE_PRODUCTS;
  try {
    const res = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_PRODUCTS_COLLECTION_ID,
      [Query.limit(100), Query.orderDesc("$createdAt")]
    );
    return res.documents as unknown as Product[];
  } catch (err) {
    console.error("Appwrite fetch failed, using sample products:", err);
    return SAMPLE_PRODUCTS;
  }
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  if (!usingAppwrite()) {
    return SAMPLE_PRODUCTS.find((p) => p.slug === slug) || null;
  }
  try {
    const res = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_PRODUCTS_COLLECTION_ID,
      [Query.equal("slug", slug), Query.limit(1)]
    );
    return (res.documents[0] as unknown as Product) || null;
  } catch (err) {
    console.error("Appwrite fetch failed, using sample products:", err);
    return SAMPLE_PRODUCTS.find((p) => p.slug === slug) || null;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getProducts();
  const featured = all.filter((p) => p.featured);
  return featured.length ? featured : all.slice(0, 4);
}

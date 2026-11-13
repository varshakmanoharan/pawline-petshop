# Pawline — Pet Shop Storefront

Next.js 14 (App Router) + Tailwind CSS + Framer Motion + Appwrite.

The site runs out of the box with built-in sample products, so you can see
the full storefront (home, shop, product pages, cart, checkout) before
Appwrite is even configured. Connect Appwrite when you're ready to manage
real inventory.

## 1. Install & run

```bash
npm install
npm run dev
```

Visit http://localhost:3000. Without any `.env.local`, the shop reads from
the sample catalog in `lib/products.ts`.

## 2. Connect Appwrite

1. Create a project at [cloud.appwrite.io](https://cloud.appwrite.io) (or
   your self-hosted instance).
2. In **Auth > Settings**, add `http://localhost:3000` as a platform
   (Web app), and your production domain later.
3. Create a **Database**, then two **Collections** inside it:

### `products` collection

| Attribute     | Type    | Notes                          |
|---------------|---------|---------------------------------|
| name          | string  | required                        |
| slug          | string  | required, used in product URLs  |
| price         | double  | required                        |
| category      | string  | e.g. "Dogs", "Cats", "Small Pets", "Birds", "Aquatic" |
| description   | string  | size 2000+                      |
| image         | string (url) | required (or use Appwrite Storage, see below) |
| stock         | integer | required                        |
| featured      | boolean | optional, shows on homepage     |
| tags          | string[]| optional array                  |

**Permissions:** grant `read` to `Any` (public storefront) — writes should
stay restricted to your team/API key so shoppers can't edit the catalog.

### `orders` collection

| Attribute    | Type   | Notes                        |
|--------------|--------|-------------------------------|
| customerName | string | required                      |
| email        | string | required                      |
| address      | string | required                      |
| items        | string | JSON string of the cart lines |
| total        | double | required                      |
| createdAt    | string (datetime) | required           |

**Permissions:** grant `create` to `Any` so checkout can write orders from
the browser; keep `read`/`update`/`delete` restricted to your team.

4. Copy `.env.local.example` to `.env.local` and fill in your project ID,
   database ID, and the two collection IDs (found in each collection's
   Settings tab).

```bash
cp .env.local.example .env.local
```

5. Restart `npm run dev`. The shop and product pages will now read live
   documents from your `products` collection, and checkout will write to
   `orders`.

### Product images

The starter uses plain image URLs in the `image` attribute (Unsplash links
in the sample data). To host your own photos, create a **Storage bucket** in
Appwrite, upload images there, and put each file's view URL
(`/v1/storage/buckets/BUCKET_ID/files/FILE_ID/view?project=YOUR_PROJECT_ID`)
into the product's `image` field. The `NEXT_PUBLIC_APPWRITE_BUCKET_ID` env
var is there if you want to build an admin upload flow later.

## 3. Project structure

```
app/
  page.tsx              Home page (hero, categories, featured products)
  shop/page.tsx          Full catalog with category filter (?category=)
  shop/[id]/page.tsx      Product detail page
  cart/page.tsx           Cart + checkout form
  contact/page.tsx        Contact + shop info
components/
  Navbar, Footer, Hero, CategoryStrip, ProductCard,
  CartProvider (cart state + localStorage), CartDrawer, AddToCartPanel
lib/
  appwrite.ts   Appwrite client setup
  products.ts   Product queries (with sample-data fallback)
  orders.ts     Writes checkout orders to Appwrite
  types.ts      Shared TypeScript types
```

## 4. Notes

- Cart state lives in `localStorage` on the client via `CartProvider`, so it
  survives refreshes without needing a database round-trip per item.
- Checkout writes one order document per purchase to the `orders`
  collection — wire up email notifications separately (e.g. an Appwrite
  Function triggered on document creation) if you want order alerts.
- The contact form is currently local-only (`app/contact/page.tsx`); point
  it at a `messages` collection the same way `lib/orders.ts` does, if you
  want submissions saved.
- Swap the Unsplash placeholder images for your own catalog photos before
  going live — check licensing on any stock photos you keep.

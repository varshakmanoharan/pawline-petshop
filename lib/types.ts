export type Product = {
  $id: string;
  name: string;
  slug: string;
  price: number;
  category: "Dogs" | "Cats" | "Small Pets" | "Birds" | "Aquatic" | string;
  description: string;
  image: string;
  stock: number;
  featured?: boolean;
  tags?: string[];
};

export type CartLine = {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type OrderPayload = {
  customerName: string;
  email: string;
  address: string;
  items: string; // JSON.stringify(CartLine[])
  total: number;
  createdAt: string;
};

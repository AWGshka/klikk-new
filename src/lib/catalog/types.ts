export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  price: number;
  currency: "EUR";
  image: string;
  specification: string | null;
};

export type Brand = { name: string; slug: string; image: string };

export type ProductSort = "featured" | "price-asc" | "price-desc" | "name-asc";

export type ProductQuery = {
  search?: string;
  category?: string;
  brand?: string;
  sort?: ProductSort;
};

export type Category = {
  name: string;
  slug: string;
  count: number;
  image: string | null;
};

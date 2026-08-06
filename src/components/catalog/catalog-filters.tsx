"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  getBrands,
  getCategories,
  getProducts,
  toSlug,
} from "@/lib/catalog/repository";
import type { ProductQuery, ProductSort } from "@/lib/catalog/types";

const sorts: Array<{ value: ProductSort; label: string }> = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name-asc", label: "Name: A to Z" },
];

type CatalogFiltersProps = { action: string; query: ProductQuery };

export function CatalogFilters({ action, query }: CatalogFiltersProps) {
  const categories = getCategories();
  const brands = getBrands();
  const allProducts = useMemo(() => getProducts(), []);
  const [category, setCategory] = useState(query.category ?? "");
  const [brand, setBrand] = useState(query.brand ?? "");
  const availableBrands = new Set(
    allProducts
      .filter(
        (product) => !category || product.categorySlug === toSlug(category),
      )
      .map((product) => toSlug(product.brand)),
  );
  const availableCategories = new Set(
    allProducts
      .filter((product) => !brand || toSlug(product.brand) === toSlug(brand))
      .map((product) => product.categorySlug),
  );

  return (
    <form className="catalog-filters" action={action}>
      {query.search && <input type="hidden" name="q" value={query.search} />}
      <h2>Filter products</h2>
      <label>
        <span>Category</span>
        <select
          name="category"
          value={category}
          onChange={(event) => {
            const next = event.target.value;
            setCategory(next);
            if (
              brand &&
              !allProducts.some(
                (product) =>
                  product.categorySlug === toSlug(next) &&
                  toSlug(product.brand) === toSlug(brand),
              )
            )
              setBrand("");
          }}
        >
          <option value="">All categories</option>
          {categories
            .filter(
              (item) =>
                availableCategories.has(item.slug) || item.slug === category,
            )
            .map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
        </select>
      </label>
      <label>
        <span>Brand</span>
        <select
          name="brand"
          value={brand}
          onChange={(event) => {
            const next = event.target.value;
            setBrand(next);
            if (
              category &&
              !allProducts.some(
                (product) =>
                  product.categorySlug === toSlug(category) &&
                  toSlug(product.brand) === toSlug(next),
              )
            )
              setCategory("");
          }}
        >
          <option value="">All brands</option>
          {brands
            .filter(
              (item) => availableBrands.has(item.slug) || item.slug === brand,
            )
            .map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
        </select>
      </label>
      <label>
        <span>Sort by</span>
        <select name="sort" defaultValue={query.sort ?? "featured"}>
          {sorts.map((sort) => (
            <option key={sort.value} value={sort.value}>
              {sort.label}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Apply filters</button>
      <Link href={action}>Clear all</Link>
    </form>
  );
}

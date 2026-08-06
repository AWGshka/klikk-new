import Link from "next/link";
import { getBrands, getCategories } from "@/lib/catalog/repository";
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

  return (
    <form className="catalog-filters" action={action}>
      {query.search && <input type="hidden" name="q" value={query.search} />}
      <label>
        <span>Category</span>
        <select name="category" defaultValue={query.category ?? ""}>
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Brand</span>
        <select name="brand" defaultValue={query.brand ?? ""}>
          <option value="">All brands</option>
          {brands.map((brand) => (
            <option key={brand.slug} value={brand.slug}>
              {brand.name}
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
      <button type="submit">Apply</button>
      <Link href={action}>Clear filters</Link>
    </form>
  );
}

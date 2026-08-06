import { getProducts } from "@/lib/catalog/repository";
import { getStock, stockSummary } from "@/lib/catalog/stores";
import type { Product } from "@/lib/catalog/types";

/**
 * v2's "This week's prices" table needs a was/now pair. The captured catalogue
 * carries a single price, so the previous price is DERIVED DETERMINISTICALLY
 * from the product id — presentation/demo data only, never a real promotion.
 */

export type WeeklyDeal = {
  product: Product;
  was: number;
  now: number;
  where: string;
};

export function getWeeklyDeals(limit = 5): WeeklyDeal[] {
  return getProducts({ sort: "price-desc" })
    .slice(0, limit)
    .map((product) => {
      // 8–20% derived from the id, so the figure is stable between renders.
      const step = (product.id.length + product.name.length) % 13;
      const uplift = 1.08 + step / 100;
      return {
        product,
        was: Math.round(product.price * uplift),
        now: product.price,
        where: stockSummary(getStock(product)),
      };
    });
}

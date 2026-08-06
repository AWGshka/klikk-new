import brandData from "../../../.data/brands.json";
import catalogueData from "../../../.data/catalogue.json";
import type {
  Brand,
  Category,
  Product,
  ProductQuery,
  ProductSort,
} from "./types";

const CATEGORY_RULES: Array<[string, RegExp]> = [
  ["Laptops", /macbook|thinkpad|laptop|gaming a(?:16|18)/i],
  ["Desktop PCs", /desktop pc/i],
  ["Phones", /iphone|poco|xiaomi (?:17t|redmi)|samsung galaxy a\d/i],
  ["Tablets & Wearables", /ipad|tablet|surface pro|watch|smart ring/i],
  [
    "Gaming",
    /gaming|playstation|ps5|xbox|nintendo|switch|motogp|ufc|wolverine|assassin/i,
  ],
  [
    "TV & Audio",
    /tv|qled|oled|ambilight|airpods|soundbar|subwoofer|headset|speakers/i,
  ],
  ["Home & Smart", /vacuum|airwrap|creami|fan|tuya|smart|intercom/i],
  ["Computing & Accessories", /./i],
];

const NAVIGATION_CATEGORIES = [
  "Laptops",
  "Desktop PCs",
  "Phones",
  "Tablets & Wearables",
  "Gaming",
  "TV & Audio",
  "Home & Smart",
  "Computing & Accessories",
] as const;
const CATEGORY_ASSET_KEYWORDS: Record<
  (typeof NAVIGATION_CATEGORIES)[number],
  RegExp
> = {
  Laptops: /laptop/i,
  "Desktop PCs": /desktop/i,
  Phones: /smartphone|phone/i,
  "Tablets & Wearables": /tablet|watch/i,
  Gaming: /gaming/i,
  "TV & Audio": /tv|audio|headphone/i,
  "Home & Smart": /smart home|cleaning|kitchen/i,
  "Computing & Accessories": /components|printer|accessor/i,
};

const knownBrandNames = brandData.brands.map((brand) => brand.name);
const extraBrandNames = [
  "Acer",
  "AOC",
  "Apple",
  "Bose",
  "Canon",
  "Crucial",
  "DJI",
  "Dyson",
  "Fujifilm",
  "Gigabyte",
  "HP",
  "JBL",
  "Lenovo",
  "Microsoft",
  "Nintendo",
  "Philips",
  "Razer",
  "Samsung",
  "Xiaomi",
];
const brandNames = [...new Set([...knownBrandNames, ...extraBrandNames])].sort(
  (first, second) => second.length - first.length,
);

function toSlug(value: string) {
  return value
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function publicAssetPath(path: string) {
  return path.replace(/^\/?\.data\//, "/assets/");
}

function inferBrand(name: string) {
  return (
    brandNames.find((brand) =>
      name.toLocaleLowerCase().startsWith(brand.toLocaleLowerCase()),
    ) ?? "Other"
  );
}

function inferCategory(name: string) {
  return (
    CATEGORY_RULES.find(([, pattern]) => pattern.test(name))?.[0] ??
    "Computing & Accessories"
  );
}

function inferSpecification(name: string) {
  const parts = name.split(/\s+(?=\d)|\s+[-–]\s+/).slice(1);
  return parts.length > 0 ? parts.join(" · ") : null;
}

const products: Product[] = catalogueData.products.map((item) => {
  const category = inferCategory(item.name);
  return {
    id: item.id,
    slug: toSlug(item.slug || item.name),
    name: item.name,
    brand: inferBrand(item.name),
    category,
    categorySlug: toSlug(category),
    price: item.price,
    currency: "EUR",
    image: publicAssetPath(item.image),
    specification: inferSpecification(item.name),
  };
});

const brands: Brand[] = brandData.brands.map((brand) => ({
  name: brand.name,
  slug: toSlug(brand.query),
  image: publicAssetPath(brand.image),
}));

function compareProducts(sort: ProductSort) {
  switch (sort) {
    case "price-asc":
      return (first: Product, second: Product) => first.price - second.price;
    case "price-desc":
      return (first: Product, second: Product) => second.price - first.price;
    case "name-asc":
      return (first: Product, second: Product) =>
        first.name.localeCompare(second.name);
    default:
      return (first: Product, second: Product) =>
        first.id.localeCompare(second.id, undefined, { numeric: true });
  }
}

export function getProducts(query: ProductQuery = {}) {
  const search = query.search?.trim().toLocaleLowerCase();
  const category = query.category ? toSlug(query.category) : undefined;
  const brand = query.brand ? toSlug(query.brand) : undefined;
  return products
    .filter((product) => {
      const matchesSearch =
        !search ||
        [product.name, product.brand, product.category, product.specification]
          .filter((value): value is string => value !== null)
          .some((value) => value.toLocaleLowerCase().includes(search));
      return (
        matchesSearch &&
        (!category || product.categorySlug === category) &&
        (!brand || toSlug(product.brand) === brand)
      );
    })
    .sort(compareProducts(query.sort ?? "featured"));
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === toSlug(slug));
}

export function getCategories() {
  return NAVIGATION_CATEGORIES.map((name) => {
    const asset = catalogueData.categories.find((category) =>
      CATEGORY_ASSET_KEYWORDS[name].test(category.name),
    );
    return {
      name,
      slug: toSlug(name),
      count: products.filter((product) => product.category === name).length,
      image: asset ? publicAssetPath(asset.image) : null,
    };
  }).filter((category) => category.count > 0) as Category[];
}

export function getCategoryBySlug(slug: string) {
  return getCategories().find((category) => category.slug === toSlug(slug));
}
export function getBrands() {
  return brands;
}
export function getFeaturedProducts(limit = 8) {
  return getProducts()
    .filter((product) => product.price >= 25)
    .slice(0, limit);
}
export function getCampaigns(limit = 12) {
  return catalogueData.marketingAssets
    .filter((asset) => asset.kind === "desktop-wide-banner")
    .slice(0, limit)
    .map((asset) => ({
      name: asset.name,
      image: publicAssetPath(asset.image),
    }));
}

export function getCampaignGroups() {
  const campaigns = getCampaigns();
  return [
    campaigns.slice(0, 4),
    campaigns.slice(4, 8),
    campaigns.slice(8, 12),
  ].filter((group) => group.length > 0);
}

const discoveryTileLabels = [
  "Laptops",
  "Smartphones",
  "Tablets",
  "Kindle",
  "Smartwear",
  "Monitors",
  "Printers",
  "Headphones",
  "Cleaning",
  "Kitchen",
  "Smart home",
  "Personal care",
  "Components",
  "Power stations",
  "PlayStation",
  "Nintendo Switch",
];

export function getDiscoveryTiles() {
  return catalogueData.marketingAssets
    .filter((asset) => asset.kind === "other-homepage-art")
    .slice(0, 16)
    .map((asset, index) => ({
      name: discoveryTileLabels[index] ?? asset.name,
      image: publicAssetPath(asset.image),
      href: `/shop?q=${encodeURIComponent(discoveryTileLabels[index] ?? asset.name)}`,
    }));
}

export function getEndcapPromos() {
  return ["banner-020.png", "banner-021.png"].map((filename) => {
    const asset = catalogueData.marketingAssets.find((item) =>
      item.image.endsWith(filename),
    );
    if (!asset) throw new Error(`Missing homepage endcap asset: ${filename}`);
    return { name: asset.name, image: publicAssetPath(asset.image) };
  });
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((candidate) => candidate.id !== product.id)
    .sort((first, second) => {
      const firstScore =
        Number(first.category === product.category) +
        Number(first.brand === product.brand);
      const secondScore =
        Number(second.category === product.category) +
        Number(second.brand === product.brand);
      return secondScore - firstScore || first.name.localeCompare(second.name);
    })
    .slice(0, limit);
}

export { publicAssetPath, toSlug };

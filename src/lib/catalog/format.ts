export function formatPrice(price: number, currency: "EUR" = "EUR") {
  return new Intl.NumberFormat("en-MT", {
    style: "currency",
    currency,
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function productLabel(product: { brand: string; name: string }) {
  return product.name
    .toLocaleLowerCase()
    .startsWith(product.brand.toLocaleLowerCase())
    ? product.name
    : `${product.brand} ${product.name}`;
}

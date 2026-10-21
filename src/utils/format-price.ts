export function currencyFormatter(price: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  }).format(price);

  return formatter;
}

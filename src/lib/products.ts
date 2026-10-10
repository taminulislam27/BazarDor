import type { Product } from "./types";

export type SortKey = "default" | "asc" | "desc";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "asc", label: "দাম: কম থেকে বেশি" },
  { value: "desc", label: "দাম: বেশি থেকে কম" },
];

/**
 * Sorts by the NUMERIC price (`today` is a number from the API),
 * never by the formatted Bengali string, so ১০০ > ৯৯ works correctly.
 */
export function sortProducts(products: Product[], key: SortKey): Product[] {
  if (key === "default") return products;
  const copy = [...products];
  copy.sort((a, b) => (key === "asc" ? a.today - b.today : b.today - a.today));
  return copy;
}

export function topRisers(products: Product[], limit = 6): Product[] {
  return products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, limit);
}

export function topFallers(products: Product[], limit = 6): Product[] {
  return products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, limit);
}

export interface MarketRow {
  market: string;
  division: string;
  min: number;
  max: number;
  avg: number;
}

export function marketStats(product: Product) {
  const rows: MarketRow[] = product.markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  if (rows.length === 0) {
    return { rows, min: product.today, max: product.today, avg: product.today };
  }

  const min = Math.min(...rows.map((r) => r.min));
  const max = Math.max(...rows.map((r) => r.max));
  const avg = Math.round(rows.reduce((sum, r) => sum + r.avg, 0) / rows.length);
  return { rows, min, max, avg };
}

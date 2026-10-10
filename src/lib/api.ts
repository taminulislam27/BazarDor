import type { Category, Product } from "./types";

// The primary API is tried first, then the alternative one.
const BASES = [
  process.env.BAZARDOR_API_URL,
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
].filter((base): base is string => Boolean(base));

async function request<T>(path: string): Promise<T> {
  let lastError: unknown;

  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`, { next: { revalidate: 300 } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: unknown = await res.json();
      // Be tolerant of a `{ data: [...] }` envelope.
      if (json && !Array.isArray(json) && typeof json === "object" && "data" in json) {
        return (json as { data: T }).data;
      }
      return json as T;
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(`API request failed for ${path}: ${String(lastError)}`);
}

export function getCategories(): Promise<Category[]> {
  return request<Category[]>("/categories");
}

export function getProducts(): Promise<Product[]> {
  return request<Product[]>("/products");
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug || String(p.id) === slug) ?? null;
}

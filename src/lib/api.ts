import { cache } from "react";
import type { Category, Product } from "./types";

// The primary API is tried first, then the alternative one.
const BASES = [
  process.env.BAZARDOR_API_URL,
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
].filter((base): base is string => Boolean(base));

const MAX_ROUNDS = 3;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function request<T>(path: string): Promise<T> {
  let lastError: unknown;

  for (let round = 0; round < MAX_ROUNDS; round++) {
    for (const base of BASES) {
      try {
        const res = await fetch(`${base}${path}`, { next: { revalidate: 300 } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: unknown = await res.json();
        if (json && !Array.isArray(json) && typeof json === "object" && "data" in json) {
          return (json as { data: T }).data;
        }
        return json as T;
      } catch (error) {
        lastError = error;
      }
    }
    if (round < MAX_ROUNDS - 1) await sleep(800 * (round + 1));
  }

  throw new Error(`API request failed for ${path}: ${String(lastError)}`);
}

export const getCategories = cache((): Promise<Category[]> => request<Category[]>("/categories"));

export const getProducts = cache((): Promise<Product[]> => request<Product[]>("/products"));

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug || String(p.id) === slug) ?? null;
}
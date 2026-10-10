import Link from "next/link";
import { formatNumber, unitFull } from "@/lib/format";
import type { Product } from "@/lib/types";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-line bg-card p-4 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="grid size-12 shrink-0 place-items-center rounded-xl bg-paper text-2xl"
        >
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="font-semibold leading-snug">{product.nameBn}</h3>
          <p className="text-xs text-muted">{unitFull(product.unit)}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-muted">আজকের দাম</p>
          <p className="text-xl font-bold">
            {formatNumber(product.today)} <span className="text-sm font-medium">টাকা</span>
          </p>
        </div>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}

import { getProducts } from "@/lib/api";
import { CHANGE_STYLE, formatNumber, formatPct, unitShort } from "@/lib/format";
import type { Product } from "@/lib/types";

function TickerList({ products, hidden }: { products: Product[]; hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {products.map((product) => {
        const style = CHANGE_STYLE[product.change.dir];
        return (
          <li
            key={product.id}
            className="flex shrink-0 items-center gap-2 border-r border-line px-4 py-2 text-sm whitespace-nowrap"
          >
            <span aria-hidden="true">{product.image}</span>
            <span className="font-medium">{product.nameBn}</span>
            <span className="text-muted">
              {formatNumber(product.today)} টাকা/{unitShort(product.unit)}
            </span>
            <span className={`font-semibold ${style.text}`}>
              {style.arrow} {formatPct(product.change.pct)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default async function Ticker() {
  const products: Product[] = await getProducts().catch(() => []);
  if (products.length === 0) return null;

  return (
    <div
      className="marquee overflow-hidden border-b border-line bg-card"
      role="marquee"
      aria-label="আজকের দামের তালিকা"
    >
      <div
        className="marquee-track"
        style={{ "--marquee-duration": `${products.length * 3.5}s` } as React.CSSProperties}
      >
        <TickerList products={products} />
        <TickerList products={products} hidden />
      </div>
    </div>
  );
}

export function TickerSkeleton() {
  return <div className="skeleton h-10 w-full rounded-none border-b border-line" />;
}

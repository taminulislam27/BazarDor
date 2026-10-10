import Link from "next/link";
import { notFound } from "next/navigation";
import ChangeBadge from "@/components/ChangeBadge";
import { getProductBySlug } from "@/lib/api";
import { formatNumber, formatTaka, unitFull, unitShort } from "@/lib/format";
import { marketStats } from "@/lib/products";
import { requireSession } from "@/lib/session";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const metadata = { title: "পণ্যের বিস্তারিত" };

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // Protected route: real session check on the server (middleware is only the first gate).
  await requireSession(`/product/${slug}`);

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const { rows, min, max, avg } = marketStats(product);
  const diff = Math.abs(product.today - product.yesterday);

  const summaryLine =
    product.change.dir === "flat" || diff === 0 ? (
      <>গতকালের তুলনায় আজ দাম <strong>অপরিবর্তিত</strong></>
    ) : (
      <>
        গতকালের তুলনায় আজ দাম{" "}
        <strong>{product.change.dir === "up" ? "বেড়েছে" : "কমেছে"}</strong> ·{" "}
        {formatTaka(diff)}
      </>
    );

  const comparisons = [
    { label: "গতকাল", value: product.yesterday },
    { label: "গত সপ্তাহ", value: product.lastWeek },
    { label: "গত মাস", value: product.lastMonth },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-brand">
          হোম
        </Link>
        <span aria-hidden="true">›</span>
        <Link href={`/category/${product.category}`} className="hover:text-brand">
          {product.categoryNameBn}
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-ink">{product.nameBn}</span>
      </nav>

      {/* Summary */}
      <section className="rounded-2xl border border-line bg-card p-5 sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <span
              aria-hidden="true"
              className="grid size-20 shrink-0 place-items-center rounded-2xl bg-paper text-4xl"
            >
              {product.image}
            </span>
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">{product.nameBn}</h1>
              <p className="text-sm text-muted">
                {unitFull(product.unit)} · {product.categoryNameBn}
              </p>
              <p className="mt-2 text-sm">{summaryLine}</p>
              <ul className="mt-3 flex flex-wrap gap-2 text-xs">
                <li>
                  <Link
                    href={`/category/${product.category}`}
                    className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-3 py-1 font-medium text-brand hover:bg-brand/20"
                  >
                    <span aria-hidden="true">{product.categoryIcon}</span>
                    {product.categoryNameBn}
                  </Link>
                </li>
                <li className="rounded-full bg-paper px-3 py-1 font-medium text-ink/80">
                  {unitFull(product.unit)}
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl bg-paper px-8 py-5 text-center md:min-w-44">
            <p className="text-sm text-muted">আজকের দাম</p>
            <p className="text-4xl font-bold">{formatNumber(product.today)}</p>
            <p className="text-sm text-muted">টাকা / {unitShort(product.unit)}</p>
            <div className="mt-2">
              <ChangeBadge change={product.change} />
            </div>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5 text-center">
          {comparisons.map((c) => (
            <div key={c.label}>
              <dt className="text-xs text-muted">{c.label}</dt>
              <dd className="font-semibold">{formatTaka(c.value)}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Price summary */}
      <section className="rounded-2xl border border-line bg-card p-5 sm:p-8">
        <h2 className="text-xl font-bold">দামের সারসংক্ষেপ</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-line p-5">
            <p className="text-xs text-muted">সর্বনিম্ন দাম</p>
            <p className="mt-1 text-2xl font-bold text-down">
              {formatNumber(min)} <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="mt-1 text-xs text-muted">সবচেয়ে কম দামের বাজার</p>
          </div>
          <div className="rounded-2xl border border-line p-5">
            <p className="text-xs text-muted">সর্বাধিক দাম</p>
            <p className="mt-1 text-2xl font-bold text-up">
              {formatNumber(max)} <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="mt-1 text-xs text-muted">সবচেয়ে বেশি দামের বাজার</p>
          </div>
          <div className="rounded-2xl border border-line p-5">
            <p className="text-xs text-muted">গড় দাম</p>
            <p className="mt-1 text-2xl font-bold text-brand">
              {formatNumber(avg)} <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="mt-1 text-xs text-muted">{unitFull(product.unit)}-এর হিসাবে</p>
          </div>
        </div>

        <h2 className="mt-8 text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
        {rows.length === 0 ? (
          <p className="mt-4 text-sm text-muted">এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।</p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[34rem] text-sm">
              <thead>
                <tr className="text-left text-muted">
                  <th className="px-4 py-3 font-medium">বাজার</th>
                  <th className="px-4 py-3 font-medium">বিভাগ</th>
                  <th className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
                  <th className="px-4 py-3 text-right font-medium">সর্বাধিক</th>
                  <th className="px-4 py-3 text-right font-medium">গড়</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={`${row.market}-${row.division}`} className="border-t border-line even:bg-paper/60">
                    <td className="px-4 py-3">{row.market}</td>
                    <td className="px-4 py-3 text-ink/80">{row.division}</td>
                    <td className="px-4 py-3 text-right">{formatTaka(row.min)}</td>
                    <td className="px-4 py-3 text-right">{formatTaka(row.max)}</td>
                    <td className="px-4 py-3 text-right font-bold">{formatTaka(row.avg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

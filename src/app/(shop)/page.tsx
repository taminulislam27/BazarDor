import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import SectionHeading from "@/components/SectionHeading";
import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/format";
import { topFallers, topRisers } from "@/lib/products";
export const dynamic = "force-dynamic";
export default async function HomePage() {
  const products = await getProducts();
  const risers = topRisers(products, 6);
  const fallers = topFallers(products, 6);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-6">
      <Hero />

      {risers.length > 0 && (
        <section aria-labelledby="risers">
          <SectionHeading
            id="risers"
            title="আজ দাম বেড়েছে"
            marker={{ symbol: "▲", className: "text-up" }}
          />
          <ProductGrid products={risers} />
        </section>
      )}

      {fallers.length > 0 && (
        <section aria-labelledby="fallers">
          <SectionHeading
            id="fallers"
            title="আজ দাম কমেছে"
            marker={{ symbol: "▼", className: "text-down" }}
          />
          <ProductGrid products={fallers} />
        </section>
      )}

      <section id="সব-পণ্য" className="scroll-mt-6">
        <SectionHeading
          title="সব পণ্য"
          subtitle={`মোট ${toBn(products.length)}টি পণ্য দেখানো হচ্ছে`}
        />
        <ProductGrid products={products} />
      </section>
    </div>
  );
}

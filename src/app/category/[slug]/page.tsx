import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";
import NotFoundMessage from "@/components/NotFoundMessage";
import { getCategories, getProducts } from "@/lib/api";
import { toBn } from "@/lib/format";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categories = await getCategories().catch(() => []);
  const category = categories.find((c) => c.slug === slug);
  return { title: category?.nameBn ?? "বিভাগ পাওয়া যায়নি" };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound(); // invalid slug -> friendly 404 with a "back home" button

  const items = products.filter((p) => p.category === category.slug);

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <header className="flex items-center gap-4 rounded-2xl border border-line bg-card p-5 sm:p-6">
        <span
          aria-hidden="true"
          className="grid size-14 shrink-0 place-items-center rounded-xl bg-paper text-3xl"
        >
          {category.icon}
        </span>
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">{category.nameBn}</h1>
          <p className="text-sm text-muted">
            {toBn(items.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </header>

      {items.length === 0 ? (
        <NotFoundMessage
          code="খালি"
          title="এই বিভাগে এখনো কোনো পণ্য নেই"
          message="অন্য কোনো বিভাগ দেখুন অথবা হোম পেজে ফিরে যান।"
        />
      ) : (
        <CategoryProducts products={items} />
      )}
    </div>
  );
}

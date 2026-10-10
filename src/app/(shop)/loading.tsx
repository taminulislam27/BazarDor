import { ProductGridSkeleton } from "@/components/Skeletons";

export default function HomeLoading() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-6">
      <div className="skeleton h-64 w-full rounded-3xl" />
      <section>
        <div className="skeleton mb-4 h-7 w-48" />
        <ProductGridSkeleton count={6} />
      </section>
      <section>
        <div className="skeleton mb-4 h-7 w-48" />
        <ProductGridSkeleton count={6} />
      </section>
      <section>
        <div className="skeleton mb-4 h-7 w-32" />
        <ProductGridSkeleton count={9} />
      </section>
    </div>
  );
}

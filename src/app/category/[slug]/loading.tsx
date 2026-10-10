import { ProductGridSkeleton } from "@/components/Skeletons";

export default function CategoryLoading() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6" aria-busy="true">
      <div className="flex items-center gap-4 rounded-2xl border border-line bg-card p-5 sm:p-6">
        <div className="skeleton size-14 rounded-xl" />
        <div className="space-y-2">
          <div className="skeleton h-7 w-32" />
          <div className="skeleton h-4 w-56" />
        </div>
      </div>
      <div className="skeleton h-16 w-full rounded-2xl" />
      <p className="sr-only">লোড হচ্ছে…</p>
      <ProductGridSkeleton count={6} />
    </div>
  );
}

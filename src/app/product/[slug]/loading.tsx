export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6" aria-busy="true">
      <div className="skeleton h-5 w-56" />
      <div className="skeleton h-48 w-full rounded-2xl" />
      <div className="rounded-2xl border border-line bg-card p-5 sm:p-8">
        <div className="skeleton h-6 w-40" />
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="skeleton h-24 rounded-2xl" />
          <div className="skeleton h-24 rounded-2xl" />
          <div className="skeleton h-24 rounded-2xl" />
        </div>
        <div className="skeleton mt-8 h-72 w-full rounded-2xl" />
      </div>
      <p className="sr-only">লোড হচ্ছে…</p>
    </div>
  );
}

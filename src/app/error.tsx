"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center">
      <span aria-hidden="true" className="text-5xl">
        ⚠️
      </span>
      <h1 className="mt-4 text-xl font-bold sm:text-2xl">কিছু একটা সমস্যা হয়েছে</h1>
      <p className="mt-2 text-sm text-muted">
        দামের তালিকা আনতে পারিনি। একটু পরে আবার চেষ্টা করুন।
      </p>
      <div className="mt-6 flex gap-2">
        <button
          type="button"
          onClick={reset}
          className="btn btn-sm sm:btn-md border-0 bg-brand font-semibold text-white hover:bg-brand-dark"
        >
          আবার চেষ্টা করুন
        </button>
        <Link href="/" className="btn btn-sm sm:btn-md btn-ghost font-semibold">
          হোম পেজ
        </Link>
      </div>
    </div>
  );
}

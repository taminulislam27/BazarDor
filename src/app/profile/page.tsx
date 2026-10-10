import type { Metadata } from "next";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import SignOutButton from "@/components/SignOutButton";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = { title: "আমার প্রোফাইল" };

export default async function ProfilePage() {
  const { user } = await requireSession("/profile");

  return (
    <div className="mx-auto w-full max-w-2xl space-y-5 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">আমার প্রোফাইল</h1>
        <p className="text-sm text-muted">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      <section className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={user.name} image={user.image} className="size-20" />
          <div className="min-w-0">
            <p className="truncate text-xl font-semibold">{user.name}</p>
            <p className="truncate text-muted">{user.email}</p>
          </div>
        </div>
        <SignOutButton className="btn btn-sm sm:btn-md btn-outline border-up text-up hover:border-up hover:bg-up hover:text-white">
          <span aria-hidden="true">↩</span> সাইন আউট
        </SignOutButton>
      </section>

      <section className="rounded-2xl border border-line bg-card p-5">
        <h2 className="font-semibold">তথ্য</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div>
            <dt className="text-muted">নাম</dt>
            <dd className="font-medium">{user.name}</dd>
          </div>
          <div>
            <dt className="text-muted">ইমেইল</dt>
            <dd className="font-medium">{user.email}</dd>
          </div>
        </dl>
        <Link
          href="/profile/update"
          className="btn btn-sm sm:btn-md mt-5 w-full border-0 bg-brand font-semibold text-white shadow-md hover:bg-brand-dark"
        >
          তথ্য আপডেট করুন
        </Link>
      </section>
    </div>
  );
}

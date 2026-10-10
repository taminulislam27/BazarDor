"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm({ initialName }: { initialName: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = name.trim();
    if (trimmed.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);

    const { error } = await authClient.updateUser({ name: trimmed });
    setLoading(false);

    if (error) {
      toast.error("তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন।");
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          নাম
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
          placeholder="আপনার নাম"
          className="input w-full rounded-lg border-line bg-white focus:border-brand focus:outline-2 focus:outline-brand/40"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn w-full border-0 bg-brand font-semibold text-white shadow-md hover:bg-brand-dark"
      >
        {loading && <span className="loading loading-spinner loading-sm" />}
        তথ্য আপডেট করুন
      </button>
      <Link href="/profile" className="btn btn-ghost w-full font-medium">
        বাতিল করুন
      </Link>
    </form>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage, EMAIL_PATTERN } from "@/lib/auth-messages";
import SocialButtons from "./SocialButtons";

const inputClass =
  "input w-full rounded-lg border-line bg-white focus:border-brand focus:outline-2 focus:outline-brand/40";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function fail(message: string) {
    setError(message);
    toast.error(message);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");

    if (!name) return fail("আপনার নাম লিখুন।");
    if (!EMAIL_PATTERN.test(email)) return fail("সঠিক ইমেইল ঠিকানা দিন।");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
    if (password !== confirm) return fail("দুটি পাসওয়ার্ড মিলছে না।");

    setLoading(true);
    const { error: authError } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (authError) {
      return fail(authErrorMessage(authError, "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।"));
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন।");
    router.push("/signin");
  }

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            নাম
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="যেমন: রহিম উদ্দিন"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            ইমেইল
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            পাসওয়ার্ড
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="confirm" className="mb-1 block text-sm font-medium">
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            autoComplete="new-password"
            placeholder="আবার লিখুন"
            className={inputClass}
          />
        </div>

        {error && (
          <p role="alert" className="rounded-lg bg-up/10 px-3 py-2 text-sm text-up">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn w-full border-0 bg-brand font-semibold text-white shadow-md hover:bg-brand-dark"
        >
          {loading && <span className="loading loading-spinner loading-sm" />}
          অ্যাকাউন্ট তৈরি করুন
        </button>
      </form>

      <div className="flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-line" />
        অথবা
        <span className="h-px flex-1 bg-line" />
      </div>

      <SocialButtons callbackUrl="/" />

      <p className="text-center text-sm">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-medium text-brand hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
}

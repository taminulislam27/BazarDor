"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage, EMAIL_PATTERN } from "@/lib/auth-messages";
import SocialButtons from "./SocialButtons";

interface SignInFormProps {
  callbackUrl: string;
  redirected: boolean;
}

const inputClass =
  "input w-full rounded-lg border-line bg-white focus:border-brand focus:outline-2 focus:outline-brand/40";

export default function SignInForm({ callbackUrl, redirected }: SignInFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Shown when a protected page (e.g. product details) sent the visitor here.
  useEffect(() => {
    if (redirected) {
      toast.error("এই পাতাটি দেখতে আগে সাইন ইন করুন।", { id: "auth-required" });
    }
  }, [redirected]);

  function fail(message: string) {
    setError(message);
    toast.error(message);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    if (!email || !password) return fail("ইমেইল ও পাসওয়ার্ড দুটোই লিখুন।");
    if (!EMAIL_PATTERN.test(email)) return fail("সঠিক ইমেইল ঠিকানা দিন।");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");

    setLoading(true);
    const { error: authError } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (authError) {
      return fail(authErrorMessage(authError, "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।"));
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে!");
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
            autoComplete="current-password"
            placeholder="কমপক্ষে ৮ অক্ষর"
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
          সাইন ইন
        </button>
      </form>

      <div className="flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-line" />
        অথবা
        <span className="h-px flex-1 bg-line" />
      </div>

      <SocialButtons callbackUrl={callbackUrl} />

      <p className="text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-medium text-brand hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}

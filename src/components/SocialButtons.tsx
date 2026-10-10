"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-messages";
import { GitHubIcon, GoogleIcon } from "./icons";

type Provider = "google" | "github";

export default function SocialButtons({ callbackUrl = "/" }: { callbackUrl?: string }) {
  const [busy, setBusy] = useState<Provider | null>(null);

  async function signInWith(provider: Provider) {
    setBusy(provider);
    // On success the browser is redirected to the provider and back to `callbackUrl`.
    const { error } = await authClient.signIn.social({ provider, callbackURL: callbackUrl });
    if (error) {
      toast.error(authErrorMessage(error, "সোশ্যাল লগইন করা যায়নি। আবার চেষ্টা করুন।"));
      setBusy(null);
    }
  }

  const buttonClass =
    "btn btn-sm sm:btn-md flex-1 border border-line bg-white font-medium text-ink shadow-none hover:bg-paper";

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => signInWith("google")}
        disabled={busy !== null}
        className={buttonClass}
      >
        {busy === "google" ? <span className="loading loading-spinner loading-xs" /> : <GoogleIcon />}
        Google দিয়ে চালিয়ে যান
      </button>
      <button
        type="button"
        onClick={() => signInWith("github")}
        disabled={busy !== null}
        className={buttonClass}
      >
        {busy === "github" ? <span className="loading loading-spinner loading-xs" /> : <GitHubIcon />}
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}

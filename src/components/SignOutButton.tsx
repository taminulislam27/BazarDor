"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

interface SignOutButtonProps {
  className?: string;
  children: React.ReactNode;
  onDone?: () => void;
}

export default function SignOutButton({ className, children, onDone }: SignOutButtonProps) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleSignOut() {
    setBusy(true);
    const { error } = await authClient.signOut();
    setBusy(false);

    if (error) {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
      return;
    }

    toast.success("সফলভাবে সাইন আউট হয়েছে।");
    onDone?.();
    router.push("/");
    router.refresh();
  }

  return (
    <button type="button" onClick={handleSignOut} disabled={busy} className={className}>
      {children}
    </button>
  );
}

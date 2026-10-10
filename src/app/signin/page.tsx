import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthShell from "@/components/AuthShell";
import SignInForm from "@/components/SignInForm";
import { getSession } from "@/lib/session";
import { safePath } from "@/lib/utils";

export const metadata: Metadata = { title: "সাইন ইন" };

interface SignInPageProps {
  searchParams: Promise<{ callbackUrl?: string; redirected?: string }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;
  const callbackUrl = safePath(params.callbackUrl);

  // Already logged in? Go straight to where they were headed.
  if (await getSession()) redirect(callbackUrl);

  return (
    <AuthShell
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
    >
      <SignInForm callbackUrl={callbackUrl} redirected={params.redirected === "1"} />
    </AuthShell>
  );
}

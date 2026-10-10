import type { Metadata } from "next";
import AuthShell from "@/components/AuthShell";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = { title: "তথ্য আপডেট" };

export default async function UpdateProfilePage() {
  const { user } = await requireSession("/profile/update");

  return (
    <AuthShell title="তথ্য আপডেট করুন" subtitle="আপনার নাম বদলাতে নিচের ফর্মটি ব্যবহার করুন।">
      <UpdateProfileForm initialName={user.name} />
    </AuthShell>
  );
}

import type { Metadata } from "next";
import NotFoundMessage from "@/components/NotFoundMessage";

export const metadata: Metadata = { title: "পাতা পাওয়া যায়নি" };

export default function NotFound() {
  return <NotFoundMessage />;
}

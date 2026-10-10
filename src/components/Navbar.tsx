import Link from "next/link";
import { getCategories } from "@/lib/api";
import type { Category } from "@/lib/types";
import AuthMenu from "./AuthMenu";
import BanglaDate from "./BanglaDate";
import NavLinks from "./NavLinks";

export default async function Navbar() {
  const categories: Category[] = await getCategories().catch(() => []);

  return (
    <header className="border-b border-line bg-card">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-3" aria-label="বাজার দর — হোম">
          <span
            aria-hidden="true"
            className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand text-xl shadow-sm"
          >
            🛒
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-bold">বাজার দর</span>
            <BanglaDate className="block text-[11px] text-muted sm:text-xs" />
          </span>
        </Link>
        <AuthMenu />
      </div>
      <div className="border-t border-line">
        <div className="mx-auto max-w-6xl px-3">
          <NavLinks categories={categories} />
        </div>
      </div>
    </header>
  );
}

export function NavbarSkeleton() {
  return (
    <header className="border-b border-line bg-card">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="skeleton size-10 rounded-xl" />
          <div className="space-y-1.5">
            <div className="skeleton h-4 w-20" />
            <div className="skeleton h-3 w-32" />
          </div>
        </div>
        <div className="skeleton h-9 w-28 rounded-xl" />
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl gap-2 px-4 py-2.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-7 w-16 rounded-lg" />
          ))}
        </div>
      </div>
    </header>
  );
}

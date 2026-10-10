"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";

export default function NavLinks({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  if (categories.length === 0) return null;

  return (
    <nav aria-label="পণ্যের বিভাগ" className="overflow-x-auto">
      <ul className="flex min-w-max items-center gap-1 py-2.5">
        {categories.map((category) => {
          const active = pathname === `/category/${category.slug}`;
          return (
            <li key={category.id}>
              <Link
                href={`/category/${category.slug}`}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition ${
                  active
                    ? "bg-brand font-semibold text-white shadow-sm"
                    : "text-ink/80 hover:bg-brand/10 hover:text-brand"
                }`}
              >
                <span aria-hidden="true">{category.icon}</span>
                {category.nameBn}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

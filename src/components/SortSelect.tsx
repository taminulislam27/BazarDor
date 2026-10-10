"use client";

import { SORT_OPTIONS, type SortKey } from "@/lib/products";

interface SortSelectProps {
  value: SortKey;
  onChange: (value: SortKey) => void;
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="sort" className="text-sm text-muted">
        সাজান
      </label>
      <div className="relative">
        <select
          id="sort"
          value={value}
          onChange={(event) => onChange(event.target.value as SortKey)}
          className="cursor-pointer appearance-none rounded-lg border border-line bg-white py-2 pl-3 pr-9 text-sm focus:border-brand focus:outline-2 focus:outline-brand/40"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink/70"
        >
          <path d="m5 8 5 5 5-5" />
        </svg>
      </div>
    </div>
  );
}

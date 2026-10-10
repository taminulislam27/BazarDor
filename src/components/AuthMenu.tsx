"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import Avatar from "./Avatar";
import SignOutButton from "./SignOutButton";

export default function AuthMenu() {
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (isPending) {
    return <div className="skeleton h-9 w-28 rounded-xl" aria-label="লোড হচ্ছে" />;
  }

  if (!session) {
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md font-semibold">
          সাইন ইন
        </Link>
        <Link
          href="/signup"
          className="btn btn-sm sm:btn-md border-0 bg-brand font-semibold text-white shadow-md hover:bg-brand-dark"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const { user } = session;
  const firstName = user.name.trim().split(/\s+/)[0] || user.name;

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-xl px-1.5 py-1 transition hover:bg-brand/5"
      >
        <Avatar name={user.name} image={user.image} />
        <span className="hidden text-sm font-medium sm:inline">{firstName}</span>
        <span aria-hidden="true" className="text-[10px] text-muted">
          ▾
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-line bg-white p-4 shadow-xl"
        >
          <p className="truncate font-semibold">{user.name}</p>
          <p className="truncate text-sm text-muted">{user.email}</p>
          <div className="mt-3 space-y-1 border-t border-line pt-3 text-sm">
            <Link
              href="/profile"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-paper"
            >
              <span aria-hidden="true">👤</span> আমার প্রোফাইল
            </Link>
            <SignOutButton
              onDone={() => setOpen(false)}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-up hover:bg-up/5 disabled:opacity-60"
            >
              <span aria-hidden="true">↩</span> সাইন আউট
            </SignOutButton>
          </div>
        </div>
      )}
    </div>
  );
}

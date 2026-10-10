"use client";

import { useEffect, useState } from "react";
import { banglaDate } from "@/lib/format";

/** Rendered after mount so server and client never disagree about "today". */
export default function BanglaDate({ className }: { className?: string }) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(banglaDate());
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {text || " "}
    </span>
  );
}

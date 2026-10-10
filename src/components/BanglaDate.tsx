"use client";

import { useEffect, useState } from "react";
import { banglaDate } from "@/lib/format";


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

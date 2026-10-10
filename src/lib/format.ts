import type { ChangeDir } from "./types";

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** Convert every ASCII digit in a string/number to a Bengali digit. */
export function toBn(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

/** 1850 -> ১,৮৫০ ; 63.5 -> ৬৩.৫০ ; 62 -> ৬২ */
export function formatNumber(n: number): string {
  const fraction = Number.isInteger(n) ? 0 : 2;
  return toBn(
    n.toLocaleString("en-US", {
      minimumFractionDigits: fraction,
      maximumFractionDigits: fraction,
    }),
  );
}

export function formatTaka(n: number): string {
  return `${formatNumber(n)} টাকা`;
}

export function formatPct(pct: number): string {
  return `${toBn(pct.toFixed(1))}%`;
}

const UNITS: Record<string, string> = {
  kg: "কেজি",
  kilogram: "কেজি",
  l: "লিটার",
  lt: "লিটার",
  ltr: "লিটার",
  liter: "লিটার",
  litre: "লিটার",
  dozen: "ডজন",
  doz: "ডজন",
  dzn: "ডজন",
  piece: "পিস",
  pieces: "পিস",
  pcs: "পিস",
  pc: "পিস",
  pis: "পিস",
  gram: "গ্রাম",
  g: "গ্রাম",
};

/** "kg" -> "কেজি" */
export function unitShort(unit: string): string {
  const raw = unit.trim();
  if (/[ঀ-৿]/.test(raw)) return raw.replace(/^প্রতি\s*/, "");
  return UNITS[raw.toLowerCase()] ?? raw;
}

/** "kg" -> "প্রতি কেজি" */
export function unitFull(unit: string): string {
  return `প্রতি ${unitShort(unit)}`;
}

/**
 * Visual style for price changes, taken from the Figma design:
 * price going UP is red, going DOWN is green, flat is gray.
 * (Swap the `up` / `down` colors here to invert the scheme.)
 */
export const CHANGE_STYLE: Record<
  ChangeDir,
  { arrow: string; text: string; pill: string }
> = {
  up: { arrow: "▲", text: "text-up", pill: "bg-up/10 text-up" },
  down: { arrow: "▼", text: "text-down", pill: "bg-down/10 text-down" },
  flat: { arrow: "—", text: "text-flat", pill: "bg-flat/10 text-flat" },
};

const BN_DAYS = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
const BN_MONTHS = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

/** "মঙ্গলবার, ৬ অক্টোবর, ২০২৬" (Bangladesh time, UTC+6) */
export function banglaDate(date: Date = new Date()): string {
  const dhaka = new Date(date.getTime() + 6 * 60 * 60 * 1000);
  const day = BN_DAYS[dhaka.getUTCDay()];
  const month = BN_MONTHS[dhaka.getUTCMonth()];
  return `${day}, ${toBn(dhaka.getUTCDate())} ${month}, ${toBn(dhaka.getUTCFullYear())}`;
}

import { CHANGE_STYLE, formatPct } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ChangeBadge({ change }: { change: Product["change"] }) {
  const style = CHANGE_STYLE[change.dir];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${style.pill}`}
    >
      <span aria-hidden="true">{style.arrow}</span>
      {formatPct(change.pct)}
    </span>
  );
}

export default function BasketIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 230"
      className={className}
      role="img"
      aria-label="সবজির ঝুড়ি"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="140" cy="212" rx="112" ry="12" fill="#14231a" opacity="0.08" />

      {/* produce */}
      <circle cx="98" cy="86" r="42" fill="#ef4444" />
      <ellipse cx="84" cy="70" rx="7" ry="11" fill="#fff" opacity="0.28" />
      <path d="M100 46c2-14 10-22 22-24" stroke="#15803d" strokeWidth="5" strokeLinecap="round" fill="none" />
      <circle cx="170" cy="76" r="46" fill="#22c55e" />
      <ellipse cx="155" cy="58" rx="8" ry="13" fill="#fff" opacity="0.28" />
      <path d="M170 30c-2-14-6-22-14-28M170 30c6-12 14-18 24-20" stroke="#15803d" strokeWidth="5" strokeLinecap="round" fill="none" />
      <circle cx="58" cy="124" r="24" fill="#a855f7" />
      <circle cx="122" cy="118" r="22" fill="#f97316" />
      <circle cx="214" cy="116" r="24" fill="#f59e0b" />
      <path d="M214 92c0-8 4-13 10-16" stroke="#15803d" strokeWidth="5" strokeLinecap="round" fill="none" />

      {/* basket */}
      <path d="M52 128h176l-16 74a14 14 0 0 1-14 11H82a14 14 0 0 1-14-11z" fill="#b45309" />
      <rect x="44" y="122" width="192" height="18" rx="9" fill="#92400e" />
      <g stroke="#78350f" strokeWidth="4" strokeLinecap="round" opacity="0.75">
        <path d="M88 144l6 62" />
        <path d="M118 144l3 66" />
        <path d="M148 144v66" />
        <path d="M178 144l-3 66" />
        <path d="M208 144l-6 62" />
      </g>
    </svg>
  );
}

interface SectionHeadingProps {
  id?: string;
  title: string;
  subtitle?: string;
  marker?: { symbol: string; className: string };
}

export default function SectionHeading({ id, title, subtitle, marker }: SectionHeadingProps) {
  return (
    <div className="mb-4">
      <h2 id={id} className="flex items-center gap-2 text-xl font-bold sm:text-2xl">
        {marker && (
          <span aria-hidden="true" className={`text-base ${marker.className}`}>
            {marker.symbol}
          </span>
        )}
        {title}
      </h2>
      {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
    </div>
  );
}

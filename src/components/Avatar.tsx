interface AvatarProps {
  name: string;
  image?: string | null;
  className?: string;
}

export default function Avatar({ name, image, className = "size-9" }: AvatarProps) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name}
        referrerPolicy="no-referrer"
        className={`${className} shrink-0 rounded-xl object-cover`}
      />
    );
  }

  const initial = Array.from(name.trim())[0] ?? "?";
  return (
    <span
      aria-hidden="true"
      className={`${className} grid shrink-0 place-items-center rounded-xl bg-brand/10 font-bold text-brand`}
    >
      {initial.toUpperCase()}
    </span>
  );
}

import Link from "next/link";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
        <p className="mt-2 text-sm text-muted">{subtitle}</p>
      </div>
      <div className="mt-6 rounded-2xl border border-line bg-card p-5 sm:p-6">{children}</div>
      <p className="mt-6 text-center text-sm">
        <Link href="/" className="text-muted hover:text-brand">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}

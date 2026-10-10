import Link from "next/link";

interface NotFoundMessageProps {
  title?: string;
  message?: string;
  code?: string;
}

export default function NotFoundMessage({
  title = "দুঃখিত, পাতাটি খুঁজে পাওয়া যায়নি",
  message = "আপনি যে ঠিকানাটি খুঁজছেন সেটি হয়তো সরানো হয়েছে অথবা ঠিকানাটি ভুল।",
  code = "৪০৪",
}: NotFoundMessageProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center">
      <span aria-hidden="true" className="text-5xl">
        🛒
      </span>
      <p className="mt-4 text-6xl font-bold text-brand">{code}</p>
      <h1 className="mt-3 text-xl font-bold sm:text-2xl">{title}</h1>
      <p className="mt-2 text-sm text-muted">{message}</p>
      <Link
        href="/"
        className="btn btn-sm sm:btn-md mt-6 border-0 bg-brand font-semibold text-white shadow-md hover:bg-brand-dark"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}

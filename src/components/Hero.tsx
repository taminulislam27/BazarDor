import BanglaDate from "./BanglaDate";
import BasketIllustration from "./BasketIllustration";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl border border-line bg-card p-6 sm:p-10 md:flex-row">
      <div className="max-w-xl text-center md:text-left">
        <BanglaDate className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand sm:text-sm" />
        <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়,
          সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <a
          href="#সব-পণ্য"
          className="btn btn-sm sm:btn-md mt-6 border-0 bg-brand font-semibold text-white shadow-md hover:bg-brand-dark"
        >
          সব পণ্য দেখুন
        </a>
      </div>
      <BasketIllustration className="w-52 shrink-0 sm:w-64 md:w-72" />
    </section>
  );
}

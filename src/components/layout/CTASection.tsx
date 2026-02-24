"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function CTASection() {
    const t = useTranslations("cta");

    return (
        <section className="bg-emerald-600 py-16">
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-white">
                    {t("title")}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-emerald-100">
                    {t("desc")}
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link
                        href="/contact"
                        className="inline-flex items-center rounded-lg bg-white px-8 py-3 text-sm font-semibold text-emerald-600 shadow-lg transition-all hover:bg-emerald-50 hover:-translate-y-0.5"
                    >
                        {t("getQuote")}
                        <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                    <Link
                        href="/products"
                        className="inline-flex items-center rounded-lg border-2 border-white/40 px-8 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:-translate-y-0.5"
                    >
                        {t("browseProducts")}
                    </Link>
                </div>
            </div>
        </section>
    );
}

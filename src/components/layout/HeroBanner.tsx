"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function HeroBanner() {
    const t = useTranslations("hero");

    return (
        <section className="relative overflow-hidden bg-zinc-950 py-24 sm:py-32">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage: `radial-gradient(circle at 25px 25px, white 1px, transparent 0)`,
                        backgroundSize: "50px 50px",
                    }}
                />
            </div>

            {/* Gradient accents */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                <div className="h-[500px] w-[800px] rounded-full bg-emerald-600/20 blur-[120px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    {/* Badge */}
                    <div className="mb-6 inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400">
                        <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {t("badge")}
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        {t("title1")}{" "}
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                            {t("titleHighlight")}
                        </span>
                        <br />
                        {t("title2")}
                    </h1>

                    {/* Subtitle */}
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
                        {t("subtitle")}
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="/products"
                            className="inline-flex items-center rounded-lg bg-emerald-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-500 hover:-translate-y-0.5"
                        >
                            {t("viewProducts")}
                            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center rounded-lg border border-zinc-700 px-8 py-3 text-sm font-semibold text-zinc-300 transition-all hover:border-zinc-500 hover:text-white hover:-translate-y-0.5"
                        >
                            {t("requestQuote")}
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-3 gap-8 border-t border-zinc-800 pt-10">
                        <div>
                            <p className="text-3xl font-bold text-white">15+</p>
                            <p className="mt-1 text-sm text-zinc-500">{t("yearsExp")}</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">50+</p>
                            <p className="mt-1 text-sm text-zinc-500">{t("countriesServed")}</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">100%</p>
                            <p className="mt-1 text-sm text-zinc-500">{t("ecoFriendly")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

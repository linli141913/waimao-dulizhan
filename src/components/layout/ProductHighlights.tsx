"use client";

import { useTranslations } from "next-intl";

const highlights = [
    {
        key: "antiBacterial" as const,
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
        ),
    },
    {
        key: "bpaFree" as const,
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        key: "ecoFriendly" as const,
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 003 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
        ),
    },
    {
        key: "customDesign" as const,
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
            </svg>
        ),
    },
];

export default function ProductHighlights() {
    const t = useTranslations("highlights");

    return (
        <section className="bg-white py-20 dark:bg-zinc-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Head */}
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
                        {t("sectionTag")}
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        {t("sectionTitle")}
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-zinc-500 dark:text-zinc-400">
                        {t("sectionDesc")}
                    </p>
                </div>

                {/* Cards */}
                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {highlights.map((item) => (
                        <div
                            key={item.key}
                            className="group relative rounded-2xl border border-zinc-200 p-6 transition-all hover:border-emerald-200 hover:shadow-lg dark:border-zinc-800 dark:hover:border-emerald-800"
                        >
                            <div className="mb-4 inline-flex rounded-xl bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-900/20">
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                                {t(item.key)}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                                {t(`${item.key}Desc`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

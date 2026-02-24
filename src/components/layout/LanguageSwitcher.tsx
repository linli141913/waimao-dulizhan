"use client";

import { useTransition } from "react";

const labels: Record<string, string> = {
    en: "EN",
    zh: "中",
};

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
    const [isPending, startTransition] = useTransition();

    const switchLocale = (locale: string) => {
        startTransition(() => {
            document.cookie = `locale=${locale};path=/;max-age=${365 * 24 * 60 * 60}`;
            window.location.reload();
        });
    };

    const otherLocale = currentLocale === "en" ? "zh" : "en";

    return (
        <button
            onClick={() => switchLocale(otherLocale)}
            disabled={isPending}
            className="flex h-8 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-600 transition-colors hover:border-emerald-300 hover:text-emerald-600 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-emerald-700 dark:hover:text-emerald-400"
            aria-label={`Switch to ${labels[otherLocale]}`}
        >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 003 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
            {labels[otherLocale]}
        </button>
    );
}

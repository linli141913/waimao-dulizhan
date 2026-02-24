"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const t = useTranslations("nav");
    const locale = useLocale();

    const navLinks = [
        { href: "/", label: t("home") },
        { href: "/products", label: t("products") },
        { href: "/about", label: t("aboutUs") },
        { href: "/contact", label: t("contact") },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        WoodCraft<span className="text-emerald-600">Pro</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex md:items-center md:gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <LanguageSwitcher currentLocale={locale} />
                    <Link
                        href="/contact"
                        className="ml-2 rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                    >
                        {t("getQuote")}
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 md:hidden dark:text-zinc-400 dark:hover:bg-zinc-800"
                    aria-label="Toggle menu"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        {mobileOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Nav */}
            {mobileOpen && (
                <nav className="border-t border-zinc-200 bg-white px-4 pb-4 pt-2 md:hidden dark:border-zinc-800 dark:bg-zinc-950">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="block rounded-lg px-4 py-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="mt-2 px-4">
                        <LanguageSwitcher currentLocale={locale} />
                    </div>
                    <Link
                        href="/contact"
                        onClick={() => setMobileOpen(false)}
                        className="mt-2 block rounded-lg bg-emerald-600 px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                    >
                        {t("getQuote")}
                    </Link>
                </nav>
            )}
        </header>
    );
}

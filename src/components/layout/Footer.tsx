import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations("footer");
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <span className="text-lg font-bold text-zinc-900 dark:text-white">
                            WoodCraft<span className="text-emerald-600">Pro</span>
                        </span>
                        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                            {t("brandDesc")}
                        </p>
                    </div>

                    {/* Products */}
                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                            {t("productsTitle")}
                        </h3>
                        <ul className="mt-3 space-y-2">
                            <li>
                                <Link
                                    href="/products"
                                    className="text-sm text-zinc-500 transition-colors hover:text-emerald-600 dark:text-zinc-400"
                                >
                                    {t("allProducts")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/products"
                                    className="text-sm text-zinc-500 transition-colors hover:text-emerald-600 dark:text-zinc-400"
                                >
                                    {t("cuttingBoards")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                            {t("companyTitle")}
                        </h3>
                        <ul className="mt-3 space-y-2">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-sm text-zinc-500 transition-colors hover:text-emerald-600 dark:text-zinc-400"
                                >
                                    {t("aboutUs")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-sm text-zinc-500 transition-colors hover:text-emerald-600 dark:text-zinc-400"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                            Get in Touch
                        </h3>
                        <div className="mt-3 space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
                            <p className="flex items-center gap-2">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                                info@woodcraftpro.com
                            </p>
                            <p className="flex items-center gap-2">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                Guangdong, China
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-8 border-t border-zinc-200 pt-8 text-center text-xs text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
                    {t("copyright", { year: currentYear })}
                </div>
            </div>
        </footer>
    );
}

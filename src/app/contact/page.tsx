import InquiryForm from "@/components/inquiry/InquiryForm";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
    title: "Contact Us | WoodCraftPro",
    description:
        "Get in touch with WoodCraftPro for custom cutting board orders, OEM & ODM services, and product inquiries.",
};

export default async function ContactPage({
    searchParams,
}: {
    searchParams: Promise<{ product?: string }>;
}) {
    const params = await searchParams;
    const productId = params.product || "";
    const t = await getTranslations("contact");

    return (
        <div className="bg-white dark:bg-zinc-950">
            {/* Page Header */}
            <div className="bg-zinc-900 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {t("pageTitle")}
                    </h1>
                    <p className="mt-3 max-w-xl text-lg text-zinc-400">
                        {t("pageDesc")}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    {/* Left: Form */}
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl border border-zinc-200 p-6 sm:p-8 dark:border-zinc-800">
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                                {t("formTitle")}
                            </h2>
                            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                {t("formRequired")}
                            </p>
                            <div className="mt-6">
                                <InquiryForm preselectedProductId={productId} />
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Info */}
                    <div className="space-y-6">
                        <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                                    <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{t("address")}</h3>
                                    <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">{t("addressValue")}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                                    <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{t("emailLabel")}</h3>
                                    <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">{t("emailValue")}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                                    <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{t("businessHours")}</h3>
                                    <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">{t("businessHoursValue")}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-800 dark:bg-emerald-950/20">
                            <h3 className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">{t("quickResponse")}</h3>
                            <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">{t("quickResponseMsg")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

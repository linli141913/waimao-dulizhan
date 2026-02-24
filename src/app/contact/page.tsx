import InquiryForm from "@/components/inquiry/InquiryForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | WoodCraftPro",
    description:
        "Get in touch with WoodCraftPro for custom cutting board orders, OEM & ODM services, and product inquiries.",
};

export default function ContactPage({
    searchParams,
}: {
    searchParams: Promise<{ product?: string }>;
}) {
    // We need to handle the async searchParams
    return <ContactContent searchParamsPromise={searchParams} />;
}

async function ContactContent({
    searchParamsPromise,
}: {
    searchParamsPromise: Promise<{ product?: string }>;
}) {
    const searchParams = await searchParamsPromise;
    const productId = searchParams.product || "";

    return (
        <div className="bg-white dark:bg-zinc-950">
            {/* Page Header */}
            <div className="bg-zinc-900 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Contact Us
                    </h1>
                    <p className="mt-3 max-w-xl text-lg text-zinc-400">
                        Ready to start your project? Fill out the form below and our team
                        will get back to you within 24 hours.
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
                                Send Us an Inquiry
                            </h2>
                            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                Fields marked with <span className="text-red-500">*</span> are required
                            </p>
                            <div className="mt-6">
                                <InquiryForm preselectedProductId={productId} />
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Info */}
                    <div className="space-y-6">
                        {/* Address */}
                        <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                                    <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Address</h3>
                                    <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                                        Guangdong, China
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                                    <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Email</h3>
                                    <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                                        info@woodcraftpro.com
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                                    <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Business Hours</h3>
                                    <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                                        Mon–Fri, 9:00 AM – 6:00 PM (CST)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Response Time */}
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-800 dark:bg-emerald-950/20">
                            <h3 className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                                ⚡ Quick Response
                            </h3>
                            <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">
                                We typically respond to inquiries within 24 hours on business days. For urgent requests, please include your phone number.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

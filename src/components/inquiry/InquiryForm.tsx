"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inquirySchema, type InquiryFormData } from "@/lib/schemas";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface InquiryFormProps {
    preselectedProductId?: string;
}

export default function InquiryForm({ preselectedProductId }: InquiryFormProps) {
    const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const t = useTranslations("contact");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<InquiryFormData>({
        resolver: zodResolver(inquirySchema),
        defaultValues: {
            productId: preselectedProductId || "",
        },
    });

    const onSubmit = async (data: InquiryFormData) => {
        setSubmitStatus("submitting");
        try {
            const res = await fetch("/api/inquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Failed to submit");
            setSubmitStatus("success");
            reset();
        } catch {
            setSubmitStatus("error");
        }
    };

    if (submitStatus === "success") {
        return (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-800 dark:bg-emerald-950/30">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                    <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-300">{t("successTitle")}</h3>
                <p className="mt-2 text-emerald-700 dark:text-emerald-400">
                    {t("successMsg")}
                </p>
                <button
                    onClick={() => setSubmitStatus("idle")}
                    className="mt-6 rounded-lg bg-emerald-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
                >
                    {t("sendAnother")}
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name + Email row */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {t("name")} <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="name"
                        type="text"
                        {...register("name")}
                        className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-emerald-500"
                        placeholder={t("namePlaceholder")}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {t("email")} <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-emerald-500"
                        placeholder={t("emailPlaceholder")}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                </div>
            </div>

            {/* Company + Phone row */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="company" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {t("company")}
                    </label>
                    <input
                        id="company"
                        type="text"
                        {...register("company")}
                        className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-emerald-500"
                        placeholder={t("companyPlaceholder")}
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {t("phone")}
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-emerald-500"
                        placeholder={t("phonePlaceholder")}
                    />
                </div>
            </div>

            {/* Product + Quantity row */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="productId" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {t("productOfInterest")}
                    </label>
                    <input
                        id="productId"
                        type="text"
                        {...register("productId")}
                        className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-emerald-500"
                        placeholder={t("productPlaceholder")}
                    />
                </div>
                <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {t("estimatedQty")}
                    </label>
                    <input
                        id="quantity"
                        type="text"
                        {...register("quantity")}
                        className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-emerald-500"
                        placeholder={t("qtyPlaceholder")}
                    />
                </div>
            </div>

            {/* Message */}
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {t("message")} <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="message"
                    rows={5}
                    {...register("message")}
                    className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-emerald-500"
                    placeholder={t("messagePlaceholder")}
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
            </div>

            {/* Error banner */}
            {submitStatus === "error" && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400">
                    {t("errorMsg")}
                </div>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={submitStatus === "submitting"}
                className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-500 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
            >
                {submitStatus === "submitting" ? (
                    <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        {t("submitting")}
                    </>
                ) : (
                    <>
                        {t("submit")}
                        <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    </>
                )}
            </button>
        </form>
    );
}

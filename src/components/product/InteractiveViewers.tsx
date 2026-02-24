"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const ModelViewer = dynamic(() => import("@/components/product/ModelViewer"), {
    ssr: false,
    loading: () => (
        <div className="flex h-[460px] items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
        </div>
    ),
});

const DrawingViewer = dynamic(() => import("@/components/product/DrawingViewer"), {
    ssr: false,
    loading: () => (
        <div className="flex h-[460px] items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
        </div>
    ),
});

interface InteractiveViewersProps {
    productId: string;
    shape: "rect" | "round";
    model3d?: string;
    drawing2d?: string;
}

export default function InteractiveViewers({ productId, shape, model3d, drawing2d }: InteractiveViewersProps) {
    const t = useTranslations("productDetail");
    if (!model3d && !drawing2d) return null;

    return (
        <div className="mt-16">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                {t("interactiveViews")}
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                {t("interactiveViewsDesc")}
            </p>
            <div className={`mt-8 grid grid-cols-1 gap-6 ${model3d && drawing2d ? "lg:grid-cols-2" : ""}`}>
                {model3d && (
                    <ModelViewer shape={shape} />
                )}
                {drawing2d && (
                    <DrawingViewer drawingPath={drawing2d} />
                )}
            </div>
        </div>
    );
}

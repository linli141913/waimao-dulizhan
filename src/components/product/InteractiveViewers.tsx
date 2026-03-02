"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import React from "react";

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

/** Error Boundary to catch Three.js / WebGL crashes without killing the page */
class ViewerErrorBoundary extends React.Component<
    { children: React.ReactNode; fallbackMessage?: string },
    { hasError: boolean }
> {
    constructor(props: { children: React.ReactNode; fallbackMessage?: string }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex h-[460px] items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-zinc-300 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                        </svg>
                        <p className="mt-3 text-sm text-zinc-400 dark:text-zinc-500">
                            {this.props.fallbackMessage || "Unable to load viewer"}
                        </p>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

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
                    <ViewerErrorBoundary fallbackMessage="3D viewer unavailable">
                        <ModelViewer shape={shape} modelPath={model3d} />
                    </ViewerErrorBoundary>
                )}
                {drawing2d && (
                    <ViewerErrorBoundary fallbackMessage="Drawing viewer unavailable">
                        <DrawingViewer drawingPath={drawing2d} />
                    </ViewerErrorBoundary>
                )}
            </div>
        </div>
    );
}

"use client";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface DrawingViewerProps {
    drawingPath: string;
}

export default function DrawingViewer({ drawingPath }: DrawingViewerProps) {
    const [scale, setScale] = useState(1);
    const t = useTranslations("viewer2d");

    return (
        <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {t("title")}
                    </span>
                </div>
                <span className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                    {Math.round(scale * 100)}%
                </span>
            </div>

            {/* Drawing Canvas */}
            <div className="h-[400px] w-full bg-[#1a2744]">
                <TransformWrapper
                    initialScale={1}
                    minScale={0.3}
                    maxScale={5}
                    onTransformed={(_, state) => setScale(state.scale)}
                    centerOnInit
                >
                    {({ zoomIn, zoomOut, resetTransform }) => (
                        <>
                            <TransformComponent
                                wrapperStyle={{ width: "100%", height: "100%" }}
                                contentStyle={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={drawingPath}
                                    alt="Engineering Drawing"
                                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                                />
                            </TransformComponent>

                            {/* Zoom Controls */}
                            <div className="absolute bottom-14 right-4 flex flex-col gap-1">
                                <button
                                    onClick={() => zoomIn()}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                                    aria-label="Zoom in"
                                >
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => zoomOut()}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                                    aria-label="Zoom out"
                                >
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => resetTransform()}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                                    aria-label="Reset zoom"
                                >
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                                    </svg>
                                </button>
                            </div>
                        </>
                    )}
                </TransformWrapper>
            </div>

            {/* Controls hint */}
            <div className="border-t border-zinc-200 px-4 py-2 dark:border-zinc-800">
                <p className="text-center text-xs text-zinc-400 dark:text-zinc-500">
                    {t("hint")}
                </p>
            </div>
        </div>
    );
}

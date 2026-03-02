"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageGalleryProps {
    images: string[];
    productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [imgError, setImgError] = useState<Record<number, boolean>>({});

    const hasValidImages = images.length > 0;

    return (
        <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 dark:from-zinc-800 dark:to-zinc-700">
                {hasValidImages && !imgError[activeIndex] ? (
                    <Image
                        src={images[activeIndex]}
                        alt={`${productName} - Image ${activeIndex + 1}`}
                        fill
                        className="object-cover transition-opacity duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={activeIndex === 0}
                        onError={() =>
                            setImgError((prev) => ({ ...prev, [activeIndex]: true }))
                        }
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <div className="text-center">
                            <svg className="mx-auto h-24 w-24 text-amber-300/60 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                            </svg>
                            <p className="mt-3 text-sm text-amber-400/80 dark:text-zinc-500">
                                Product Image
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Thumbnail row */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                    {images.map((src, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`relative aspect-square overflow-hidden rounded-lg transition-all ${index === activeIndex
                                    ? "ring-2 ring-emerald-600 ring-offset-2 dark:ring-offset-zinc-950"
                                    : "opacity-60 hover:opacity-100"
                                }`}
                        >
                            {!imgError[index] ? (
                                <Image
                                    src={src}
                                    alt={`${productName} - Thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="120px"
                                    onError={() =>
                                        setImgError((prev) => ({
                                            ...prev,
                                            [index]: true,
                                        }))
                                    }
                                />
                            ) : (
                                <div className="h-full w-full bg-gradient-to-br from-amber-50 to-orange-100 dark:from-zinc-800 dark:to-zinc-700" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

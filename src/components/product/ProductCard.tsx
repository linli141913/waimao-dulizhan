import Link from "next/link";
import type { Product } from "@/types/product";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link
            href={`/products/${product.id}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/30 hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-800 dark:hover:shadow-emerald-900/20"
        >
            {/* Image placeholder */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100 dark:from-zinc-800 dark:to-zinc-700">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <svg className="mx-auto h-16 w-16 text-amber-300/60 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                        </svg>
                        <p className="mt-2 text-xs text-amber-400/80 dark:text-zinc-500">Product Image</p>
                    </div>
                </div>
                {/* 3D badge */}
                {product.model3d && (
                    <span className="absolute top-3 right-3 rounded-full bg-zinc-900/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                        3D
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-semibold text-zinc-900 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                    {product.specs.material}
                </h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    {product.specs.dimensions}
                </p>

                {/* Features tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                    {product.features.slice(0, 3).map((feature) => (
                        <span
                            key={feature}
                            className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                        >
                            {feature}
                        </span>
                    ))}
                </div>

                {/* MOQ */}
                <div className="mt-auto pt-4">
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">
                        MOQ: <span className="font-medium text-zinc-600 dark:text-zinc-300">{product.specs.moq}</span>
                    </p>
                </div>
            </div>
        </Link>
    );
}

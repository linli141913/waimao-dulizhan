import { notFound } from "next/navigation";
import Link from "next/link";
import productsData from "@/data/products.json";
import InteractiveViewers from "@/components/product/InteractiveViewers";
import { productJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import type { Product } from "@/types/product";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const products = productsData as Product[];

// Detect shape from product id
function getShape(id: string): "rect" | "round" {
    return id.includes("round") ? "round" : "rect";
}

// Generate static paths for all products
export function generateStaticParams() {
    return products.map((product) => ({ id: product.id }));
}

// Dynamic metadata
export function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    return params.then(({ id }) => {
        const product = products.find((p) => p.id === id);
        if (!product) return { title: "Product Not Found" };
        return {
            title: `${product.specs.material} ${product.specs.dimensions} | WoodCraftPro`,
            description: `${product.specs.material} cutting board - ${product.specs.dimensions}. ${product.features.join(", ")}. MOQ: ${product.specs.moq}.`,
        };
    });
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = products.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    const shape = getShape(product.id);

    // Get related products (same category, excluding current)
    const related = products.filter(
        (p) => p.category === product.category && p.id !== product.id
    );
    const t = await getTranslations("productDetail");

    return (
        <div className="bg-white dark:bg-zinc-950">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(productJsonLd(product)),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        breadcrumbJsonLd([
                            { name: "Home", url: "https://woodcraftpro.com" },
                            { name: "Products", url: "https://woodcraftpro.com/products" },
                            { name: product.specs.dimensions, url: `https://woodcraftpro.com/products/${product.id}` },
                        ])
                    ),
                }}
            />
            {/* Breadcrumb */}
            <div className="border-b border-zinc-200 dark:border-zinc-800">
                <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
                    <nav className="flex text-sm text-zinc-500 dark:text-zinc-400">
                        <Link href="/" className="hover:text-emerald-600">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href="/products" className="hover:text-emerald-600">Products</Link>
                        <span className="mx-2">/</span>
                        <span className="text-zinc-900 dark:text-white">{product.specs.dimensions}</span>
                    </nav>
                </div>
            </div>

            {/* Product Content */}
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Left: Image Gallery */}
                    <div className="space-y-4">
                        {/* Main image placeholder */}
                        <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 dark:from-zinc-800 dark:to-zinc-700">
                            <div className="flex h-full items-center justify-center">
                                <div className="text-center">
                                    <svg className="mx-auto h-24 w-24 text-amber-300/60 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                                    </svg>
                                    <p className="mt-3 text-sm text-amber-400/80 dark:text-zinc-500">Product Image</p>
                                </div>
                            </div>
                        </div>
                        {/* Thumbnail row */}
                        <div className="grid grid-cols-4 gap-3">
                            {product.images.map((_, index) => (
                                <div
                                    key={index}
                                    className="aspect-square rounded-lg bg-gradient-to-br from-amber-50 to-orange-100 dark:from-zinc-800 dark:to-zinc-700"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div>
                        {/* Category */}
                        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
                            {product.category.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                        </p>

                        {/* Title */}
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                            {product.specs.material}
                        </h1>
                        <p className="mt-1 text-lg text-zinc-500 dark:text-zinc-400">
                            {product.specs.dimensions}
                        </p>

                        {/* Features */}
                        <div className="mt-6 flex flex-wrap gap-2">
                            {product.features.map((feature) => (
                                <span
                                    key={feature}
                                    className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                                >
                                    {feature}
                                </span>
                            ))}
                        </div>

                        {/* Specs Table */}
                        <div className="mt-8">
                            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">{t("specifications")}</h2>
                            <dl className="mt-4 divide-y divide-zinc-200 dark:divide-zinc-800">
                                {Object.entries({
                                    [t("dimensions")]: product.specs.dimensions,
                                    [t("weight")]: product.specs.weight,
                                    [t("material")]: product.specs.material,
                                    [t("colors")]: product.specs.color.join(", "),
                                    MOQ: product.specs.moq,
                                    [t("leadTime")]: product.specs.leadTime,
                                    [t("packaging")]: product.specs.packaging,
                                }).map(([key, value]) => (
                                    <div key={key} className="flex justify-between py-3">
                                        <dt className="text-sm text-zinc-500 dark:text-zinc-400">{key}</dt>
                                        <dd className="text-sm font-medium text-zinc-900 dark:text-white">{value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        {/* CTA Button */}
                        <div className="mt-8">
                            <Link
                                href={`/contact?product=${product.id}`}
                                className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-500 hover:-translate-y-0.5 sm:w-auto"
                            >
                                {t("requestQuote")}
                                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 3D & 2D Viewers — Client Component wrapper */}
                <InteractiveViewers
                    productId={product.id}
                    shape={shape}
                    model3d={product.model3d}
                    drawing2d={product.drawing2d}
                />

                {/* Related Products */}
                {related.length > 0 && (
                    <div className="mt-20 border-t border-zinc-200 pt-12 dark:border-zinc-800">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                            {t("relatedProducts")}
                        </h2>
                        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map((p) => (
                                <Link
                                    key={p.id}
                                    href={`/products/${p.id}`}
                                    className="group rounded-2xl border border-zinc-200 p-4 transition-all hover:border-emerald-200 hover:shadow-lg dark:border-zinc-800 dark:hover:border-emerald-800"
                                >
                                    <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-amber-50 to-orange-100 dark:from-zinc-800 dark:to-zinc-700" />
                                    <h3 className="mt-3 text-sm font-semibold text-zinc-900 group-hover:text-emerald-600 dark:text-white">
                                        {p.specs.material}
                                    </h3>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{p.specs.dimensions}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

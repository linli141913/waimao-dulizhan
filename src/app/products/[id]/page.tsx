import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import productsData from "@/data/products.json";
import ImageGallery from "@/components/product/ImageGallery";
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
            title: `${product.name} - ${product.specs.dimensions} | WoodCraftPro`,
            description: `${product.name} - ${product.specs.material} cutting board. ${product.specs.dimensions}. ${product.features.join(", ")}. MOQ: ${product.specs.moq}.`,
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
                            { name: product.name, url: `https://woodcraftpro.com/products/${product.id}` },
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
                        <span className="text-zinc-900 dark:text-white">{product.name}</span>
                    </nav>
                </div>
            </div>

            {/* Product Content */}
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Left: Image Gallery — Client Component */}
                    <ImageGallery images={product.images} productName={product.name} />

                    {/* Right: Product Info */}
                    <div>
                        {/* Category */}
                        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
                            {product.category.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                        </p>

                        {/* Title */}
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                            {product.name}
                        </h1>
                        <p className="mt-1 text-lg text-zinc-500 dark:text-zinc-400">
                            {product.specs.dimensions}
                        </p>

                        {/* Description */}
                        {product.description && (
                            <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                {product.description}
                            </p>
                        )}

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
                                <RelatedProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

/** Related product card with image support */
function RelatedProductCard({ product }: { product: Product }) {
    return (
        <Link
            href={`/products/${product.id}`}
            className="group rounded-2xl border border-zinc-200 p-4 transition-all hover:border-emerald-200 hover:shadow-lg dark:border-zinc-800 dark:hover:border-emerald-800"
        >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-amber-50 to-orange-100 dark:from-zinc-800 dark:to-zinc-700">
                {product.images.length > 0 && (
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                )}
            </div>
            <h3 className="mt-3 text-sm font-semibold text-zinc-900 group-hover:text-emerald-600 dark:text-white">
                {product.name}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{product.specs.dimensions}</p>
        </Link>
    );
}

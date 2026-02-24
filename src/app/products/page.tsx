import ProductCard from "@/components/product/ProductCard";
import productsData from "@/data/products.json";
import type { Product } from "@/types/product";
import type { Metadata } from "next";

const products = productsData as Product[];

export const metadata: Metadata = {
    title: "Products | WoodCraftPro",
    description:
        "Browse our complete range of premium wood fiber cutting boards. Various shapes, sizes and custom options available.",
};

export default function ProductsPage() {
    // Get unique categories
    const categories = Array.from(new Set(products.map((p) => p.category)));

    return (
        <div className="bg-white dark:bg-zinc-950">
            {/* Page Header */}
            <div className="bg-zinc-900 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Our Products
                    </h1>
                    <p className="mt-3 max-w-xl text-lg text-zinc-400">
                        Premium wood fiber cutting boards crafted with precision. Available
                        in various shapes and sizes for every kitchen.
                    </p>
                </div>
            </div>

            {/* Products Section */}
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Filter bar */}
                <div className="mb-8 flex flex-wrap items-center gap-3">
                    <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        Filter:
                    </span>
                    <button className="rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white">
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className="rounded-full border border-zinc-200 px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:border-emerald-300 hover:text-emerald-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-emerald-700 dark:hover:text-emerald-400"
                        >
                            {cat
                                .split("-")
                                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                                .join(" ")}
                        </button>
                    ))}
                </div>

                {/* Results count */}
                <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
                    Showing <span className="font-medium text-zinc-900 dark:text-white">{products.length}</span> products
                </p>

                {/* Product Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}

import HeroBanner from "@/components/layout/HeroBanner";
import ProductHighlights from "@/components/layout/ProductHighlights";
import ProductCard from "@/components/product/ProductCard";
import CTASection from "@/components/layout/CTASection";
import productsData from "@/data/products.json";
import type { Product } from "@/types/product";
import { getTranslations } from "next-intl/server";

const products = productsData as Product[];

export default async function Home() {
  const t = await getTranslations("featuredProducts");

  return (
    <>
      {/* Hero */}
      <HeroBanner />

      {/* Product Highlights */}
      <ProductHighlights />

      {/* Featured Products */}
      <section className="bg-zinc-50 py-20 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
              {t("sectionTag")}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              {t("sectionTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-500 dark:text-zinc-400">
              {t("sectionDesc")}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}

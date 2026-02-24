import type { MetadataRoute } from "next";
import productsData from "@/data/products.json";
import type { Product } from "@/types/product";

const products = productsData as Product[];
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://woodcraftpro.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${BASE_URL}/products`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
    ];

    const productPages: MetadataRoute.Sitemap = products.map((product) => ({
        url: `${BASE_URL}/products/${product.id}`,
        lastModified: new Date(product.createdAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...staticPages, ...productPages];
}

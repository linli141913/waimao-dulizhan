import type { Product } from "@/types/product";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://woodcraftpro.com";

/** Organization structured data — appears on every page */
export function organizationJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "WoodCraftPro",
        url: BASE_URL,
        logo: `${BASE_URL}/logo.png`,
        description:
            "Professional wood fiber cutting boards manufacturer offering OEM & ODM services.",
        address: {
            "@type": "PostalAddress",
            addressRegion: "Guangdong",
            addressCountry: "CN",
        },
        contactPoint: {
            "@type": "ContactPoint",
            email: "info@woodcraftpro.com",
            contactType: "sales",
            availableLanguage: ["English", "Chinese"],
        },
    };
}

/** Product structured data for detail pages */
export function productJsonLd(product: Product) {
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: `${product.specs.material} Cutting Board - ${product.specs.dimensions}`,
        description: `${product.specs.material} cutting board, ${product.specs.dimensions}. Features: ${product.features.join(", ")}. MOQ: ${product.specs.moq}.`,
        brand: {
            "@type": "Brand",
            name: "WoodCraftPro",
        },
        material: product.specs.material,
        weight: {
            "@type": "QuantitativeValue",
            value: parseInt(product.specs.weight),
            unitCode: "GRM",
        },
        offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "USD",
            url: `${BASE_URL}/products/${product.id}`,
            seller: {
                "@type": "Organization",
                name: "WoodCraftPro",
            },
        },
        additionalProperty: [
            {
                "@type": "PropertyValue",
                name: "MOQ",
                value: product.specs.moq,
            },
            {
                "@type": "PropertyValue",
                name: "Lead Time",
                value: product.specs.leadTime,
            },
        ],
    };
}

/** BreadcrumbList structured data */
export function breadcrumbJsonLd(
    items: { name: string; url: string }[]
) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

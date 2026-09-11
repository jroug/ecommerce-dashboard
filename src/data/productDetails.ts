import type { Product, ProductDetails, ProductVariant } from "@/types/product";

const descriptions: Record<string, string> = {
  "Linen Overshirt":
    "A lightweight linen overshirt designed for effortless layering. Cut in a relaxed silhouette with natural texture, durable buttons, and two practical chest pockets.",
  "Everyday Sneakers":
    "Comfortable low-profile sneakers with a cushioned sole and clean, versatile finish for daily wear.",
};

// Seed illustrative variants; quantities are not an allocation of the parent stock total.
function variantsFor(product: Product): ProductVariant[] {
  if (product.type !== "variable") return [];
  return ["Natural / S", "Natural / M", "Black / L", "Black / XL"].map((name, index) => ({
    id: product.id * 10 + index,
    name,
    sku: `${product.sku}-${["S", "M", "L", "XL"][index]}`,
    price: product.price,
    stockQuantity: Math.max(0, Math.floor((product.stockQuantity ?? 0) / 4) + index),
    stockStatus: "instock",
  }));
}

// Supply demo-only detail fields and estimated metrics absent from the list fixtures.
export function getProductDetails(product: Product): ProductDetails {
  const secondaryImages = ["/products/accessory.svg", "/products/home.svg"];
  return {
    ...product,
    description:
      descriptions[product.name] ??
      `${product.name} is thoughtfully designed with quality materials, practical details, and a versatile finish for everyday use.`,
    images: [
      product.image,
      ...secondaryImages.map((src, index) => ({
        id: product.id * 10 + index,
        src,
        alt: `${product.name} alternate view ${index + 1}`,
      })),
    ],
    cost: (Number(product.price) * 0.48).toFixed(2),
    barcode: `520${product.id}008421`,
    backorders: product.stockStatus === "onbackorder" ? "notify" : "no",
    physicalProduct: true,
    weight: product.category.slug === "footwear" ? "0.8" : "0.45",
    dimensions: { length: "32", width: "24", height: "8" },
    shippingClass: "Standard",
    categories: [product.category],
    tags:
      product.category.slug === "apparel"
        ? ["new arrival", "unisex", "natural fabrics"]
        : ["featured", product.category.slug],
    brand: "Northstar Studio",
    productTypeLabel: product.category.name,
    options:
      product.type === "variable"
        ? [
            { id: 1, name: "Size", values: ["S", "M", "L", "XL"] },
            { id: 2, name: "Color", values: ["Natural", "Black"] },
          ]
        : [],
    variants: variantsFor(product),
    seo: {
      title: `${product.name} | Northstar`,
      description: `Shop ${product.name.toLowerCase()} from Northstar. Quality materials, thoughtful details, and fast delivery.`,
    },
    revenue: (product.totalSales * Number(product.price)).toFixed(2),
    ordersCount: Math.max(0, Math.round(product.totalSales * 0.82)),
  };
}

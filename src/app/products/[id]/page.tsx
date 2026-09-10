import { AppShell } from "@/components/dashboard/AppShell";
import { ProductDetailsForm } from "@/components/products/ProductDetailsForm";
import { ProductNotFound } from "@/components/products/ProductNotFound";
import { getProductDetails } from "@/data/productDetails";
import { productCategories, products } from "@/data/products";

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((item) => String(item.id) === id);
  return (
    <AppShell activeSection="products" mobileTitle={product?.name ?? "Product"}>
      {product ? (
        <ProductDetailsForm
          initialProduct={getProductDetails(product)}
          categories={productCategories}
        />
      ) : (
        <ProductNotFound />
      )}
    </AppShell>
  );
}

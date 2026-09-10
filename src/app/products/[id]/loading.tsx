import { AppShell } from "@/components/dashboard/AppShell";
import { ProductDetailsSkeleton } from "@/components/products/ProductDetailsSkeleton";

export default function LoadingProductDetails() {
  return (
    <AppShell activeSection="products" mobileTitle="Product">
      <ProductDetailsSkeleton />
    </AppShell>
  );
}

import { AppShell } from "@/components/dashboard/AppShell";
import { ProductsPage } from "@/components/products/ProductsPage";
import { productCategories,products } from "@/data/products";
export default function ProductsRoute(){return <AppShell activeSection="products" mobileTitle="Products"><ProductsPage initialProducts={products} categories={productCategories}/></AppShell>}

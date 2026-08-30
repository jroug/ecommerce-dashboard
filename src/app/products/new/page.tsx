import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/dashboard/AppShell";

export default function NewProductPage() {
  return <AppShell activeSection="products" mobileTitle="Add product"><main className="mx-auto max-w-[900px] px-4 py-6 sm:px-6 lg:px-8"><Link href="/products" className="mb-4 inline-flex items-center gap-1 text-[13px] font-medium text-[var(--color-text-secondary)]"><ArrowLeft size={15}/>Products</Link><h1 className="text-[22px] font-semibold">Add product</h1><section className="admin-card mt-4 p-5"><h2 className="text-[15px] font-semibold">Product creation is coming next</h2><p className="mt-1 text-[13px] text-[var(--color-text-secondary)]">This route keeps the existing add-product action available while the creation workflow is built.</p></section></main></AppShell>;
}

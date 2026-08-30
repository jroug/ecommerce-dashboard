import Link from "next/link";
import { ArrowLeft, PackageSearch } from "lucide-react";

export function ProductNotFound() {
  return <main className="mx-auto max-w-[720px] px-4 py-16 text-center sm:px-6"><div className="admin-card px-6 py-12"><PackageSearch className="mx-auto text-[var(--color-text-muted)]" size={36}/><h1 className="mt-4 text-[20px] font-semibold">Product not found</h1><p className="mx-auto mt-1 max-w-md text-[13px] text-[var(--color-text-secondary)]">This product may have been removed, or the link may be incorrect.</p><Link href="/products" className="mt-5 inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-md)] bg-[var(--color-action)] px-3 text-[12px] font-semibold text-white"><ArrowLeft size={13}/>Back to products</Link></div></main>;
}

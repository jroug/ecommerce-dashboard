import type { ProductStatus } from "@/types/product";
const styles: Record<ProductStatus, string> = { active: "bg-[var(--color-success-bg)] text-[var(--color-success)]", draft: "bg-[var(--color-warning-bg)] text-[var(--color-warning)]", archived: "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]" };
const labels: Record<ProductStatus, string> = { active: "Active", draft: "Draft", archived: "Archived" };
export function ProductStatusBadge({ status }: { status: ProductStatus }) { return <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${styles[status]}`}>{labels[status]}</span>; }

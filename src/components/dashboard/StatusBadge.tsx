import type { OrderStatus } from "@/types/dashboard";

const styles: Record<OrderStatus, string> = {
  processing: "bg-[var(--color-info-bg)] text-[var(--color-info)]",
  pending: "bg-[var(--color-warning-bg)] text-[var(--color-warning)]",
  completed: "bg-[var(--color-success-bg)] text-[var(--color-success)]",
  cancelled: "bg-[var(--color-error-bg)] text-[var(--color-error)]",
  refunded: "bg-[#f0ecf8] text-[#6b4b8a]",
};
const labels: Record<OrderStatus, string> = {
  processing: "Processing",
  pending: "Pending",
  completed: "Completed",
  cancelled: "Cancelled",
  refunded: "Refunded",
};
export function StatusBadge({ status, label }: { status: OrderStatus; label?: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${styles[status]}`}
    >
      {label ?? labels[status]}
    </span>
  );
}

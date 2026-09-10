import type { PaymentStatus } from "@/types/order";

const styles: Record<PaymentStatus, string> = {
  paid: "bg-[var(--color-success-bg)] text-[var(--color-success)]",
  pending: "bg-[var(--color-warning-bg)] text-[var(--color-warning)]",
  refunded: "bg-[#f2edfc] text-[#6948a5]",
  failed: "bg-[var(--color-error-bg)] text-[var(--color-error)]",
};
const labels: Record<PaymentStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  refunded: "Refunded",
  failed: "Failed",
};

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

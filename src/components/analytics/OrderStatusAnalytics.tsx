import type { Order, OrderStatus } from "@/types/order";
const labels: Record<OrderStatus, string> = {
  pending: "Pending",
  processing: "Processing",
  "on-hold": "On hold",
  completed: "Completed",
  cancelled: "Cancelled",
  refunded: "Refunded",
  failed: "Failed",
};
export function OrderStatusAnalytics({ orders }: { orders: Order[] }) {
  const statuses = Object.keys(labels) as OrderStatus[];
  return (
    <section className="admin-card">
      <header className="border-b px-4 py-3.5">
        <h2 className="text-[15px] font-semibold">Order status</h2>
      </header>
      <div className="space-y-3 p-4">
        {statuses.map((status) => {
          const count = orders.filter((order) => order.status === status).length;
          const percentage = orders.length ? (count / orders.length) * 100 : 0;
          return (
            <div
              key={status}
              className="grid grid-cols-[80px_1fr_64px] items-center gap-3 text-[11px]"
            >
              <span>{labels[status]}</span>
              <div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-surface-hover)]">
                <div
                  className="h-full rounded-full bg-[#77827c]"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-right text-[var(--color-text-muted)]">
                {count} · {percentage.toFixed(0)}%
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

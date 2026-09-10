import type { Order } from "@/types/order";
const money = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" });
export function RefundAnalytics({ orders }: { orders: Order[] }) {
  const refunded = orders.filter(
    (order) => order.status === "refunded" || order.paymentStatus === "refunded",
  );
  const amount = refunded.reduce((sum, order) => sum + Number(order.total), 0);
  const metrics = [
    { label: "Refunded amount", value: money.format(amount) },
    { label: "Refunded orders", value: refunded.length.toString() },
    {
      label: "Refund rate",
      value: `${orders.length ? ((refunded.length / orders.length) * 100).toFixed(1) : 0}%`,
    },
  ];
  return (
    <section className="admin-card">
      <header className="border-b px-4 py-3.5">
        <h2 className="text-[15px] font-semibold">Refund analytics</h2>
      </header>
      <dl className="grid grid-cols-3 divide-x p-4 text-center">
        {metrics.map((item) => (
          <div key={item.label}>
            <dt className="text-[11px] text-[var(--color-text-muted)]">{item.label}</dt>
            <dd className="mt-1 text-[15px] font-semibold">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

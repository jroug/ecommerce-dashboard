import type { Customer } from "@/types/customer";
const money = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" });
export function CustomerMetrics({ customers }: { customers: Customer[] }) {
  const totalOrders = customers.reduce((sum, item) => sum + item.ordersCount, 0);
  const totalSpent = customers.reduce((sum, item) => sum + Number(item.totalSpent), 0);
  const metrics = [
    { label: "Total customers", value: customers.length.toLocaleString() },
    {
      label: "New customers",
      value: customers
        .filter((item) => new Date(item.dateCreated) >= new Date("2026-08-01"))
        .length.toString(),
    },
    {
      label: "Returning customers",
      value: customers.filter((item) => item.ordersCount > 1).length.toString(),
    },
    {
      label: "Average order value",
      value: money.format(totalOrders ? totalSpent / totalOrders : 0),
    },
  ];
  return (
    <section
      className="mb-4 grid grid-cols-2 overflow-hidden rounded-[var(--radius-lg)] border bg-[var(--color-surface)] sm:grid-cols-4"
      aria-label="Customer summary"
    >
      {metrics.map((metric, index) => (
        <div
          key={metric.label}
          className={`px-4 py-3 ${index % 2 ? "border-l" : ""} ${index > 1 ? "border-t sm:border-t-0" : ""} sm:border-l sm:first:border-l-0`}
        >
          <p className="text-[11px] text-[var(--color-text-muted)]">{metric.label}</p>
          <p className="mt-0.5 text-[17px] font-semibold tabular-nums">{metric.value}</p>
        </div>
      ))}
    </section>
  );
}

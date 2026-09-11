import type { Customer } from "@/types/customer";
const money = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" });
export function CustomerAnalytics({ customers }: { customers: Customer[] }) {
  // The cohort is range-filtered upstream, but spend and order counts are lifetime values.
  const returning = customers.filter((customer) => customer.ordersCount > 1).length;
  const totalSpent = customers.reduce((sum, customer) => sum + Number(customer.totalSpent), 0);
  const totalOrders = customers.reduce((sum, customer) => sum + customer.ordersCount, 0);
  const values = [
    {
      label: "New customers",
      value: customers
        .filter((customer) => new Date(customer.dateCreated) >= new Date("2026-08-01"))
        .length.toString(),
    },
    { label: "Returning customers", value: returning.toString() },
    {
      label: "Returning rate",
      value: `${customers.length ? ((returning / customers.length) * 100).toFixed(1) : 0}%`,
    },
    {
      label: "Average customer spend",
      value: money.format(customers.length ? totalSpent / customers.length : 0),
    },
    {
      label: "Avg. orders / customer",
      value: (customers.length ? totalOrders / customers.length : 0).toFixed(1),
    },
  ];
  return (
    <section className="admin-card">
      <header className="border-b px-4 py-3.5">
        <h2 className="text-[15px] font-semibold">Customer analytics</h2>
      </header>
      <dl className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3">
        {values.map((item) => (
          <div key={item.label}>
            <dt className="text-[11px] text-[var(--color-text-muted)]">{item.label}</dt>
            <dd className="mt-1 text-[15px] font-semibold">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

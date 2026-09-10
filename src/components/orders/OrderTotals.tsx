import type { OrderDetails } from "@/types/order";
const money = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" });
export function OrderTotals({ order }: { order: OrderDetails }) {
  const rows = [
    { label: "Subtotal", value: Number(order.subtotal) },
    { label: "Discount", value: -Number(order.discountTotal) },
    { label: "Shipping", value: Number(order.shippingTotal) },
    { label: "Tax", value: Number(order.taxTotal) },
  ];
  return (
    <section className="admin-card p-4 sm:p-5">
      <h2 className="mb-3 text-[15px] font-semibold">Order totals</h2>
      <dl className="ml-auto max-w-sm space-y-2 text-[13px]">
        {rows.map((row) => (
          <div className="flex justify-between gap-8" key={row.label}>
            <dt className="text-[var(--color-text-secondary)]">{row.label}</dt>
            <dd className="tabular-nums">
              {row.value < 0 ? `-${money.format(Math.abs(row.value))}` : money.format(row.value)}
            </dd>
          </div>
        ))}
        <div className="flex justify-between gap-8 border-t pt-2.5 font-semibold">
          <dt>Order total</dt>
          <dd className="text-[15px] tabular-nums">{money.format(Number(order.total))}</dd>
        </div>
        <div className="flex justify-between gap-8 text-[var(--color-success)]">
          <dt>Amount paid</dt>
          <dd className="font-semibold tabular-nums">{money.format(Number(order.amountPaid))}</dd>
        </div>
      </dl>
    </section>
  );
}

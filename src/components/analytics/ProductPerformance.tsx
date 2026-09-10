import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProductPerformance as ProductMetric } from "@/types/analytics";
const money = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" });
export function ProductPerformance({ products }: { products: ProductMetric[] }) {
  return (
    <section className="admin-card overflow-hidden">
      <header className="flex items-center justify-between border-b px-4 py-3.5">
        <h2 className="text-[15px] font-semibold">Sales by product</h2>
        <Link
          href="/products"
          className="flex items-center gap-1 text-[12px] font-medium text-[var(--color-info)]"
        >
          View products
          <ArrowRight size={13} />
        </Link>
      </header>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-[12px]">
          <thead className="border-b bg-[var(--color-surface-subdued)] text-[var(--color-text-secondary)]">
            <tr>
              <th className="px-4 py-2 font-medium">Product</th>
              <th className="px-3 py-2 text-right font-medium">Units sold</th>
              <th className="px-3 py-2 text-right font-medium">Revenue</th>
              <th className="px-3 py-2 text-right font-medium">Orders</th>
              <th className="px-4 py-2 text-right font-medium">% of sales</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.slice(0, 6).map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2.5 font-medium">{product.name}</td>
                <td className="px-3 py-2.5 text-right">{product.unitsSold}</td>
                <td className="px-3 py-2.5 text-right font-medium">
                  {money.format(product.revenue)}
                </td>
                <td className="px-3 py-2.5 text-right">{product.orders}</td>
                <td className="px-4 py-2.5 text-right">{product.salesShare.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

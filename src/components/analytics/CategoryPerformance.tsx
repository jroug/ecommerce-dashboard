import type { CategoryPerformance as CategoryMetric } from "@/types/analytics";
const money = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" });
export function CategoryPerformance({ categories }: { categories: CategoryMetric[] }) {
  return (
    <section className="admin-card">
      <header className="border-b px-4 py-3.5">
        <h2 className="text-[15px] font-semibold">Sales by category</h2>
      </header>
      <div className="space-y-4 p-4">
        {categories.slice(0, 5).map((category) => (
          <div key={category.name}>
            <div className="flex items-end justify-between gap-3 text-[12px]">
              <div>
                <p className="font-medium">{category.name}</p>
                <p className="text-[11px] text-[var(--color-text-muted)]">
                  {category.unitsSold} units
                </p>
              </div>
              <p className="font-semibold">
                {money.format(category.revenue)}{" "}
                <span className="ml-1 font-normal text-[var(--color-text-muted)]">
                  {category.salesShare.toFixed(1)}%
                </span>
              </p>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--color-surface-hover)]">
              <div
                className="h-full rounded-full bg-[#687a70]"
                style={{ width: `${category.salesShare}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

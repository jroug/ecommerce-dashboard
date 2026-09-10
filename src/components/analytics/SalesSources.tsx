import type { SalesSourceAnalytics } from "@/types/analytics";
const money = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
export function SalesSources({ sources }: { sources: SalesSourceAnalytics[] }) {
  return (
    <section className="admin-card">
      <header className="border-b px-4 py-3.5">
        <h2 className="text-[15px] font-semibold">Sales sources</h2>
        <p className="text-[11px] text-[var(--color-text-muted)]">Mock attribution data</p>
      </header>
      <div className="divide-y">
        {sources.map((source) => (
          <div
            className="grid grid-cols-[1fr_60px_90px_45px] gap-2 px-4 py-2.5 text-[12px]"
            key={source.name}
          >
            <span className="font-medium">{source.name}</span>
            <span className="text-right text-[var(--color-text-muted)]">{source.orders}</span>
            <span className="text-right font-medium">{money.format(source.revenue)}</span>
            <span className="text-right text-[var(--color-text-muted)]">{source.percentage}%</span>
          </div>
        ))}
      </div>
    </section>
  );
}

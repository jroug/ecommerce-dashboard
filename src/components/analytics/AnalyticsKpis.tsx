import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { AnalyticsKpi } from "@/types/analytics";
export function AnalyticsKpis({ items, compare }: { items: AnalyticsKpi[]; compare: boolean }) {
  return (
    <section
      className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6"
      aria-label="Analytics summary"
    >
      {items.map((item) => (
        <article className="admin-card p-3.5" key={item.label}>
          <p className="text-[11px] font-medium text-[var(--color-text-secondary)]">{item.label}</p>
          <p className="mt-2 text-[19px] font-semibold tracking-[-.02em] tabular-nums">
            {item.value}
          </p>
          {compare && (
            <p
              className={`mt-1 flex items-center gap-0.5 text-[11px] font-semibold ${item.positive ? "text-[var(--color-success)]" : "text-[var(--color-error)]"}`}
            >
              {item.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{" "}
              {Math.abs(item.change)}%{" "}
              <span className="ml-0.5 font-normal text-[var(--color-text-muted)]">vs previous</span>
            </p>
          )}
        </article>
      ))}
    </section>
  );
}

import { CalendarDays } from "lucide-react";
import { analyticsRangeLabels } from "@/data/analytics";
import type { AnalyticsRange } from "@/types/analytics";
export function AnalyticsHeader({
  range,
  compare,
  onRangeChange,
  onCompareChange,
}: {
  range: AnalyticsRange;
  compare: boolean;
  onRangeChange: (range: AnalyticsRange) => void;
  onCompareChange: (value: boolean) => void;
}) {
  return (
    <header className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
      <div>
        <h1 className="text-[22px] font-semibold leading-7 tracking-[-.02em]">Analytics</h1>
        <p className="mt-0.5 text-[13px] text-[var(--color-text-secondary)]">
          Understand store performance and customer behavior.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <label className="admin-control flex h-8 items-center gap-2 px-2.5">
          <CalendarDays size={14} className="text-[var(--color-text-muted)]" />
          <span className="sr-only">Date range</span>
          <select
            value={range}
            onChange={(event) => onRangeChange(event.target.value as AnalyticsRange)}
            className="cursor-pointer bg-transparent text-[12px] font-medium outline-none"
          >
            {Object.entries(analyticsRangeLabels).map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="admin-control flex h-8 items-center gap-2 px-2.5 text-[12px] font-medium">
          <input
            type="checkbox"
            checked={compare}
            onChange={(event) => onCompareChange(event.target.checked)}
            className="size-3.5 accent-[#303030]"
          />
          Compare to previous period
        </label>
      </div>
    </header>
  );
}

import { ArrowDownRight, ArrowUpRight, CircleDollarSign, PackageCheck, ReceiptText, Users } from "lucide-react";
import type { Stat } from "@/types/dashboard";

const icons = { revenue: CircleDollarSign, orders: ReceiptText, "average-order-value": PackageCheck, customers: Users };
export function StatCard({ stat }: { stat: Stat }) {
  const positive = stat.direction === "up"; const Icon = icons[stat.id]; const Trend = positive ? ArrowUpRight : ArrowDownRight;
  return <article className="admin-card p-4">
    <div className="flex items-center justify-between"><p className="text-[13px] font-medium text-[var(--color-text-secondary)]">{stat.label}</p><span className="rounded-[var(--radius-sm)] bg-[var(--color-surface-subdued)] p-1.5 text-[var(--color-text-secondary)]"><Icon aria-hidden="true" size={15}/></span></div>
    <p className="mt-3 text-[22px] font-semibold leading-7 tracking-[-.025em] text-[var(--color-text)]">{stat.value}</p>
    <div className="mt-1.5 flex items-center gap-1 text-[12px]"><span className={`inline-flex items-center font-semibold ${positive ? "text-[var(--color-success)]" : "text-[var(--color-error)]"}`}><Trend aria-hidden="true" size={13}/>{stat.change}%</span><span className="text-[var(--color-text-muted)]">vs previous period</span></div>
  </article>;
}

export function StatCardSkeleton() { return <div className="admin-card p-4" aria-hidden="true"><div className="skeleton h-3.5 w-24 rounded"/><div className="skeleton mt-5 h-7 w-32 rounded"/><div className="skeleton mt-2 h-3 w-40 rounded"/></div>; }

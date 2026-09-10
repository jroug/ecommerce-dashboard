import Link from "next/link";
import { AlertTriangle, ArrowRight, PackageX } from "lucide-react";
import type { InventorySummary } from "@/types/dashboard";
import { Panel } from "./Panel";
export function InventoryAlerts({ summary }: { summary: InventorySummary }) {
  return (
    <Panel title="Inventory alerts" description="Products that need your attention">
      <div className="grid gap-2 p-4 sm:grid-cols-2 sm:px-5">
        <div className="flex items-center gap-3 rounded-[var(--radius-md)] bg-[var(--color-warning-bg)] p-3">
          <AlertTriangle className="text-[var(--color-warning)]" size={17} />
          <div>
            <p className="text-[18px] font-semibold leading-5 text-[var(--color-text)]">
              {summary.lowStock}
            </p>
            <p className="text-[12px] text-[var(--color-warning)]">Low stock products</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-[var(--radius-md)] bg-[var(--color-error-bg)] p-3">
          <PackageX className="text-[var(--color-error)]" size={17} />
          <div>
            <p className="text-[18px] font-semibold leading-5 text-[var(--color-text)]">
              {summary.outOfStock}
            </p>
            <p className="text-[12px] text-[var(--color-error)]">Out of stock</p>
          </div>
        </div>
      </div>
      <div className="border-t px-4 py-2.5 sm:px-5">
        <Link
          href="/products?stock=low"
          className="inline-flex items-center gap-1 text-[12px] font-medium text-[var(--color-text)] hover:underline"
        >
          View inventory <ArrowRight size={13} />
        </Link>
      </div>
    </Panel>
  );
}

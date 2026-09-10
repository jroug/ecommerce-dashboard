import { PackageSearch, SearchX } from "lucide-react";

export function EmptyOrdersState() {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
      <span className="mb-3 flex size-11 items-center justify-center rounded-full bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]">
        <PackageSearch size={21} />
      </span>
      <h2 className="text-[15px] font-semibold">Your orders will appear here</h2>
      <p className="mt-1 max-w-sm text-[13px] text-[var(--color-text-secondary)]">
        Once a customer places an order, you&apos;ll be able to manage it from this page.
      </p>
    </div>
  );
}

export function NoOrderResults({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
      <span className="mb-3 flex size-11 items-center justify-center rounded-full bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]">
        <SearchX size={21} />
      </span>
      <h2 className="text-[15px] font-semibold">No orders found</h2>
      <p className="mt-1 max-w-sm text-[13px] text-[var(--color-text-secondary)]">
        Try changing your search or filter selection.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="admin-control mt-4 px-3 text-[12px] font-semibold"
      >
        Clear all filters
      </button>
    </div>
  );
}

export function OrdersTableSkeleton() {
  return (
    <div className="admin-card overflow-hidden" aria-hidden="true">
      <div className="skeleton m-3 h-8 rounded-[var(--radius-md)]" />
      <div className="border-t">
        {Array.from({ length: 7 }, (_, index) => (
          <div
            className="grid grid-cols-[32px_80px_1fr_100px_100px] gap-4 border-b px-4 py-3"
            key={index}
          >
            <span className="skeleton h-4 rounded" />
            <span className="skeleton h-4 rounded" />
            <span className="skeleton h-4 rounded" />
            <span className="skeleton h-4 rounded" />
            <span className="skeleton h-4 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

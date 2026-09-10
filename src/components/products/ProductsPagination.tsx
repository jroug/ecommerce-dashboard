import { ChevronLeft, ChevronRight } from "lucide-react";
export function ProductsPagination({
  page,
  totalPages,
  totalItems,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-between border-t px-4 py-3 text-[12px] text-[var(--color-text-secondary)]">
      <span>
        {totalItems} {totalItems === 1 ? "product" : "products"}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Previous page"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="admin-control flex size-8 items-center justify-center disabled:cursor-not-allowed disabled:opacity-45"
        >
          <ChevronLeft size={15} />
        </button>
        <span className="min-w-16 text-center font-medium text-[var(--color-text)]">
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          aria-label="Next page"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="admin-control flex size-8 items-center justify-center disabled:cursor-not-allowed disabled:opacity-45"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

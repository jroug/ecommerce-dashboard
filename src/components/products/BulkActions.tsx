import { Archive, ChevronDown, Download, Trash2 } from "lucide-react";
export function BulkActions({ count }: { count: number }) {
  return (
    <div
      className="flex min-h-11 items-center gap-2 overflow-x-auto border-b bg-[#f3f3f3] px-3"
      aria-live="polite"
    >
      <span className="mr-1 whitespace-nowrap text-[12px] font-semibold">{count} selected</span>
      <button
        type="button"
        className="admin-control flex h-8 shrink-0 items-center gap-1.5 px-2.5 text-[12px] font-medium"
      >
        Change status
        <ChevronDown size={13} />
      </button>
      <button
        type="button"
        className="admin-control flex h-8 shrink-0 items-center gap-1.5 px-2.5 text-[12px] font-medium"
      >
        <Archive size={14} />
        Archive
      </button>
      <button
        type="button"
        className="admin-control flex h-8 shrink-0 items-center gap-1.5 px-2.5 text-[12px] font-medium text-[var(--color-error)]"
      >
        <Trash2 size={14} />
        Delete
      </button>
      <button
        type="button"
        className="admin-control flex h-8 shrink-0 items-center gap-1.5 px-2.5 text-[12px] font-medium"
      >
        <Download size={14} />
        Export
      </button>
    </div>
  );
}

import type { ReactNode } from "react";

interface PanelProps { title: string; description?: string; action?: ReactNode; children: ReactNode; className?: string; }
export function Panel({ title, description, action, children, className = "" }: PanelProps) {
  return <section className={`admin-card ${className}`}>
    <header className="flex items-start justify-between gap-4 px-4 pt-4 sm:px-5 sm:pt-5">
      <div><h2 className="text-[15px] font-semibold leading-5 text-[var(--color-text)]">{title}</h2>{description && <p className="mt-0.5 text-[12px] text-[var(--color-text-secondary)]">{description}</p>}</div>
      {action}
    </header>
    {children}
  </section>;
}

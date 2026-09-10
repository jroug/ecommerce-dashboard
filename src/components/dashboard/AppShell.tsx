import Link from "next/link";
import {
  BarChart3,
  Bell,
  ChevronDown,
  CircleHelp,
  Gauge,
  Menu,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Store,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";

const primaryNav = [
  { label: "Home", href: "/dashboard", icon: Gauge, section: "dashboard" },
  { label: "Orders", href: "/orders", icon: ShoppingCart, section: "orders" },
  { label: "Products", href: "/products", icon: Package, section: "products" },
  { label: "Customers", href: "/customers", icon: Users, section: "customers" },
  { label: "Analytics", href: "/analytics", icon: BarChart3, section: "analytics" },
];

export function AppShell({
  children,
  activeSection = "dashboard",
  mobileTitle = "Dashboard",
}: {
  children: ReactNode;
  activeSection?: string;
  mobileTitle?: string;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] pt-14 lg:grid lg:grid-cols-[220px_1fr]">
      <header className="fixed inset-x-0 top-0 z-30 flex h-14 items-center bg-[var(--color-topbar)] px-3 text-white">
        <Link
          href="/dashboard"
          className="flex w-auto shrink-0 items-center gap-2 px-1 font-semibold lg:w-[207px]"
        >
          <span className="flex size-8 items-center justify-center rounded-[var(--radius-md)] bg-[#36a76c]">
            <Store size={17} strokeWidth={2.2} />
          </span>
          <span className="hidden text-[14px] tracking-[-.01em] sm:block">Northstar</span>
        </Link>
        <button
          type="button"
          className="mx-auto flex h-9 w-full max-w-[620px] items-center gap-2 rounded-[var(--radius-md)] border border-white/15 bg-white/10 px-3 text-left text-[13px] text-white/65 transition hover:bg-white/15"
          aria-label="Search"
        >
          <Search size={17} />
          <span className="truncate">Search</span>
          <kbd className="ml-auto rounded-[4px] bg-white/10 px-1.5 py-0.5 text-[11px] text-white/55">
            ⌘ K
          </kbd>
        </button>
        <div className="ml-3 flex shrink-0 items-center gap-1">
          <button
            type="button"
            aria-label="Help"
            className="hidden rounded-[var(--radius-md)] p-2 text-white/75 hover:bg-white/10 sm:block"
          >
            <CircleHelp size={18} />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-[var(--radius-md)] p-2 text-white/75 hover:bg-white/10"
          >
            <Bell size={18} />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#f87171] ring-2 ring-[var(--color-topbar)]" />
          </button>
          <button
            type="button"
            className="ml-1 flex items-center gap-2 rounded-[var(--radius-md)] bg-white/10 p-1 pr-2 text-left hover:bg-white/15"
            aria-label="Account menu"
          >
            <span className="flex size-7 items-center justify-center rounded-[var(--radius-sm)] bg-[#8b5cf6] text-[11px] font-semibold">
              JD
            </span>
            <span className="hidden max-w-32 truncate text-[12px] font-medium md:block">
              northstar-store
            </span>
            <ChevronDown size={13} className="hidden text-white/60 md:block" />
          </button>
        </div>
      </header>

      <aside className="fixed inset-y-0 left-0 top-14 z-20 hidden w-[220px] border-r bg-[#ebebeb] lg:flex lg:flex-col">
        <nav aria-label="Primary navigation" className="flex-1 space-y-0.5 px-2 py-3">
          {primaryNav.map(({ label, href, icon: Icon, section }) => {
            const active = section === activeSection;
            return (
              <Link
                key={label}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex h-8 items-center gap-2.5 rounded-[var(--radius-md)] px-2.5 text-[13px] font-medium transition-colors ${active ? "bg-white text-[var(--color-text)] shadow-[0_1px_0_rgba(0,0,0,.05)]" : "text-[var(--color-text-secondary)] hover:bg-black/[.05] hover:text-[var(--color-text)]"}`}
              >
                <Icon size={16} strokeWidth={2} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t p-2">
          <Link
            href="/settings"
            className="flex h-8 items-center gap-2.5 rounded-[var(--radius-md)] px-2.5 text-[13px] font-medium text-[var(--color-text-secondary)] hover:bg-black/[.05]"
          >
            <Settings size={16} />
            Settings
          </Link>
        </div>
      </aside>

      <div className="min-w-0 lg:col-start-2">
        <div className="flex h-12 items-center border-b bg-[var(--color-surface)] px-4 lg:hidden">
          <button
            type="button"
            aria-label="Open navigation"
            className="admin-control flex size-8 items-center justify-center"
          >
            <Menu size={18} />
          </button>
          <span className="ml-3 text-[13px] font-semibold">{mobileTitle}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

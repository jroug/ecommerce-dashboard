import Link from "next/link";
import { Plus, ReceiptText, TicketPercent } from "lucide-react";
import { Panel } from "./Panel";
const actions = [{ label: "Add product", href: "/products/new", icon: Plus }, { label: "View orders", href: "/orders", icon: ReceiptText }, { label: "Add coupon", href: "/coupons/new", icon: TicketPercent }];
export function QuickActions() { return <Panel title="Quick actions"><nav aria-label="Quick actions" className="grid gap-2 p-4 pt-3 sm:grid-cols-3 sm:px-5">{actions.map(({ label, href, icon: Icon }, i) => <Link href={href} key={label} className={`flex min-h-8 items-center justify-center gap-1.5 rounded-[var(--radius-md)] px-3 py-1.5 text-[12px] font-semibold transition-colors ${i === 0 ? "bg-[var(--color-action)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.15),0_1px_0_rgba(0,0,0,.1)] hover:bg-[var(--color-action-hover)]" : "admin-control hover:bg-[var(--color-surface-hover)]"}`}><Icon size={14}/>{label}</Link>)}</nav></Panel>; }

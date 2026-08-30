import type { Customer } from "@/types/customer";

export function getCustomerType(customer:Customer){if(customer.ordersCount===0)return "no-orders" as const;if(Number(customer.totalSpent)>=500)return "high-value" as const;if(customer.ordersCount>1)return "returning" as const;return "new" as const}
const styles={"no-orders":"bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]","high-value":"bg-[#eee8f5] text-[#62477b]",returning:"bg-[var(--color-success-bg)] text-[var(--color-success)]",new:"bg-[#e6f0fa] text-[#285a85]"};
const labels={"no-orders":"No orders","high-value":"High value",returning:"Returning",new:"New"};
export function CustomerBadge({customer}:{customer:Customer}){const type=getCustomerType(customer);return <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${styles[type]}`}>{labels[type]}</span>}

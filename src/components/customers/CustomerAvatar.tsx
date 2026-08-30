import type { Customer } from "@/types/customer";

const colors=["bg-[#e5e7eb] text-[#374151]","bg-[#e1f0e8] text-[#245c43]","bg-[#eee8f5] text-[#5b4772]","bg-[#f5eadb] text-[#6b4b22]"];
export function CustomerAvatar({customer}:{customer:Customer}){const initials=`${customer.firstName[0]??""}${customer.lastName[0]??""}`;return <span aria-hidden="true" className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${colors[customer.id%colors.length]}`}>{initials}</span>}

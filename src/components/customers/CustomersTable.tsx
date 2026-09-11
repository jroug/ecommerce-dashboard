"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Customer } from "@/types/customer";
import { CustomerAvatar } from "./CustomerAvatar";
import { CustomerBadge } from "./CustomerBadge";
const money = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" });
const date = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });
function SelectAll({
  checked,
  indeterminate,
  onChange,
}: {
  checked: boolean;
  indeterminate: boolean;
  onChange: () => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  // The mixed checkbox state is a DOM property, not a declarative HTML attribute.
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return (
    <input
      ref={ref}
      type="checkbox"
      aria-label="Select all visible customers"
      checked={checked}
      onChange={onChange}
      className="size-4 cursor-pointer accent-[#303030]"
    />
  );
}
export function CustomersTable({
  customers,
  selected,
  onSelect,
  onSelectAll,
}: {
  customers: Customer[];
  selected: Set<number>;
  onSelect: (id: number) => void;
  onSelectAll: () => void;
}) {
  const selectedVisible = customers.filter((item) => selected.has(item.id)).length;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[940px] border-collapse text-left text-[13px]">
        <caption className="sr-only">Store customers</caption>
        <thead className="border-b bg-[var(--color-surface-subdued)] text-[12px] text-[var(--color-text-secondary)]">
          <tr>
            <th className="w-11 px-4 py-2">
              <SelectAll
                checked={selectedVisible === customers.length && customers.length > 0}
                indeterminate={selectedVisible > 0 && selectedVisible < customers.length}
                onChange={onSelectAll}
              />
            </th>
            <th className="px-2 py-2 font-medium">Customer</th>
            <th className="px-3 py-2 font-medium">Email</th>
            <th className="px-3 py-2 font-medium">Location</th>
            <th className="px-3 py-2 text-right font-medium">Orders</th>
            <th className="px-3 py-2 text-right font-medium">Total spent</th>
            <th className="px-4 py-2 text-right font-medium">Last order</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className={`group hover:bg-[var(--color-surface-subdued)] ${selected.has(customer.id) ? "bg-[#f1f5f3]" : "bg-[var(--color-surface)]"}`}
            >
              <td className="px-4 py-2.5">
                <input
                  type="checkbox"
                  aria-label={`Select ${customer.firstName} ${customer.lastName}`}
                  checked={selected.has(customer.id)}
                  onChange={() => onSelect(customer.id)}
                  className="size-4 cursor-pointer accent-[#303030]"
                />
              </td>
              <td className="px-2 py-2.5">
                <Link href={`/customers/${customer.id}`} className="flex items-center gap-2.5">
                  <CustomerAvatar customer={customer} />
                  <span>
                    <span className="block font-semibold underline-offset-2 group-hover:underline">
                      {customer.firstName} {customer.lastName}
                    </span>
                    <CustomerBadge customer={customer} />
                  </span>
                </Link>
              </td>
              <td className="px-3 py-2.5 text-[var(--color-text-secondary)]">{customer.email}</td>
              <td className="px-3 py-2.5 text-[var(--color-text-secondary)]">
                {customer.billing.city}, {customer.billing.country}
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums">{customer.ordersCount}</td>
              <td className="px-3 py-2.5 text-right font-semibold tabular-nums">
                {money.format(Number(customer.totalSpent))}
              </td>
              <td className="whitespace-nowrap px-4 py-2.5 text-right text-[var(--color-text-secondary)]">
                {customer.lastOrderDate ? date.format(new Date(customer.lastOrderDate)) : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

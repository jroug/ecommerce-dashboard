"use client";
import Link from "next/link";
import { Download, Plus, Upload } from "lucide-react";
import { useMemo, useState } from "react";
import type {
  Customer,
  CustomerJoinedFilter,
  CustomerOrdersFilter,
  CustomerSort,
  CustomerSpentFilter,
  CustomerTypeFilter,
  CustomerView,
} from "@/types/customer";
import { CustomerMetrics } from "./CustomerMetrics";
import { CustomersBulkActions } from "./CustomersBulkActions";
import { CustomersPagination } from "./CustomersPagination";
import { EmptyCustomersState, NoCustomerResults } from "./CustomersStates";
import { CustomersTable } from "./CustomersTable";
import { CustomersToolbar } from "./CustomersToolbar";

const PAGE_SIZE = 7;
const tabs: Array<{ label: string; value: CustomerView }> = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Returning", value: "returning" },
  { label: "High value", value: "high-value" },
  { label: "No orders", value: "no-orders" },
];
// Filter segments can overlap; "new" uses the fixed demo month, not the badge rules.
const isType = (customer: Customer, type: CustomerTypeFilter | CustomerView) =>
  type === "all" ||
  (type === "new" && new Date(customer.dateCreated) >= new Date("2026-08-01")) ||
  (type === "returning" && customer.ordersCount > 1) ||
  (type === "high-value" && Number(customer.totalSpent) >= 500) ||
  (type === "no-orders" && customer.ordersCount === 0);

export function CustomersPage({ initialCustomers }: { initialCustomers: Customer[] }) {
  // Bulk edits affect this mounted view only; the source fixtures are not persisted.
  const [records, setRecords] = useState(initialCustomers);
  const [view, setView] = useState<CustomerView>("all");
  const [query, setQuery] = useState("");
  const [type, setType] = useState<CustomerTypeFilter>("all");
  const [orders, setOrders] = useState<CustomerOrdersFilter>("all");
  const [spent, setSpent] = useState<CustomerSpentFilter>("all");
  const [location, setLocation] = useState("all");
  const [joined, setJoined] = useState<CustomerJoinedFilter>("all");
  const [sort, setSort] = useState<CustomerSort>("newest");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const locations = useMemo(
    () => [...new Set(records.map((item) => item.billing.country))].sort(),
    [records],
  );
  const filteredCustomers = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return records
      .filter((customer) => {
        const amount = Number(customer.totalSpent);
        const orderMatch =
          orders === "all" ||
          (orders === "none" && customer.ordersCount === 0) ||
          (orders === "one" && customer.ordersCount === 1) ||
          (orders === "repeat" && customer.ordersCount >= 2) ||
          (orders === "five-plus" && customer.ordersCount >= 5);
        const spentMatch =
          spent === "all" ||
          (spent === "zero" && amount === 0) ||
          (spent === "under-100" && amount > 0 && amount < 100) ||
          (spent === "100-500" && amount >= 100 && amount <= 500) ||
          (spent === "over-500" && amount > 500);
        const joinedAt = new Date(customer.dateCreated);
        // Relative ranges are anchored to the August 2026 demo snapshot.
        const joinedMatch =
          joined === "all" ||
          (joined === "7-days" && joinedAt >= new Date("2026-08-23")) ||
          (joined === "30-days" && joinedAt >= new Date("2026-07-31")) ||
          (joined === "this-year" && joinedAt >= new Date("2026-01-01"));
        return (
          isType(customer, view) &&
          isType(customer, type) &&
          (!normalized ||
            `${customer.firstName} ${customer.lastName} ${customer.email} ${customer.phone}`
              .toLowerCase()
              .includes(normalized)) &&
          orderMatch &&
          spentMatch &&
          (location === "all" || customer.billing.country === location) &&
          joinedMatch
        );
      })
      .sort((a, b) => {
        const aName = `${a.firstName} ${a.lastName}`,
          bName = `${b.firstName} ${b.lastName}`;
        if (sort === "name-asc") return aName.localeCompare(bName);
        if (sort === "name-desc") return bName.localeCompare(aName);
        if (sort === "orders-high") return b.ordersCount - a.ordersCount;
        if (sort === "spent-high") return Number(b.totalSpent) - Number(a.totalSpent);
        if (sort === "spent-low") return Number(a.totalSpent) - Number(b.totalSpent);
        const difference = new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
        return sort === "newest" ? difference : -difference;
      });
  }, [joined, location, orders, query, records, sort, spent, type, view]);
  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / PAGE_SIZE));
  // Local record changes can shrink the result set without changing the requested page.
  const safePage = Math.min(page, totalPages);
  const visibleCustomers = filteredCustomers.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );
  const hasFilters = Boolean(
    view !== "all" ||
    query ||
    type !== "all" ||
    orders !== "all" ||
    spent !== "all" ||
    location !== "all" ||
    joined !== "all" ||
    sort !== "newest",
  );
  // A narrower result set may no longer contain the current page.
  const updateFilter =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      setter(value);
      setPage(1);
    };
  const clearFilters = () => {
    setView("all");
    setQuery("");
    setType("all");
    setOrders("all");
    setSpent("all");
    setLocation("all");
    setJoined("all");
    setSort("newest");
    setPage(1);
  };
  const selectCustomer = (id: number) =>
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  // Toggle only this page, preserving selections hidden by pagination or filters.
  const selectAllVisible = () =>
    setSelected((current) => {
      const next = new Set(current);
      const allSelected = visibleCustomers.every((item) => next.has(item.id));
      visibleCustomers.forEach((item) => (allSelected ? next.delete(item.id) : next.add(item.id)));
      return next;
    });
  // The demo bulk action adds VIP once; removal clears every tag on selected records.
  const updateSelected = (action: "add" | "remove") =>
    setRecords((current) =>
      current.map((item) =>
        selected.has(item.id)
          ? { ...item, tags: action === "add" ? [...new Set([...item.tags, "vip"])] : [] }
          : item,
      ),
    );
  const deleteSelected = () => {
    setRecords((current) => current.filter((item) => !selected.has(item.id)));
    setSelected(new Set());
    setPage(1);
  };
  return (
    <main className="mx-auto max-w-[1240px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-semibold leading-7 tracking-[-.02em]">Customers</h1>
          <p className="mt-0.5 text-[13px] text-[var(--color-text-secondary)]">
            Manage customer relationships and order activity.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="admin-control hidden h-8 items-center gap-1.5 px-3 text-[12px] font-semibold md:flex"
          >
            <Download size={14} />
            Export
          </button>
          <button
            type="button"
            className="admin-control hidden h-8 items-center gap-1.5 px-3 text-[12px] font-semibold sm:flex"
          >
            <Upload size={14} />
            Import
          </button>
          <Link
            href="/customers/new"
            className="flex h-8 items-center gap-1.5 rounded-[var(--radius-md)] bg-[var(--color-action)] px-3 text-[12px] font-semibold text-white hover:bg-[var(--color-action-hover)]"
          >
            <Plus size={14} />
            Add customer
          </Link>
        </div>
      </div>
      <CustomerMetrics customers={records} />
      <section className="admin-card overflow-hidden" aria-label="Customers list">
        <nav aria-label="Customer views" className="overflow-x-auto border-b px-2">
          <div className="flex min-w-max gap-0.5">
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab.value}
                onClick={() => {
                  setView(tab.value);
                  setPage(1);
                }}
                aria-current={view === tab.value ? "page" : undefined}
                className={`relative px-3 py-2.5 text-[13px] font-medium ${view === tab.value ? "text-[var(--color-text)] after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-[var(--color-text)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>
        <CustomersToolbar
          query={query}
          type={type}
          orders={orders}
          spent={spent}
          location={location}
          joined={joined}
          sort={sort}
          locations={locations}
          hasFilters={hasFilters}
          onQueryChange={updateFilter(setQuery)}
          onTypeChange={updateFilter(setType)}
          onOrdersChange={updateFilter(setOrders)}
          onSpentChange={updateFilter(setSpent)}
          onLocationChange={updateFilter(setLocation)}
          onJoinedChange={updateFilter(setJoined)}
          onSortChange={updateFilter(setSort)}
          onClear={clearFilters}
        />
        {selected.size > 0 && (
          <CustomersBulkActions
            count={selected.size}
            onAddTag={() => updateSelected("add")}
            onRemoveTags={() => updateSelected("remove")}
            onDelete={deleteSelected}
          />
        )}{" "}
        {records.length === 0 ? (
          <EmptyCustomersState />
        ) : filteredCustomers.length === 0 ? (
          <NoCustomerResults onClear={clearFilters} query={query} />
        ) : (
          <>
            <CustomersTable
              customers={visibleCustomers}
              selected={selected}
              onSelect={selectCustomer}
              onSelectAll={selectAllVisible}
            />
            <CustomersPagination
              page={safePage}
              totalPages={totalPages}
              totalItems={filteredCustomers.length}
              onPageChange={setPage}
            />
          </>
        )}
      </section>
    </main>
  );
}

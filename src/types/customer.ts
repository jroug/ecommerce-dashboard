export type CustomerView = "all" | "new" | "returning" | "high-value" | "no-orders";
export type CustomerTypeFilter = "all" | Exclude<CustomerView, "all">;
export type CustomerOrdersFilter = "all" | "none" | "one" | "repeat" | "five-plus";
export type CustomerSpentFilter = "all" | "zero" | "under-100" | "100-500" | "over-500";
export type CustomerJoinedFilter = "all" | "7-days" | "30-days" | "this-year";
export type CustomerSort = "newest" | "oldest" | "orders-high" | "spent-high" | "spent-low" | "name-asc" | "name-desc";

export interface CustomerAddress {
  address1: string;
  address2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  countryCode: string;
}

export interface CustomerNote { id: number; text: string; date: string; author: string; }
export interface CustomerTimelineEvent { id: number; title: string; description?: string; date: string; }

/** Customer fields are presentation-safe and map cleanly to a future WooCommerce adapter. */
export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string | null;
  dateCreated: string;
  billing: CustomerAddress;
  shipping: CustomerAddress;
  ordersCount: number;
  totalSpent: string;
  averageOrderValue: string;
  lastOrderDate: string | null;
  tags: string[];
  currency: "EUR";
}

export interface CustomerDetails extends Customer {
  firstOrderDate: string | null;
  refundsCount: number;
  favoriteCategory: string;
  notes: CustomerNote[];
  timeline: CustomerTimelineEvent[];
}

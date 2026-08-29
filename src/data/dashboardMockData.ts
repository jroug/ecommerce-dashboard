import type { DashboardPeriod, DateRange, InventorySummary, OrderStatusSummary, RecentOrder, TopProduct } from "@/types/dashboard";

export const dashboardPeriods: Record<DateRange, DashboardPeriod> = {
  "7d": { stats: [
    { id: "revenue", label: "Revenue", value: "$24,780", change: 12.5, direction: "up" }, { id: "orders", label: "Orders", value: "382", change: 8.2, direction: "up" },
    { id: "average-order-value", label: "Average order value", value: "$64.87", change: 3.8, direction: "up" }, { id: "customers", label: "Customers", value: "1,429", change: 2.4, direction: "down" },
  ], revenue: [{ label: "Mon", revenue: 2800 }, { label: "Tue", revenue: 3400 }, { label: "Wed", revenue: 3100 }, { label: "Thu", revenue: 4200 }, { label: "Fri", revenue: 3900 }, { label: "Sat", revenue: 4580 }, { label: "Sun", revenue: 2800 }] },
  "30d": { stats: [
    { id: "revenue", label: "Revenue", value: "$96,420", change: 16.8, direction: "up" }, { id: "orders", label: "Orders", value: "1,486", change: 11.4, direction: "up" },
    { id: "average-order-value", label: "Average order value", value: "$64.89", change: 4.9, direction: "up" }, { id: "customers", label: "Customers", value: "4,208", change: 7.1, direction: "up" },
  ], revenue: [{ label: "Aug 1", revenue: 11800 }, { label: "Aug 5", revenue: 13200 }, { label: "Aug 9", revenue: 11900 }, { label: "Aug 13", revenue: 15700 }, { label: "Aug 17", revenue: 13800 }, { label: "Aug 21", revenue: 16820 }, { label: "Aug 25", revenue: 13200 }] },
  "12m": { stats: [
    { id: "revenue", label: "Revenue", value: "$1.18M", change: 21.6, direction: "up" }, { id: "orders", label: "Orders", value: "18,204", change: 18.3, direction: "up" },
    { id: "average-order-value", label: "Average order value", value: "$64.82", change: 1.9, direction: "up" }, { id: "customers", label: "Customers", value: "38,910", change: 14.2, direction: "up" },
  ], revenue: [{ label: "Sep", revenue: 72000 }, { label: "Oct", revenue: 79000 }, { label: "Nov", revenue: 108000 }, { label: "Dec", revenue: 142000 }, { label: "Jan", revenue: 86000 }, { label: "Feb", revenue: 82000 }, { label: "Mar", revenue: 91000 }, { label: "Apr", revenue: 96000 }, { label: "May", revenue: 101000 }, { label: "Jun", revenue: 98000 }, { label: "Jul", revenue: 110000 }, { label: "Aug", revenue: 115000 }] },
};

export const orderStatuses: OrderStatusSummary[] = [
  { status: "processing", label: "Processing", count: 24 }, { status: "pending", label: "Pending payment", count: 11 }, { status: "completed", label: "Completed", count: 318 }, { status: "cancelled", label: "Cancelled", count: 18 }, { status: "refunded", label: "Refunded", count: 11 },
];
export const recentOrders: RecentOrder[] = [
  { id: "#NS-1048", customer: "Maya Patel", initials: "MP", date: "Aug 29, 2026", status: "processing", total: 184.5 }, { id: "#NS-1047", customer: "Theo Martin", initials: "TM", date: "Aug 29, 2026", status: "completed", total: 96 }, { id: "#NS-1046", customer: "Sofia Chen", initials: "SC", date: "Aug 28, 2026", status: "pending", total: 248.75 }, { id: "#NS-1045", customer: "Daniel Brooks", initials: "DB", date: "Aug 28, 2026", status: "refunded", total: 74.2 }, { id: "#NS-1044", customer: "Amara Okafor", initials: "AO", date: "Aug 27, 2026", status: "cancelled", total: 129 },
];
export const topProducts: TopProduct[] = [
  { id: "p1", name: "Canvas Weekender", category: "Bags", unitsSold: 184, revenue: 16560, color: "#cf7443" }, { id: "p2", name: "Essential Hoodie", category: "Apparel", unitsSold: 162, revenue: 11340, color: "#426b57" }, { id: "p3", name: "Everyday Sneakers", category: "Footwear", unitsSold: 118, revenue: 10620, color: "#637995" }, { id: "p4", name: "Ceramic Travel Mug", category: "Home", unitsSold: 221, revenue: 6630, color: "#a98451" }, { id: "p5", name: "Classic Cap", category: "Accessories", unitsSold: 145, revenue: 4350, color: "#736a8d" },
];
export const inventorySummary: InventorySummary = { lowStock: 12, outOfStock: 4 };

export type DateRange = "7d" | "30d" | "12m";
export type TrendDirection = "up" | "down";
export type OrderStatus = "processing" | "pending" | "completed" | "cancelled" | "refunded";
export interface Stat { id: "revenue" | "orders" | "average-order-value" | "customers"; label: string; value: string; change: number; direction: TrendDirection; }
export interface RevenuePoint { label: string; revenue: number; }
export interface DashboardPeriod { stats: Stat[]; revenue: RevenuePoint[]; }
export interface OrderStatusSummary { status: OrderStatus; label: string; count: number; }
export interface TopProduct { id: string; name: string; category: string; unitsSold: number; revenue: number; color: string; }
export interface InventorySummary { lowStock: number; outOfStock: number; }

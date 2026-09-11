import type { AnalyticsRange, AnalyticsRangeData, AnalyticsTimePoint } from "@/types/analytics";
// Deterministic variation keeps demo charts stable without random values or live traffic.
const points = (labels: string[], base: number): AnalyticsTimePoint[] =>
  labels.map((label, index) => {
    const revenue = Math.round(base * (0.78 + ((index * 7) % 5) * 0.11));
    const orders = Math.max(1, Math.round(revenue / 68));
    return {
      label,
      revenue,
      previousRevenue: Math.round(revenue * (0.84 + ((index + 2) % 3) * 0.03)),
      orders,
      aov: Math.round(revenue / orders),
    };
  });
const sources = (scale: number) => [
  {
    name: "Direct",
    orders: Math.round(82 * scale),
    revenue: Math.round(5540 * scale),
    percentage: 31,
  },
  {
    name: "Organic search",
    orders: Math.round(71 * scale),
    revenue: Math.round(4820 * scale),
    percentage: 27,
  },
  {
    name: "Social",
    orders: Math.round(54 * scale),
    revenue: Math.round(3510 * scale),
    percentage: 20,
  },
  {
    name: "Email",
    orders: Math.round(43 * scale),
    revenue: Math.round(2920 * scale),
    percentage: 16,
  },
  {
    name: "Referral",
    orders: Math.round(18 * scale),
    revenue: Math.round(1120 * scale),
    percentage: 6,
  },
];
const config = (series: AnalyticsTimePoint[], scale: number): AnalyticsRangeData => ({
  series,
  comparisonChanges: [12.4, 8.2, 3.8, 6.1, 2.3, -1.4],
  conversion: {
    sessions: Math.round(12400 * scale),
    addToCart: Math.round(1820 * scale),
    checkout: Math.round(980 * scale),
    purchases: Math.round(284 * scale),
    conversionRate: 2.29,
  },
  sources: sources(scale),
});
export const analyticsRanges: Record<AnalyticsRange, AnalyticsRangeData> = {
  today: config(points(["8am", "10am", "12pm", "2pm", "4pm", "6pm"], 180), 0.04),
  "7d": config(points(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], 2500), 0.24),
  "30d": config(
    points(["Aug 1", "Aug 5", "Aug 9", "Aug 13", "Aug 17", "Aug 21", "Aug 25", "Aug 29"], 8600),
    1,
  ),
  "90d": config(
    points(["Jun 1", "Jun 15", "Jul 1", "Jul 15", "Aug 1", "Aug 15", "Aug 29"], 24500),
    3,
  ),
  year: config(points(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"], 68000), 8),
};
export const analyticsRangeLabels: Record<AnalyticsRange, string> = {
  today: "Today",
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
  year: "This year",
};

"use client";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { AnalyticsTimePoint } from "@/types/analytics";
export function OrdersChart({ data }: { data: AnalyticsTimePoint[] }) {
  return (
    <section className="admin-card min-w-0">
      <header className="border-b px-4 py-3.5">
        <h2 className="text-[15px] font-semibold">Orders over time</h2>
      </header>
      <div className="h-[220px] px-2 py-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: -22, right: 8 }}>
            <CartesianGrid vertical={false} stroke="#ededed" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: "#8a8a8a" }}
            />
            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: "#8a8a8a" }}
            />
            <Tooltip
              formatter={(value) => [value, "Orders"]}
              contentStyle={{ border: "1px solid #dedede", borderRadius: 8, fontSize: 12 }}
            />
            <Bar dataKey="orders" fill="#687a70" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

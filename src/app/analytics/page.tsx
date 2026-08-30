import { AnalyticsPage } from "@/components/analytics/AnalyticsPage";
import { AppShell } from "@/components/dashboard/AppShell";
import { customers } from "@/data/customers";
import { orders } from "@/data/orders";
import { products } from "@/data/products";
export default function AnalyticsRoute(){return <AppShell activeSection="analytics" mobileTitle="Analytics"><AnalyticsPage orders={orders} customers={customers} products={products}/></AppShell>}

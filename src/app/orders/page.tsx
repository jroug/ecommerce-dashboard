import { AppShell } from "@/components/dashboard/AppShell";
import { OrdersPage } from "@/components/orders/OrdersPage";
import { orders } from "@/data/orders";

export default function OrdersRoute() {
  return <AppShell activeSection="orders" mobileTitle="Orders"><OrdersPage initialOrders={orders}/></AppShell>;
}

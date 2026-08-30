import { AppShell } from "@/components/dashboard/AppShell";
import { OrderDetailsPage } from "@/components/orders/OrderDetailsPage";
import { OrderNotFound } from "@/components/orders/OrderNotFound";
import { getOrderDetails } from "@/data/orderDetails";
import { orders } from "@/data/orders";

export default async function OrderDetailsRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const baseOrder = orders.find((order) => String(order.id) === id);
  return <AppShell activeSection="orders" mobileTitle={baseOrder ? `Order #${baseOrder.number}` : "Order"}>{baseOrder ? <OrderDetailsPage order={getOrderDetails(baseOrder)}/> : <OrderNotFound/>}</AppShell>;
}

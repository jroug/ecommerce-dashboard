import { AppShell } from "@/components/dashboard/AppShell";
import { OrderDetailsSkeleton } from "@/components/orders/OrderDetailsSkeleton";
export default function OrderDetailsLoading(){return <AppShell activeSection="orders" mobileTitle="Order"><OrderDetailsSkeleton/><span className="sr-only">Loading order details</span></AppShell>}

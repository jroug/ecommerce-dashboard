import { AppShell } from "@/components/dashboard/AppShell";
import { CustomerDetailsSkeleton } from "@/components/customers/CustomerDetailsSkeleton";
export default function LoadingCustomer(){return <AppShell activeSection="customers" mobileTitle="Customer"><CustomerDetailsSkeleton/></AppShell>}

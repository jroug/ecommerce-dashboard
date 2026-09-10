import { AppShell } from "@/components/dashboard/AppShell";
import { CustomersPage } from "@/components/customers/CustomersPage";
import { customers } from "@/data/customers";
export default function CustomersRoute() {
  return (
    <AppShell activeSection="customers" mobileTitle="Customers">
      <CustomersPage initialCustomers={customers} />
    </AppShell>
  );
}

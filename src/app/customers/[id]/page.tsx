import { AppShell } from "@/components/dashboard/AppShell";
import { CustomerDetailsPage } from "@/components/customers/CustomerDetailsPage";
import { CustomerNotFound } from "@/components/customers/CustomerNotFound";
import { getCustomerDetails } from "@/data/customerDetails";
import { customers } from "@/data/customers";
import { orders } from "@/data/orders";
export default async function CustomerRoute({ params }: { params: Promise<{ id: string }> }) {
  // Next.js supplies route params asynchronously, even for this local fixture lookup.
  const { id } = await params;
  const customer = customers.find((item) => String(item.id) === id);
  const customerOrders = orders
    .filter((order) => order.customer.id === customer?.id)
    .sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
  return (
    <AppShell
      activeSection="customers"
      mobileTitle={customer ? `${customer.firstName} ${customer.lastName}` : "Customer"}
    >
      {customer ? (
        <CustomerDetailsPage
          initialCustomer={getCustomerDetails(customer, customerOrders)}
          orders={customerOrders}
        />
      ) : (
        <CustomerNotFound />
      )}
    </AppShell>
  );
}

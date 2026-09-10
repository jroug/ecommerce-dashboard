import type { Order, OrderAddress, OrderDetails, OrderStatus } from "@/types/order";

const productPresentation: Record<string, { sku: string; image: string; variation?: string }> = {
  "Linen Overshirt": {
    sku: "APP-LIN-OS-NAT-M",
    image: "/products/apparel.svg",
    variation: "Natural / M",
  },
  "Classic Cap": { sku: "ACC-CLS-CAP-BLK", image: "/products/accessory.svg", variation: "Black" },
  "Everyday Sneakers": {
    sku: "FTW-EVD-SNK-WHT-42",
    image: "/products/footwear.svg",
    variation: "White / EU 42",
  },
  "Canvas Weekender": {
    sku: "ACC-CAN-WKD-OLV",
    image: "/products/accessory.svg",
    variation: "Olive",
  },
  "Ceramic Travel Mug": { sku: "HOM-CER-MUG-SND", image: "/products/home.svg", variation: "Sand" },
  "Essential Hoodie": {
    sku: "APP-ESS-HOD-GRY-M",
    image: "/products/apparel.svg",
    variation: "Grey / M",
  },
};

const fallbackPresentation = (name: string) => ({
  sku: name.toUpperCase().replaceAll(" ", "-").slice(0, 18),
  image: "/products/apparel.svg",
});
const addressFor = (order: Order): OrderAddress => ({
  firstName: order.customer.firstName,
  lastName: order.customer.lastName,
  address1: order.id === 1048 ? "Leof. Kifisias 100" : "28 Ermou Street",
  city: "Athens",
  state: "Attica",
  postcode: order.id === 1048 ? "11526" : "10563",
  country: "Greece",
  email: order.customer.email,
  phone: "+30 694 555 0182",
});
const statusTitle: Record<OrderStatus, string> = {
  pending: "Order is awaiting payment",
  processing: "Order moved to Processing",
  "on-hold": "Order placed on hold",
  completed: "Order completed",
  cancelled: "Order cancelled",
  refunded: "Order refunded",
  failed: "Payment failed",
};

export function getOrderDetails(order: Order): OrderDetails {
  const shipping = addressFor(order);
  const paid = order.paymentStatus === "paid";
  const fulfilled = order.status === "completed";
  const shipped = order.status === "processing" && paid;
  const special = order.id === 1048;
  return {
    ...order,
    lineItems: order.lineItems.map((item) => {
      const presentation = productPresentation[item.name] ?? fallbackPresentation(item.name);
      return {
        ...item,
        ...presentation,
        unitPrice: (Number(item.total) / item.quantity).toFixed(2),
      };
    }),
    subtotal: special ? "119.00" : order.total,
    discountTotal: special ? "10.00" : "0.00",
    shippingTotal: special ? "5.00" : "0.00",
    taxTotal: special ? "15.00" : "0.00",
    amountPaid: paid ? order.total : "0.00",
    paymentMethodTitle:
      order.paymentMethod === "Card" ? "Credit card ending in 4242" : order.paymentMethod,
    transactionId: `pi_mock_${order.id}839`,
    datePaid: paid ? order.dateCreated : null,
    billing: shipping,
    shipping,
    billingSameAsShipping: true,
    shippingMethod: order.total === "320.00" ? "DHL Express" : "ACS Courier",
    fulfillmentStatus: fulfilled ? "fulfilled" : shipped ? "shipped" : "unfulfilled",
    trackingNumber: fulfilled || shipped ? `ACS${order.id}98271` : null,
    carrier: fulfilled || shipped ? "ACS Courier" : null,
    dateFulfilled:
      fulfilled || shipped
        ? new Date(new Date(order.dateCreated).getTime() + 86_400_000).toISOString()
        : null,
    customerPhone: shipping.phone ?? "",
    customerOrdersCount: special ? 12 : (order.customer.id % 8) + 2,
    customerTotalSpent: special
      ? "1482.00"
      : (Number(order.total) * ((order.customer.id % 5) + 2)).toFixed(2),
    customerNote: special ? "Please leave the parcel with reception if I am unavailable." : "",
    notes: special
      ? [
          {
            id: 1,
            author: "Jordan Davis",
            content: "Customer confirmed the delivery address by email.",
            date: "2026-08-29T12:18:00Z",
            customerVisible: false,
          },
        ]
      : [],
    timeline: [
      {
        id: 1,
        title: "Order placed",
        description: `Order #${order.number} was created through the online store.`,
        date: order.dateCreated,
      },
      ...(paid
        ? [
            {
              id: 2,
              title: "Payment confirmed",
              description: `${order.paymentMethod} payment was authorized.`,
              date: new Date(new Date(order.dateCreated).getTime() + 180_000).toISOString(),
            },
          ]
        : []),
      {
        id: 3,
        title: statusTitle[order.status],
        date: new Date(new Date(order.dateCreated).getTime() + 600_000).toISOString(),
      },
      ...(fulfilled || shipped
        ? [
            {
              id: 4,
              title: "Tracking number added",
              description: `Tracking ${`ACS${order.id}98271`} was added.`,
              date: new Date(new Date(order.dateCreated).getTime() + 86_400_000).toISOString(),
            },
          ]
        : []),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
  };
}

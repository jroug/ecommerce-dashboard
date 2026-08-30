import type { Customer,CustomerDetails } from "@/types/customer";
import type { Order } from "@/types/order";

export function getCustomerDetails(customer:Customer,customerOrders:Order[]):CustomerDetails{
  const sorted=[...customerOrders].sort((a,b)=>new Date(a.dateCreated).getTime()-new Date(b.dateCreated).getTime());
  const firstOrderDate=sorted[0]?.dateCreated??null;
  const latest=sorted.at(-1);
  return {...customer,firstOrderDate,refundsCount:customerOrders.filter((order)=>order.status==="refunded").length,favoriteCategory:customer.id===201?"Apparel":"Lifestyle",notes:customer.id===201?[{id:1,text:"Customer requested delivery after 18:00.",date:"2026-08-27T16:45:00Z",author:"Admin"},{id:2,text:"Prefers email updates for delivery changes.",date:"2026-06-18T10:40:00Z",author:"Jordan Davis"}]:[],timeline:[...(latest?[{id:1,title:`Order #${latest.number} placed`,description:`${latest.itemsCount} items · ${latest.currency} ${latest.total}`,date:latest.dateCreated}]:[]),...(customer.tags.includes("vip")?[{id:2,title:'Tag "VIP" added',description:"Customer qualified for the high-value segment.",date:"2026-06-19T09:20:00Z"}]:[]),{id:3,title:"Customer created",description:`${customer.firstName} joined the online store.`,date:customer.dateCreated}].sort((a,b)=>new Date(b.date).getTime()-new Date(a.date).getTime())};
}

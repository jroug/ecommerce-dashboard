import { AnalyticsSkeleton } from "@/components/analytics/AnalyticsStates";
import { AppShell } from "@/components/dashboard/AppShell";
export default function LoadingAnalytics(){return <AppShell activeSection="analytics" mobileTitle="Analytics"><AnalyticsSkeleton/></AppShell>}

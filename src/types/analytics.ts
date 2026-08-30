export type AnalyticsRange="today"|"7d"|"30d"|"90d"|"year";
export interface AnalyticsTimePoint{label:string;revenue:number;previousRevenue:number;orders:number;aov:number;}
export interface AnalyticsKpi{label:string;value:string;change:number;positive:boolean;}
export interface ProductPerformance{id:number;name:string;unitsSold:number;revenue:number;orders:number;salesShare:number;}
export interface CategoryPerformance{name:string;revenue:number;unitsSold:number;salesShare:number;}
export interface ConversionAnalytics{sessions:number;addToCart:number;checkout:number;purchases:number;conversionRate:number;}
export interface SalesSourceAnalytics{name:string;orders:number;revenue:number;percentage:number;}
export interface AnalyticsRangeData{series:AnalyticsTimePoint[];comparisonChanges:number[];conversion:ConversionAnalytics;sources:SalesSourceAnalytics[];}

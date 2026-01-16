// Web Vitals tracking for performance monitoring
import { onCLS, onFCP, onFID, onLCP, onTTFB } from "web-vitals";

export interface MetricData {
    name: string;
    value: number;
    delta: number;
    id: string;
    navigationType: string;
}

export const initWebVitals = () => {
    if (typeof window === "undefined") return;

    const handleMetric = (metric: MetricData) => {
        if (process.env.NODE_ENV === "development") {
            console.log(`Web Vitals - ${metric.name}: ${metric.value}ms`);
        }
    };

    onLCP(handleMetric as any);
    onFID(handleMetric as any);
    onCLS(handleMetric as any);
    onTTFB(handleMetric as any);
    onFCP(handleMetric as any);
};

export const getPerformanceMetrics = () => {
    if (typeof window === "undefined" || !window.performance) {
        return null;
    }

    const navigation = window.performance.getEntriesByType(
        "navigation"
    )[0] as PerformanceNavigationTiming;

    if (!navigation) return null;

    return {
        dns: navigation.domainLookupEnd - navigation.domainLookupStart,
        tcp: navigation.connectEnd - navigation.connectStart,
        ttfb: navigation.responseStart - navigation.requestStart,
        download: navigation.responseEnd - navigation.responseStart,
        domInteractive: navigation.domInteractive - navigation.fetchStart,
        domComplete: navigation.domComplete - navigation.fetchStart,
        loadComplete: navigation.loadEventEnd - navigation.fetchStart,
    };
};

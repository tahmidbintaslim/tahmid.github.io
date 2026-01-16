// Dynamic imports utility for code splitting
// This helps reduce the initial bundle size by lazy loading components


// Loading component shown while chunk is being loaded
const LoadingComponent = () => null;

// Prefetch a chunk to speed up navigation
export const prefetchChunk = (chunkName: string) => {
    if (typeof window === "undefined") return;

    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "script";
    link.href = `/static/chunks/${chunkName}.js`;
    document.head.appendChild(link);
};

// Track component loading performance
export const trackComponentLoad = (
    componentName: string,
    loadTime: number
) => {
    if (process.env.NODE_ENV !== "production") {
        console.log(`Component loaded: ${componentName} (${loadTime}ms)`);
    }
};

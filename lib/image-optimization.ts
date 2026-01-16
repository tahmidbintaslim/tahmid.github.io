// Image and performance optimization utilities

import { ImageProps } from "next/image";

/**
 * Generate responsive image sizes for the srcSet attribute
 * Optimizes loading for different viewport widths
 */
export const RESPONSIVE_SIZES = {
    thumbnail: "(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw",
    hero: "100vw",
    card: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
    full: "100vw",
};

/**
 * Image loading strategies for different use cases
 */
export const IMAGE_LOADING_STRATEGIES = {
    // For above-the-fold images - load immediately
    eager: "eager" as const,
    // For below-the-fold images - lazy load
    lazy: "lazy" as const,
};

/**
 * Get optimized Image props based on use case
 */
export const getOptimizedImageProps = (
    src: string,
    alt: string,
    type: "hero" | "card" | "thumbnail" | "full" = "card",
    priority = false
): Partial<ImageProps> => {
    const baseProps = {
        src,
        alt,
        quality: 85, // Balance quality vs file size
        sizes: RESPONSIVE_SIZES[type],
        priority,
    };

    if (type === "hero") {
        return {
            ...baseProps,
            quality: 90,
            priority: true,
            loading: IMAGE_LOADING_STRATEGIES.eager,
        };
    }

    if (type === "thumbnail") {
        return {
            ...baseProps,
            quality: 75,
            loading: IMAGE_LOADING_STRATEGIES.lazy,
        };
    }

    return {
        ...baseProps,
        loading: priority
            ? IMAGE_LOADING_STRATEGIES.eager
            : IMAGE_LOADING_STRATEGIES.lazy,
    };
};

/**
 * Preload critical images for better performance
 */
export const preloadImage = (src: string) => {
    if (typeof window === "undefined") return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
};

/**
 * Generate AVIF/WebP fallback links for images
 */
export const getImageSrcSet = (
    src: string,
    formats: ("avif" | "webp" | "jpg")[] = ["avif", "webp", "jpg"]
) => {
    const baseSrc = src.replace(/\.[^.]+$/, "");

    return formats
        .map((format) => {
            const mimeType = format === "jpg" ? "image/jpeg" : `image/${format}`;
            return `${baseSrc}.${format} ${mimeType}`;
        })
        .join(", ");
};

/**
 * Check if an image should be lazy loaded based on viewport
 */
export const shouldLazyLoadImage = (): boolean => {
    if (typeof window === "undefined") return false;

    return "IntersectionObserver" in window;
};

/**
 * Performance metrics tracking
 */
export const trackImagePerformance = (
    imageName: string,
    loadTime: number,
    fileSize: number
) => {
    if (process.env.NODE_ENV !== "production") return;

    const metric = {
        image: imageName,
        loadTime,
        fileSize,
        timestamp: new Date().toISOString(),
    };

    if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "image_load", {
            event_category: "performance",
            event_label: imageName,
            load_time: loadTime,
            file_size: fileSize,
        });
    }
};

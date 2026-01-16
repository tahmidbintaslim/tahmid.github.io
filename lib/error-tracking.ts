// Error tracking and monitoring utility
// Supports Sentry, LogRocket, and custom error logging

export interface ErrorDetails {
    message: string;
    stack?: string;
    context?: Record<string, unknown>;
    severity?: "low" | "medium" | "high" | "critical";
    userId?: string;
    userEmail?: string;
    url?: string;
    userAgent?: string;
    timestamp?: string;
}

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || "";
const LOGROCKET_ID = process.env.NEXT_PUBLIC_LOGROCKET_ID || "";

// Initialize monitoring services
export const initializeMonitoring = () => {
    if (typeof window === "undefined") return;

    // Sentry initialization (optional)
    if (SENTRY_DSN && typeof (window as any).Sentry !== "undefined") {
        (window as any).Sentry?.init?.({
            dsn: SENTRY_DSN,
            environment: process.env.NODE_ENV,
            tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
            release: process.env.NEXT_PUBLIC_APP_VERSION || "unknown",
        });
    }

    // LogRocket initialization (optional)
    if (LOGROCKET_ID && typeof (window as any).LogRocket !== "undefined") {
        (window as any).LogRocket?.init?.(LOGROCKET_ID);
    }
};

// Capture error
export const captureError = (error: Error | string, details?: Omit<ErrorDetails, "message">) => {
    const message = error instanceof Error ? error.message : error;
    const stack = error instanceof Error ? error.stack : undefined;

    const errorData: ErrorDetails = {
        message,
        stack,
        timestamp: new Date().toISOString(),
        url: typeof window !== "undefined" ? window.location.href : undefined,
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        ...details,
    };

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
        console.error("[Error Tracking]", errorData);
    }

    // Send to Sentry if available
    if (typeof (window as any).Sentry !== "undefined") {
        (window as any).Sentry?.captureException?.(error, {
            contexts: {
                details: errorData,
            },
            level: details?.severity || "error",
        });
    }

    // Send to LogRocket if available
    if (typeof (window as any).LogRocket !== "undefined") {
        (window as any).LogRocket?.captureException?.(error, {
            contexts: errorData,
        });
    }

    // Send to custom backend if needed
    if (process.env.NEXT_PUBLIC_ERROR_LOG_ENDPOINT) {
        sendErrorLog(errorData).catch(console.error);
    }
};

// Capture message
export const captureMessage = (message: string, level: "info" | "warning" | "error" = "info") => {
    if (typeof (window as any).Sentry !== "undefined") {
        (window as any).Sentry?.captureMessage?.(message, level);
    }

    if (process.env.NODE_ENV === "development") {
        console.log(`[${level.toUpperCase()}]`, message);
    }
};

// Set user context for monitoring
export const setUserContext = (userId: string, userEmail?: string, userData?: Record<string, unknown>) => {
    if (typeof (window as any).Sentry !== "undefined") {
        (window as any).Sentry?.setUser?.({
            id: userId,
            email: userEmail,
            ...userData,
        });
    }

    if (typeof (window as any).LogRocket !== "undefined") {
        (window as any).LogRocket?.identify?.(userId, {
            email: userEmail,
            ...userData,
        });
    }
};

// Send error log to custom backend
async function sendErrorLog(errorData: ErrorDetails) {
    try {
        const endpoint = process.env.NEXT_PUBLIC_ERROR_LOG_ENDPOINT;
        if (!endpoint) return;

        await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(errorData),
        });
    } catch (error) {
        console.error("Failed to send error log:", error);
    }
}

// Global error handler
if (typeof window !== "undefined") {
    window.addEventListener("error", (event) => {
        captureError(event.error, {
            context: {
                type: "uncaught_error",
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
            },
            severity: "high",
        });
    });

    window.addEventListener("unhandledrejection", (event) => {
        captureError(event.reason || "Unhandled Promise Rejection", {
            context: {
                type: "unhandled_rejection",
            },
            severity: "high",
        });
    });
}

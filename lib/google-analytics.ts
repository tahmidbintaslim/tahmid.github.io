// Google Analytics utility
export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "";

// Log event to Google Analytics
export const logEvent = (
    eventName: string,
    eventParams?: Record<string, string | number | boolean>
) => {
    if (typeof window === "undefined" || !GA_ID) return;

    // Using gtag if available (should be injected via Google Analytics script)
    if (typeof (window as any).gtag !== "undefined") {
        (window as any).gtag("event", eventName, eventParams);
    }
};

// Track page view
export const logPageView = (path: string, title: string) => {
    if (typeof window === "undefined" || !GA_ID) return;

    logEvent("page_view", {
        page_path: path,
        page_title: title,
    });
};

// Track outbound link clicks
export const logOutboundLink = (url: string) => {
    logEvent("outbound_link", {
        url,
    });
};

// Track form submission
export const logFormSubmit = (formName: string) => {
    logEvent("form_submit", {
        form_name: formName,
    });
};

// Track video view
export const logVideoView = (videoTitle: string, videoDuration?: number) => {
    logEvent("video_view", {
        video_title: videoTitle,
        ...(videoDuration && { video_duration: videoDuration }),
    });
};

// Track search
export const logSearch = (searchQuery: string, resultsCount?: number) => {
    logEvent("search", {
        search_term: searchQuery,
        ...(resultsCount && { results_count: resultsCount }),
    });
};

// Track user interaction
export const logUserInteraction = (interactionType: string, details?: Record<string, string | number | boolean>) => {
    logEvent("user_interaction", {
        interaction_type: interactionType,
        ...details,
    });
};

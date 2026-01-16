export interface ShareOptions {
    title: string;
    description?: string;
    url: string;
    hashtags?: string[];
}

export const getShareUrls = (options: ShareOptions) => {
    const { title, description, url, hashtags } = options;
    const hashtag = hashtags?.join(",") ? `&hashtags=${hashtags.join(",")}` : "";
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description || title);

    return {
        twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}${hashtag}&via=RAFI_it100`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
        email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
        copy: url,
    };
};

export const shareOnPlatform = (
    platform: "twitter" | "linkedin" | "facebook" | "whatsapp" | "email" | "copy",
    url: string
) => {
    if (typeof window === "undefined") return;

    const shareUrls = getShareUrls({
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
        url,
    });

    if (platform === "copy") {
        navigator.clipboard.writeText(url);
    } else if (platform === "email") {
        window.location.href = shareUrls.email;
    } else {
        const shareUrl = shareUrls[platform as Exclude<typeof platform, "copy">];
    }
};

export const canShare = () => {
    return typeof navigator !== "undefined" && !!navigator.share;
};

/**
 * OpenGraph and social media metadata utilities
 * Generate dynamic OG images and metadata
 */

interface OGConfig {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    url: string;
    type?: 'website' | 'article' | 'profile';
    twitterHandle?: string;
}

/**
 * Generate OpenGraph meta tags
 */
export function generateOGTags(config: OGConfig): Record<string, string> {
    return {
        'og:title': config.title,
        'og:description': config.description,
        'og:image': config.image,
        'og:image:alt': config.imageAlt,
        'og:url': config.url,
        'og:type': config.type || 'website',
        'twitter:title': config.title,
        'twitter:description': config.description,
        'twitter:image': config.image,
        'twitter:card': 'summary_large_image',
        ...(config.twitterHandle && { 'twitter:creator': config.twitterHandle }),
    };
}

/**
 * Generate OG image URL with dynamic parameters
 * Uses vercel-og or similar service
 */
export function generateOGImageUrl(
    baseUrl: string,
    params: {
        title?: string;
        description?: string;
        imageUrl?: string;
    }
): string {
    const searchParams = new URLSearchParams();

    if (params.title) searchParams.set('title', params.title);
    if (params.description) searchParams.set('description', params.description);
    if (params.imageUrl) searchParams.set('image', params.imageUrl);

    return `${baseUrl}?${searchParams.toString()}`;
}

/**
 * Generate JSON-LD for articles/blog posts
 */
export function generateArticleSchema(article: {
    title: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified?: string;
    author: {
        name: string;
        url?: string;
    };
    url: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.description,
        image: article.image,
        datePublished: article.datePublished,
        dateModified: article.dateModified || article.datePublished,
        author: {
            '@type': 'Person',
            name: article.author.name,
            ...(article.author.url && { url: article.author.url }),
        },
        url: article.url,
    };
}

/**
 * Generate JSON-LD for products/projects
 */
export function generateProductSchema(product: {
    name: string;
    description: string;
    image: string;
    url: string;
    author?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: product.name,
        description: product.description,
        image: product.image,
        url: product.url,
        ...(product.author && { author: { '@type': 'Person', name: product.author } }),
    };
}

/**
 * Generate breadcrumb schema for multi-page navigation
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

/**
 * Image optimization utilities
 * Lazy loading hints and responsive images
 */

export interface ImageConfig {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
    quality?: number;
}

/**
 * Generate srcSet for responsive images
 */
export function generateSrcSet(
    src: string,
    widths: number[] = [640, 750, 828, 1080, 1200, 1920]
): string {
    return widths
        .map(width => `${src}?w=${width}&q=75 ${width}w`)
        .join(', ');
}

/**
 * Get optimal image size based on device
 */
export function getOptimalImageSize(containerWidth: number): number {
    const sizes = [640, 750, 828, 1080, 1200, 1920];
    return sizes.find(size => size >= containerWidth) || sizes[sizes.length - 1];
}

/**
 * Generate picture element with webp fallback
 */
export function generatePictureElement(config: ImageConfig): string {
    const { src, alt, width, height, quality = 75 } = config;

    const baseSrc = src.substring(0, src.lastIndexOf('.'));

    return `
    <picture>
      <source type="image/webp" srcSet="${generateSrcSet(`${baseSrc}.webp`, [640, 1080, 1920])}" />
      <source type="image/avif" srcSet="${generateSrcSet(`${baseSrc}.avif`, [640, 1080, 1920])}" />
      <img
        src="${src}?q=${quality}"
        alt="${alt}"
        ${width ? `width="${width}"` : ''}
        ${height ? `height="${height}"` : ''}
        loading="lazy"
        decoding="async"
      />
    </picture>
  `;
}

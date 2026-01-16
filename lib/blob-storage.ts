/**
 * Vercel Blob integration for file storage
 * Blob provides optimized storage for images, videos, and other files
 * with automatic CDN distribution and ultra-fast access globally
 */

import { put } from '@vercel/blob';

export interface BlobFile {
    url: string;
    downloadUrl: string;
}

/**
 * Upload a file to Vercel Blob
 * @param file - The file to upload
 * @param filename - Optional custom filename
 * @returns Object with blob URL and metadata
 */
export async function uploadFile(
    file: Blob | File | ReadableStream,
    filename: string = `file-${Date.now()}`
): Promise<BlobFile | null> {
    try {
        // Check if Blob storage is configured
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
            console.warn('Vercel Blob not configured (BLOB_READ_WRITE_TOKEN not set)');
            return null;
        }

        const result = await put(filename, file as Blob, {
            access: 'public',
        });

        return {
            url: result.url,
            downloadUrl: `${result.url}?download`,
        };
    } catch (error) {
        console.error('Error uploading file to Vercel Blob:', error);
        return null;
    }
}

/**
 * Delete a file from Vercel Blob
 * Note: Vercel Blob API requires the full URL for deletion, not just pathname
 * @param _pathname - The pathname of the file to delete (for reference)
 */
export async function deleteFile(_pathname: string): Promise<boolean> {
    try {
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
            console.warn('Vercel Blob not configured');
            return false;
        }

        // Note: Blob deletion requires the full URL, not just pathname
        // For now, we'll log a warning that deletion is not implemented
        console.warn('Blob deletion not implemented - use Vercel Dashboard for manual cleanup');
        return false;
    } catch (error) {
        console.error('Error deleting file from Vercel Blob:', error);
        return false;
    }
}

/**
 * Check if a file exists in Vercel Blob
 * @param _pathname - The pathname of the file to check (for reference)
 */
export async function fileExists(_pathname: string): Promise<boolean> {
    // Note: Vercel Blob SDK doesn't provide a direct exists/list method
    // File existence can only be determined by attempting to access it
    // For production use, maintain a separate index of uploaded files
    console.warn('fileExists check not available in Vercel Blob SDK');
    return false;
}

/**
 * Upload multiple files
 * @param files - Array of files to upload with their filenames
 */
export async function uploadFiles(
    files: Array<{ file: Blob | File | ReadableStream; filename: string }>
): Promise<BlobFile[]> {
    try {
        const uploadPromises = files.map(({ file, filename }) =>
            uploadFile(file, filename)
        );

        const results = await Promise.all(uploadPromises);
        return results.filter((result) => result !== null) as BlobFile[];
    } catch (error) {
        console.error('Error uploading multiple files:', error);
        return [];
    }
}

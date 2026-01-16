/**
 * Vercel KV integration for feedback storage
 * KV is a managed Redis database that provides ultra-fast, durable storage
 * with automatic replication across regions
 */

import { kv } from '@vercel/kv';

export interface FeedbackEntry {
    id: string;
    type: 'feedback' | 'bug' | 'feature' | 'other';
    message: string;
    email?: string;
    page?: string;
    userAgent?: string;
    timestamp: string;
}

const FEEDBACK_KEY = 'feedback_entries';
const MAX_FEEDBACK_ENTRIES = 100;

/**
 * Get all feedback entries from Vercel KV
 */
export async function getFeedback(): Promise<FeedbackEntry[]> {
    try {
        // Check if KV is available
        if (!process.env.KV_REST_API_URL) {
            console.warn('Vercel KV not configured (KV_REST_API_URL not set)');
            return [];
        }

        const feedback = await kv.get<FeedbackEntry[]>(FEEDBACK_KEY);
        return feedback || [];
    } catch (error) {
        console.error('Error fetching feedback from Vercel KV:', error);
        return [];
    }
}

/**
 * Add a new feedback entry to Vercel KV
 */
export async function addFeedback(feedback: FeedbackEntry): Promise<boolean> {
    try {
        // Check if KV is available
        if (!process.env.KV_REST_API_URL) {
            console.warn('Vercel KV not configured. Feedback not persisted.');
            return false;
        }

        // Get existing feedback
        const existingFeedback = await getFeedback();

        // Add new feedback at the beginning
        const updatedFeedback = [feedback, ...existingFeedback];

        // Keep only the last MAX_FEEDBACK_ENTRIES
        const trimmedFeedback = updatedFeedback.slice(0, MAX_FEEDBACK_ENTRIES);

        // Store in KV with 90 day expiration (7,776,000 seconds)
        await kv.set(FEEDBACK_KEY, trimmedFeedback, { ex: 7776000 });

        return true;
    } catch (error) {
        console.error('Error saving feedback to Vercel KV:', error);
        return false;
    }
}

/**
 * Get recent feedback entries
 */
export async function getRecentFeedback(limit: number = 10): Promise<FeedbackEntry[]> {
    try {
        const feedback = await getFeedback();
        return feedback.slice(0, limit);
    } catch (error) {
        console.error('Error getting recent feedback:', error);
        return [];
    }
}

/**
 * Clear all feedback entries (admin only)
 */
export async function clearFeedback(): Promise<boolean> {
    try {
        if (!process.env.KV_REST_API_URL) {
            return false;
        }

        await kv.del(FEEDBACK_KEY);
        return true;
    } catch (error) {
        console.error('Error clearing feedback:', error);
        return false;
    }
}

/**
 * Get feedback statistics
 */
export async function getFeedbackStats(): Promise<{
    total: number;
    byType: Record<string, number>;
    lastUpdated: string;
}> {
    try {
        const feedback = await getFeedback();

        const byType = feedback.reduce(
            (acc, entry) => {
                acc[entry.type] = (acc[entry.type] || 0) + 1;
                return acc;
            },
            {} as Record<string, number>
        );

        return {
            total: feedback.length,
            byType,
            lastUpdated: new Date().toISOString(),
        };
    } catch (error) {
        console.error('Error getting feedback stats:', error);
        return {
            total: 0,
            byType: {},
            lastUpdated: new Date().toISOString(),
        };
    }
}

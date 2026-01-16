import { z } from "zod";

// Contact form validation schema
export const contactFormSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must be less than 100 characters")
        .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),

    email: z
        .string()
        .email("Invalid email address")
        .max(255, "Email must be less than 255 characters"),

    subject: z
        .string()
        .min(5, "Subject must be at least 5 characters")
        .max(200, "Subject must be less than 200 characters")
        .regex(/^[a-zA-Z0-9\s\-.,!?:'()]+$/, "Subject contains invalid characters"),

    message: z
        .string()
        .min(20, "Message must be at least 20 characters")
        .max(5000, "Message must be less than 5000 characters"),
});

// Feedback form validation schema
export const feedbackSchema = z.object({
    type: z.enum(["feedback", "bug", "feature", "other"]).default("feedback"),
    message: z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(1000, "Message must be less than 1000 characters"),
    email: z
        .string()
        .email("Invalid email address")
        .optional()
        .or(z.literal("")),
    page: z
        .string()
        .url("Invalid URL")
        .optional()
        .or(z.literal("")),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type FeedbackInput = z.infer<typeof feedbackSchema>;

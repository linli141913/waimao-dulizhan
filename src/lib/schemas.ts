import { z } from "zod";

export const inquirySchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must be less than 100 characters"),
    email: z
        .string()
        .email("Please enter a valid email address"),
    company: z
        .string()
        .max(200, "Company name must be less than 200 characters")
        .optional()
        .or(z.literal("")),
    phone: z
        .string()
        .max(30, "Phone number must be less than 30 characters")
        .optional()
        .or(z.literal("")),
    productId: z
        .string()
        .optional()
        .or(z.literal("")),
    quantity: z
        .string()
        .max(50, "Quantity must be less than 50 characters")
        .optional()
        .or(z.literal("")),
    message: z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(2000, "Message must be less than 2000 characters"),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

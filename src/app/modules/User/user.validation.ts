import { z } from "zod";

// Validation schema for TUser
const createUserZodValidationSchema = z.object({
    name: z.string()
        .trim()
        .max(20, "First name cannot be more than 20 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
    role: z.enum(["admin", "user"]).default("user"),
    isBlocked: z.boolean().default(false),
});

export const userValidations = {
    createUserZodValidationSchema
}

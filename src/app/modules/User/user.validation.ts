import { z } from "zod";

// Validation schema for TUsername
const TUsernameSchema = z.object({
    firstName: z
        .string()
        .trim()
        .max(20, "First name cannot be more than 20 characters")
        .refine(
            (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
            {
                message: "First name's first character must be capitalized",
            }
        ),
    middleName: z.string().optional(),
    lastName: z
        .string()
});

// Validation schema for TUser
const createUserZodValidationSchema = z.object({
    name: TUsernameSchema,
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
    role: z.enum(["admin", "user"]).default("user"),
    isBlocked: z.boolean().default(false),
});

export const userValidations = {
    createUserZodValidationSchema
}

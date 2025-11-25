import { z } from "zod";

export const userValidation = {
  create: z.object({
    body: z.object({
      name: z
        .string({
          required_error: "Name is required",
          invalid_type_error: "Name must be a string",
        })
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must not exceed 100 characters")
        .trim(),
      email: z
        .string({
          required_error: "Email is required",
          invalid_type_error: "Email must be a string",
        })
        .email("Must be a valid email address")
        .toLowerCase()
        .trim(),
      age: z
        .number({
          invalid_type_error: "Age must be a number",
        })
        .int("Age must be an integer")
        .min(0, "Age cannot be negative")
        .max(120, "Age cannot be greater than 120")
        .optional(),
    }),
  }),

  update: z.object({
    params: z.object({
      id: z
        .string()
        .regex(/^\d+$/, "ID must be a valid number")
        .transform(Number),
    }),
    body: z.object({
      name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must not exceed 100 characters")
        .trim()
        .optional(),
      email: z
        .string()
        .email("Must be a valid email address")
        .toLowerCase()
        .trim()
        .optional(),
      age: z
        .number()
        .int("Age must be an integer")
        .min(0, "Age cannot be negative")
        .max(120, "Age cannot be greater than 120")
        .optional(),
      isActive: z.boolean().optional(),
    }),
  }),

  getById: z.object({
    params: z.object({
      id: z
        .string()
        .regex(/^\d+$/, "ID must be a valid number")
        .transform(Number),
    }),
  }),

  getAll: z.object({
    query: z.object({
      page: z
        .string()
        .regex(/^\d+$/, "Page must be a valid number")
        .transform(Number)
        .refine((val) => val > 0, "Page must be greater than 0")
        .optional(),
      limit: z
        .string()
        .regex(/^\d+$/, "Limit must be a valid number")
        .transform(Number)
        .refine(
          (val) => val > 0 && val <= 100,
          "Limit must be between 1 and 100"
        )
        .optional(),
      isActive: z
        .string()
        .refine(
          (val) => val === "true" || val === "false",
          "isActive must be true or false"
        )
        .optional(),
    }),
  }),

  delete: z.object({
    params: z.object({
      id: z
        .string()
        .regex(/^\d+$/, "ID must be a valid number")
        .transform(Number),
    }),
  }),
};

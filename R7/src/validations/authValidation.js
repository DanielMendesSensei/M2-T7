import { z } from "zod";

export const authValidation = {
  register: z.object({
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
      password: z
        .string({
          required_error: "Password is required",
          invalid_type_error: "Password must be a string",
        })
        .min(6, "Password must be at least 6 characters")
        .max(255, "Password must not exceed 255 characters"),
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

  login: z.object({
    body: z.object({
      email: z
        .string({
          required_error: "Email is required",
          invalid_type_error: "Email must be a string",
        })
        .email("Must be a valid email address")
        .toLowerCase()
        .trim(),
      password: z
        .string({
          required_error: "Password is required",
          invalid_type_error: "Password must be a string",
        })
        .min(1, "Password is required"),
    }),
  }),
};

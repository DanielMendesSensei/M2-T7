import { z } from "zod";

export const postValidation = {
  create: z.object({
    body: z.object({
      title: z
        .string({
          required_error: "Title is required",
          invalid_type_error: "Title must be a string",
        })
        .min(3, "Title must be at least 3 characters")
        .max(200, "Title must not exceed 200 characters")
        .trim(),
      content: z
        .string({
          required_error: "Content is required",
          invalid_type_error: "Content must be a string",
        })
        .min(1, "Content cannot be empty")
        .trim(),
      tags: z.array(z.string().trim()).optional().default([]),
      userId: z
        .number({
          required_error: "UserId is required",
          invalid_type_error: "UserId must be a number",
        })
        .int("UserId must be an integer")
        .positive("UserId must be positive"),
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
      title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(200, "Title must not exceed 200 characters")
        .trim()
        .optional(),
      content: z.string().min(1, "Content cannot be empty").trim().optional(),
      tags: z.array(z.string().trim()).optional(),
      isPublished: z.boolean().optional(),
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
      isPublished: z
        .string()
        .refine(
          (val) => val === "true" || val === "false",
          "isPublished must be true or false"
        )
        .optional(),
      userId: z
        .string()
        .regex(/^\d+$/, "UserId must be a valid number")
        .transform(Number)
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

  togglePublish: z.object({
    params: z.object({
      id: z
        .string()
        .regex(/^\d+$/, "ID must be a valid number")
        .transform(Number),
    }),
  }),
};

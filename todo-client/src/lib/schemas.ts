import { z } from "zod";

export const todoFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(255, "Title must be at most 255 characters"),
  text: z.string(),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Deadline must be a date"),
  status: z.string().regex(/^(true|false)$/, "Status must be true or false"),
});

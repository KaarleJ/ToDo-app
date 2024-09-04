import { z } from "zod";

export const todoFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(255, "Title must be at most 255 characters"),
  text: z
    .string()
    .min(3, "Text must be at least 3 characters")
    .max(255, "Text must be at most 255 characters"),
  deadline: z.date({ message: "Invalid date" }),
  status: z.boolean({ message: "Invalid status" }),
});

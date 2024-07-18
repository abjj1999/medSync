import { z } from "zod";

export const UserFormSchema = z.object({
    name: z.string()
    .min(2, "name must be at least 2 characters.")
    .max(50, "name must be at most 50 characters."),
    email: z.string().email("Invalid email address."),
    phone: z.string().refine((phone) => /^\+?[0-9]{10,14}$/.test(phone), "Invalid phone number."),
  })
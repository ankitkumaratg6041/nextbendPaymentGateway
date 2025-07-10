// src/components/auth/signupSchema.js
import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  facebook: z.string().url("Invalid Facebook URL").optional().or(z.literal("")),
  companyName: z.string().min(2, "Company name is required"),
  customMessage: z.string().max(500, "Message too long").optional().or(z.literal("")),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

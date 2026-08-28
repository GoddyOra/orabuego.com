import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.email("Enter a valid email address").max(200),
  message: z.string().trim().min(10, "Say a bit more (10+ characters)").max(5000),
  // Honeypot: real visitors never see or fill this field (hidden via CSS).
  // Deliberately unrestricted here — the route handler checks it and
  // returns a fake success for bots. Rejecting it at the schema level
  // would 400 instead, which is a distinguishable tell.
  company: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

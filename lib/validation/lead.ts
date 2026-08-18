import { z } from "zod";

/** Indian mobile numbers, tolerant of spaces, dashes and +91. */
const phoneSchema = z
  .string()
  .trim()
  .min(1, "Please enter a phone number")
  .transform((value) => value.replace(/[\s()-]/g, ""))
  .refine((value) => /^(\+?91)?[6-9]\d{9}$/.test(value), {
    message: "Enter a 10-digit Indian mobile number",
  });

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(80, "That name looks too long"),
  phone: phoneSchema,
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  city: z.string().trim().max(60).optional().or(z.literal("")),
  /** Slug from /services, when the enquiry came from a service card. */
  service: z.string().trim().max(60).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters)")
    .max(1200, "Please keep this under 1200 characters"),

  // ── Spam traps. The Angular forms had no protection at all. ──
  /** Hidden field: real users never fill it. */
  company: z.string().max(0, "Rejected").optional().or(z.literal("")),
  /** Milliseconds since the form rendered; bots submit near-instantly. */
  elapsed: z.coerce.number().min(0).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

/** Below this, treat the submission as automated. */
export const MIN_FILL_MS = 2500;

export type LeadState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Field-level messages, keyed by field name. */
  errors?: Partial<Record<keyof LeadInput, string>>;
  /** Echo back so a failed submit does not wipe the user's typing. */
  values?: Partial<Record<keyof LeadInput, string>>;
};

export const initialLeadState: LeadState = { status: "idle" };

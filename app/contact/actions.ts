"use server";

import { submitServiceRequest } from "@/lib/api/svlots";
import { emailConfigured, sendLeadEmail } from "@/lib/email";
import { services } from "@/content/services";
import { type LeadState, MIN_FILL_MS, leadSchema } from "@/lib/validation/lead";

function serviceTitle(slug: string | undefined): string {
  if (!slug) return "General enquiry";
  return services.find((service) => service.slug === slug)?.title ?? "General enquiry";
}

/**
 * Handles both the general contact form and per-service call-back requests.
 *
 * Deliberate differences from the Angular implementation:
 *  - Success is decided by HTTP status, not by string-matching the response body.
 *  - A failure is reported as a failure. The old handler treated a 2xx arriving in
 *    the error branch as success and showed "Data Added Successfully", so lost
 *    enquiries looked like wins.
 *  - Two delivery paths are attempted; the user is only told it worked if at
 *    least one actually succeeded.
 */
export async function submitLead(
  _prevState: LeadState,
  formData: FormData,
): Promise<LeadState> {
  const raw = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    city: formData.get("city"),
    service: formData.get("service"),
    message: formData.get("message"),
    company: formData.get("company"),
    elapsed: formData.get("elapsed"),
  };

  const parsed = leadSchema.safeParse(raw);

  // Preserve typing so a rejected submit doesn't clear the form.
  const values = {
    name: String(raw.name ?? ""),
    phone: String(raw.phone ?? ""),
    email: String(raw.email ?? ""),
    city: String(raw.city ?? ""),
    message: String(raw.message ?? ""),
    service: String(raw.service ?? ""),
  };

  if (!parsed.success) {
    const errors: LeadState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof typeof errors;
      if (field && !errors[field]) errors[field] = issue.message;
    }
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
      values,
    };
  }

  const lead = parsed.data;

  // Spam traps: hidden field filled, or submitted implausibly fast. Answer with
  // a success shape so a bot learns nothing, but deliver nothing.
  if (lead.company || (lead.elapsed !== undefined && lead.elapsed < MIN_FILL_MS)) {
    console.warn("Lead rejected by spam trap", {
      honeypot: Boolean(lead.company),
      elapsed: lead.elapsed,
    });
    return { status: "success", message: "Thank you — we will be in touch shortly." };
  }

  const heading = serviceTitle(lead.service || undefined);

  const [api, emailed] = await Promise.all([
    submitServiceRequest({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      city: lead.city || undefined,
      serviceHeading: heading,
      message: lead.message,
    }),
    sendLeadEmail({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      city: lead.city || undefined,
      service: lead.service ? heading : undefined,
      message: lead.message,
    }),
  ]);

  if (api.ok || emailed) {
    return {
      status: "success",
      message: "Thank you — your enquiry has reached us and we will be in touch shortly.",
    };
  }

  // Both paths failed. Say so, and give the user a route that works.
  console.error("Lead delivery failed on every path", {
    apiStatus: api.status,
    emailConfigured: emailConfigured(),
  });
  return {
    status: "error",
    message:
      "We could not submit your enquiry just now. Please call or WhatsApp us instead — we do not want to lose your message.",
    values,
  };
}

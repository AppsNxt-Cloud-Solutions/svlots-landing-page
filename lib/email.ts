import "server-only";

import { formattedAddress, site } from "@/lib/site";

/**
 * Optional lead notification by email, via the Resend REST API.
 *
 * Called through fetch rather than the SDK to avoid another dependency. Returns
 * false (never throws) when unconfigured, so it can be used as a best-effort
 * second delivery path.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_TO);
}

export async function sendLeadEmail(lead: {
  name: string;
  email: string;
  phone: string;
  city?: string;
  service?: string;
  message: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_TO;
  if (!apiKey || !to) return false;

  const subject = lead.service
    ? `Website enquiry — ${lead.service} — ${lead.name}`
    : `Website enquiry — ${lead.name}`;

  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ...(lead.city ? ([["City", lead.city]] as [string, string][]) : []),
    ...(lead.service ? ([["Service", lead.service]] as [string, string][]) : []),
  ];

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    lead.message,
    "",
    "—",
    `${site.legalName}, ${formattedAddress}`,
  ].join("\n");

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${site.name} Website <onboarding@resend.dev>`,
        to: [to],
        reply_to: lead.email,
        subject,
        text,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`Resend returned HTTP ${response.status}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Resend request threw", error);
    return false;
  }
}

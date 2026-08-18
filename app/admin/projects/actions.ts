"use server";

import { revalidateTag, updateTag } from "next/cache";
import { z } from "zod";
import { PROJECTS_TAG, addProject } from "@/lib/api/svlots";
import { MAX_UPLOAD_BYTES, uploadProjectImage } from "@/lib/s3";
import type { AddProjectState } from "@/app/admin/projects/state";
import { getSession } from "@/lib/session";

const schema = z.object({
  title: z.string().trim().min(2, "Enter a project title").max(120),
  description: z.string().trim().min(10, "Add a short description").max(1200),
  location: z.string().trim().min(2, "Enter a location").max(120),
  type: z.string().trim().min(2, "Enter a property type").max(60),
  externalLink: z.string().trim().max(300).optional().or(z.literal("")),
});

export async function createProject(
  _prev: AddProjectState,
  formData: FormData,
): Promise<AddProjectState> {
  // Verified again here: a Server Action is a public endpoint, so the session
  // must be checked in the action itself, not only in the layout or the proxy.
  const session = await getSession();
  if (!session) {
    return {
      status: "error",
      message: "Your session has expired. Please sign in again.",
    };
  }

  const values = {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    location: String(formData.get("location") ?? ""),
    type: String(formData.get("type") ?? ""),
    externalLink: String(formData.get("externalLink") ?? ""),
  };

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const errors: AddProjectState["errors"] = {};
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

  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) {
    return {
      status: "error",
      message: "Please choose an image for the project.",
      errors: { image: "An image is required" },
      values,
    };
  }

  const upload = await uploadProjectImage(file);
  if (!upload.ok) {
    const reason =
      upload.reason === "type"
        ? "That file type is not supported. Use a JPEG, PNG or WebP image."
        : upload.reason === "size"
          ? `That image is too large. The limit is ${Math.round(MAX_UPLOAD_BYTES / 1024 / 1024)} MB.`
          : "The image could not be uploaded. Please try again.";
    return { status: "error", message: reason, errors: { image: reason }, values };
  }

  const result = await addProject({
    ...parsed.data,
    externalLink: parsed.data.externalLink ?? "",
    imageUrl: upload.url,
    fileName: upload.key,
  });

  if (!result.ok) {
    return {
      status: "error",
      message: `The project could not be saved (HTTP ${result.status}). The image uploaded successfully, so you can retry without re-selecting it.`,
      values,
    };
  }

  // updateTag gives read-your-writes: the admin sees the new project immediately
  // rather than the stale cached catalogue. revalidateTag needs a cacheLife
  // profile in Next 16 and is the stale-while-revalidate variant.
  updateTag(PROJECTS_TAG);
  revalidateTag(PROJECTS_TAG, "max");

  return {
    status: "success",
    message: `"${parsed.data.title}" has been published to the projects page.`,
  };
}

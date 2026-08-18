/** Plain module: a "use server" file may only export async functions. */
export type AddProjectState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<
    Record<
      "title" | "description" | "location" | "type" | "externalLink" | "image",
      string
    >
  >;
  values?: Record<string, string>;
};

export const initialAddProjectState: AddProjectState = { status: "idle" };

/** Plain module: a "use server" file may only export async functions. */
export type LoginState = {
  status: "idle" | "error";
  message?: string;
  errors?: { email?: string; password?: string };
  email?: string;
};

export const initialLoginState: LoginState = { status: "idle" };

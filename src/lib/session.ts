import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

/** Current session (or null) for server components. */
export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

/** Redirects to /signin (with a toast flag) when the visitor is not logged in. */
export async function requireSession(returnTo: string) {
  const session = await getSession();
  if (!session) {
    redirect(`/signin?redirected=1&callbackUrl=${encodeURIComponent(returnTo)}`);
  }
  return session;
}

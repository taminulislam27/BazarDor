import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";


export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}


export async function requireSession(returnTo: string) {
  const session = await getSession();
  if (!session) {
    redirect(`/signin?redirected=1&callbackUrl=${encodeURIComponent(returnTo)}`);
  }
  return session;
}

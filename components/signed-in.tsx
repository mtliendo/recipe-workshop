import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { auth0 } from "@/lib/auth0";

export async function SignedIn({
  returnTo,
  children,
}: {
  returnTo: string;
  children: ReactNode;
}) {
  const session = await auth0.getSession();
  if (!session) {
    redirect(`/auth/login?returnTo=${encodeURIComponent(returnTo)}`);
  }
  return children;
}

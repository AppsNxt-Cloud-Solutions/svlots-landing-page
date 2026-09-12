import { LogOut } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { getSession } from "@/lib/session";

export const metadata = {
  robots: { index: false, follow: false },
};

/**
 * Real authorisation boundary.
 *
 * proxy.ts already redirects unauthenticated requests, but that is documented as
 * an optimistic check (it runs on prefetches and only reads the cookie). This
 * layout verifies the session again before rendering anything, so the page is
 * protected even if the proxy matcher is ever changed.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login?next=/admin/projects");

  return (
    <div className="min-h-[calc(100dvh-4.5rem)] bg-surface-alt pt-18">
      <div className="border-b border-ink-200 bg-surface">
        <Container className="flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-4">
            <span className="rounded-pill bg-ink-900 px-3 py-1 text-2xs font-semibold tracking-[0.14em] text-gold-400 uppercase">
              Admin
            </span>
            <nav aria-label="Admin">
              <Link
                href="/admin/projects"
                aria-current="page"
                className="text-sm font-semibold text-gold-700"
              >
                Projects
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-sm text-ink-500">
              {session.name || session.email}
              {session.role && (
                <span className="ml-2 text-xs text-ink-500">({session.role})</span>
              )}
            </p>
            <form action={signOut}>
              <Button type="submit" variant="secondary" size="sm">
                <LogOut aria-hidden="true" className="size-3.5" />
                Sign out
              </Button>
            </form>
          </div>
        </Container>
      </div>

      <Container className="py-12">{children}</Container>
    </div>
  );
}

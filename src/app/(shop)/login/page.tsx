/**
 * Legacy Login Page Redirect
 *
 * This page redirects to the new NextAuth-based login page at /auth/login
 */

import { redirect } from 'next/navigation';

export default function LegacyLoginPage({
  searchParams,
}: {
  searchParams: { redirect?: string; callbackUrl?: string };
}) {
  const redirectParam = searchParams.redirect || searchParams.callbackUrl || '/';

  // Redirect to the new NextAuth login page
  redirect(`/auth/login?callbackUrl=${encodeURIComponent(redirectParam)}`);
}

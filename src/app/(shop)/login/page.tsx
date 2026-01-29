/**
 * Legacy Login Page Redirect
 *
 * This page redirects to the new NextAuth-based login page at /auth/login
 */

import { redirect } from 'next/navigation';

export default async function LegacyLoginPage(props: {
  searchParams: Promise<{ redirect?: string; callbackUrl?: string }>;
}) {
  const searchParams = await props.searchParams;
  const redirectParam = searchParams.redirect || searchParams.callbackUrl || '/';

  // Redirect to the new NextAuth login page
  redirect(`/auth/login?callbackUrl=${encodeURIComponent(redirectParam)}`);
}

/**
 * Checkout Success Page (P3-T3.4)
 *
 * Payment completion page
 * - Extract orderId, paymentKey, amount from URL parameters
 * - Order confirmation and payment success message
 * - Link to download center
 * - Prompt non-members to sign up
 */

import { Suspense } from 'react';
import CheckoutSuccessContent from './checkout-success-content';

interface CheckoutSuccessPageProps {
  searchParams: Promise<{
    orderId?: string;
    paymentKey?: string;
    amount?: string;
  }>;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  // Next.js 15: searchParams is a Promise
  const params = await searchParams;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neo-cream flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-neo-black border-t-transparent"></div>
            <p className="mt-4 text-neo-black font-bold">Verifying payment...</p>
          </div>
        </div>
      }
    >
      <CheckoutSuccessContent searchParams={params} />
    </Suspense>
  );
}

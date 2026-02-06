/**
 * New Inquiry Page
 *
 * Inquiry Writing Page - Neo-Brutalism Design
 */

import Link from 'next/link';
import { ArrowLeft, MessageCircle, Lock, Info } from 'lucide-react';
import { InquiryForm } from '@/components/inquiries/inquiry-form';

interface NewInquiryPageProps {
  searchParams: Promise<{
    product_id?: string;
  }>;
}

export default async function NewInquiryPage({ searchParams }: NewInquiryPageProps) {
  const params = await searchParams;
  const productId = params.product_id;

  // Fetch product information (if product_id exists)
  let product = null;
  if (productId) {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/api/products/${productId}`, {
        cache: 'no-store',
      });

      if (response.ok) {
        const data = await response.json();
        product = data.product;
      }
    } catch (error) {
      console.error('Failed to fetch product:', error);
    }
  }

  return (
    <div className="min-h-screen bg-neo-cream">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back */}
        <Link
          href="/inquiries"
          className="inline-flex items-center gap-2 mb-6 text-neo-black font-bold hover:text-neo-blue transition-colors"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2.5} />
          Back to List
        </Link>

        {/* Form Card */}
        <div className="bg-neo-white border-3 border-neo-black shadow-neo p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 flex items-center justify-center bg-neo-blue border-3 border-neo-black shadow-neo-sm">
              <MessageCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-2xl font-black uppercase text-neo-black">Write Inquiry</h1>
          </div>
          <p className="text-neo-black/70 mb-8">
            Please inquire about any questions regarding products or services. We will respond as soon as possible.
          </p>

          <InquiryForm
            productId={productId}
            productName={product?.name}
          />
        </div>

        {/* Notice */}
        <div className="mt-6 bg-neo-yellow border-3 border-neo-black shadow-neo p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-neo-black" strokeWidth={2.5} />
            <h3 className="font-black uppercase text-neo-black">Inquiry Writing Guide</h3>
          </div>
          <ul className="space-y-2 text-neo-black/80">
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              You can receive more accurate answers by providing detailed inquiry content.
            </li>
            <li className="flex items-start gap-2">
              <Lock className="w-4 h-4 mt-0.5 flex-shrink-0" />
              If written as a secret post, only the author and admin can view the content.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              Inquiries containing personal information must be written as secret posts.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              We will send you an email notification when the answer is completed.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

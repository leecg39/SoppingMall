/**
 * Inquiry Detail Page
 *
 * Inquiry Detail Page - Neo-Brutalism Style
 *
 * Features:
 * - Display inquiry details
 * - Secret post access control (author/admin only)
 * - Display answer
 * - Increase view count
 * - Author info
 * - Product info
 *
 * URL: /inquiries/[id]
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { en } from 'date-fns/locale';
import { ArrowLeft, Lock, Eye, MessageCircle, Clock, User } from 'lucide-react';
import {
  INQUIRY_CATEGORIES,
  INQUIRY_STATUS,
  type InquiryCategoryType,
} from '@/types/inquiry';
import { auth } from '@/lib/auth';
import { InquiryAnswerForm } from '@/components/inquiries/inquiry-answer-form';

interface InquiryDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Category color mapping (Neo-Brutalism)
 */
const CATEGORY_COLORS: Record<InquiryCategoryType, string> = {
  product: 'bg-neo-blue text-white',
  shipping: 'bg-neo-green text-neo-black',
  refund: 'bg-neo-yellow text-neo-black',
  etc: 'bg-neo-cream text-neo-black',
};

/**
 * Inquiry Detail Page
 */
export default async function InquiryDetailPage({ params }: InquiryDetailPageProps) {
  const { id } = await params;

  // Session check (admin status)
  const session = await auth();
  const isAdmin = session?.user?.role === 'admin';

  // API Call
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/inquiries/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error('Failed to fetch inquiry');
  }

  const data = await response.json();
  const { inquiry } = data;

  // Answer completion status
  const isAnswered = inquiry.status === 'answered';

  // Relative time format
  const createdAt = formatDistanceToNow(new Date(inquiry.created_at), {
    addSuffix: true,
    locale: en,
  });

  const answeredAt = inquiry.answered_at
    ? formatDistanceToNow(new Date(inquiry.answered_at), {
        addSuffix: true,
        locale: en,
      })
    : null;

  return (
    <div className="min-h-screen bg-neo-white p-4 py-8 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <Link
          href="/inquiries"
          className="
            inline-flex items-center gap-2 mb-6
            text-sm font-bold text-neo-black
            hover:text-neo-blue
            transition-colors
          "
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
          Back to List
        </Link>

        {/* Inquiry Card */}
        <div className="bg-neo-white border-3 border-neo-black shadow-neo">
          {/* Header */}
          <div className="p-6 border-b-3 border-neo-black">
            {/* Category & Status */}
            <div className="flex items-center gap-3 flex-wrap mb-4">
              <span
                className={`
                  px-3 py-1
                  border-2 border-neo-black
                  text-xs font-black uppercase
                  ${CATEGORY_COLORS[inquiry.category as InquiryCategoryType]}
                `}
              >
                {INQUIRY_CATEGORIES[inquiry.category as InquiryCategoryType]}
              </span>
              <span
                className={`
                  px-3 py-1
                  border-2 border-neo-black
                  text-xs font-black uppercase
                  ${isAnswered
                    ? 'bg-neo-green text-neo-black'
                    : 'bg-neo-yellow text-neo-black'
                  }
                `}
              >
                {INQUIRY_STATUS[inquiry.status as keyof typeof INQUIRY_STATUS]}
              </span>
              {inquiry.is_private && (
                <span className="flex items-center gap-1 px-3 py-1 border-2 border-neo-black bg-neo-black/10 text-xs font-bold">
                  <Lock className="h-3 w-3" strokeWidth={2.5} />
                  Secret
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-neo-black mb-4">
              {inquiry.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center justify-between flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-4">
                {/* Author */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 border-2 border-neo-black bg-neo-cream flex items-center justify-center font-black text-sm">
                    {inquiry.author?.nickname?.[0] || inquiry.author?.email[0].toUpperCase()}
                  </div>
                  <span className="font-bold text-neo-black">
                    {inquiry.author?.nickname || inquiry.author?.email.split('@')[0]}
                  </span>
                </div>

                {/* Created Time */}
                <div className="flex items-center gap-1 text-neo-black/60">
                  <Clock className="h-4 w-4" strokeWidth={2} />
                  <span className="font-medium">{createdAt}</span>
                </div>
              </div>

              {/* View Count */}
              <div className="flex items-center gap-1 px-3 py-1 border-2 border-neo-black bg-neo-cream">
                <Eye className="h-4 w-4" strokeWidth={2} />
                <span className="font-bold">{inquiry.view_count}</span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* Product Info (if exists) */}
            {inquiry.product && (
              <div className="mb-6 p-4 border-3 border-neo-black bg-neo-cream">
                <p className="text-xs font-bold text-neo-black/60 uppercase mb-3">Inquired Product</p>
                <Link
                  href={`/products/${inquiry.product.slug}`}
                  className="
                    flex items-center gap-4
                    hover:opacity-80 transition-opacity
                  "
                >
                  {inquiry.product.thumbnail_url && (
                    <div className="relative w-16 h-16 border-2 border-neo-black overflow-hidden flex-shrink-0 bg-neo-white">
                      <Image
                        src={inquiry.product.thumbnail_url}
                        alt={inquiry.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-neo-black">{inquiry.product.name}</p>
                    <p className="text-sm font-medium text-neo-blue">View Product →</p>
                  </div>
                </Link>
              </div>
            )}

            {/* Inquiry Content */}
            <div className="min-h-[100px] text-neo-black whitespace-pre-wrap leading-relaxed">
              {inquiry.content}
            </div>
          </div>

          {/* Answer Section */}
          {isAnswered && inquiry.answer && (
            <div className="border-t-3 border-neo-black bg-neo-green/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="h-5 w-5 text-neo-black" strokeWidth={2.5} />
                <h2 className="text-lg font-black text-neo-black uppercase">Answer</h2>
              </div>

              {/* Answerer Info */}
              {inquiry.answerer && (
                <div className="flex items-center gap-3 mb-4 text-sm">
                  <div className="w-6 h-6 border-2 border-neo-black bg-neo-green flex items-center justify-center font-bold text-xs">
                    {inquiry.answerer.nickname?.[0] || inquiry.answerer.email[0].toUpperCase()}
                  </div>
                  <span className="font-bold text-neo-black">
                    {inquiry.answerer.nickname || inquiry.answerer.email.split('@')[0]}
                  </span>
                  {answeredAt && (
                    <span className="text-neo-black/60 font-medium">· {answeredAt}</span>
                  )}
                </div>
              )}

              {/* Answer Content */}
              <div className="p-4 border-3 border-neo-black bg-neo-white shadow-neo-sm">
                <div className="text-neo-black whitespace-pre-wrap leading-relaxed">
                  {inquiry.answer}
                </div>
              </div>
            </div>
          )}

          {/* Pending Answer Message (for general users) */}
          {!isAnswered && !isAdmin && (
            <div className="border-t-3 border-neo-black bg-neo-yellow/30 p-8 text-center">
              <div className="w-12 h-12 mx-auto mb-4 border-3 border-neo-black bg-neo-yellow flex items-center justify-center">
                <Clock className="h-6 w-6 text-neo-black" strokeWidth={2.5} />
              </div>
              <p className="font-bold text-neo-black text-lg">
                Waiting for admin response.
              </p>
              <p className="text-sm text-neo-black/60 mt-2 font-medium">
                We will respond as soon as possible.
              </p>
            </div>
          )}

          {/* Admin Answer Form */}
          {isAdmin && (
            <InquiryAnswerForm
              inquiryId={id}
              existingAnswer={inquiry.answer}
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3 mt-8">
          <Link
            href="/inquiries"
            className="
              px-6 py-3
              bg-neo-white
              text-neo-black
              border-3 border-neo-black
              shadow-neo
              font-bold uppercase tracking-wide

              hover:translate-x-[2px] hover:translate-y-[2px]
              hover:shadow-neo-sm

              active:translate-x-[4px] active:translate-y-[4px]
              active:shadow-none

              transition-all duration-150
            "
          >
            Back to List
          </Link>
        </div>
      </div>
    </div>
  );
}

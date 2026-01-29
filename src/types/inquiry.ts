import { z } from 'zod';

// ============================================================
// Inquiry Types & Schemas
// ============================================================

/**
 * Inquiry (Product Inquiry)
 * - Only logged-in users can write
 * - Private post option supported
 * - Admin answer functionality
 * - Categorized by (Product/Shipping/Refund/Other)
 */

// Inquiry categories
export const INQUIRY_CATEGORIES = {
  product: 'Product Info',
  shipping: 'Shipping Inquiry',
  refund: 'Refund/Exchange',
  etc: 'Other',
} as const;

export type InquiryCategoryType = keyof typeof INQUIRY_CATEGORIES;

// Inquiry status
export const INQUIRY_STATUS = {
  pending: 'Pending',
  answered: 'Answered',
} as const;

export type InquiryStatusType = keyof typeof INQUIRY_STATUS;

// Inquiry basic schema
export const InquirySchema = z.object({
  id: z.string().uuid(),
  product_id: z.string().uuid(),
  user_id: z.string().uuid(),
  category: z.enum(['product', 'shipping', 'refund', 'etc']),
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  is_private: z.boolean().default(false),
  status: z.enum(['pending', 'answered']).default('pending'),
  answer: z.string().nullable(),
  answered_by: z.string().uuid().nullable(),
  answered_at: z.string().datetime().nullable(),
  view_count: z.number().int().nonnegative().default(0),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type Inquiry = z.infer<typeof InquirySchema>;

// Inquiry with Author (includes author information)
export const InquiryWithAuthorSchema = InquirySchema.extend({
  author: z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    nickname: z.string().nullable(),
    avatar_url: z.string().url().nullable(),
  }),
});

export type InquiryWithAuthor = z.infer<typeof InquiryWithAuthorSchema>;

// Inquiry with Product (includes product information)
export const InquiryWithProductSchema = InquirySchema.extend({
  product: z.object({
    id: z.string().uuid(),
    name: z.string(),
    slug: z.string(),
    thumbnail_url: z.string().url().nullable(),
  }),
});

export type InquiryWithProduct = z.infer<typeof InquiryWithProductSchema>;

// Inquiry with Answer (includes answerer information)
export const InquiryWithAnswerSchema = InquirySchema.extend({
  answerer: z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    nickname: z.string().nullable(),
    avatar_url: z.string().url().nullable(),
  }).nullable(),
});

export type InquiryWithAnswer = z.infer<typeof InquiryWithAnswerSchema>;

// Inquiry creation input schema
export const CreateInquirySchema = z.object({
  product_id: z.string().uuid().optional(),
  category: z.enum(['product', 'shipping', 'refund', 'etc']),
  title: z.string().min(1, 'Please enter a title').max(200, 'Title must be 200 characters or less'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  is_private: z.boolean(),
});

export type CreateInquiryInput = z.infer<typeof CreateInquirySchema>;

// Inquiry update input schema (only editable before answer)
export const UpdateInquirySchema = z.object({
  category: z.enum(['product', 'shipping', 'refund', 'etc']).optional(),
  title: z.string().min(1).max(200).optional(),
  content: z.string().min(10).optional(),
  is_private: z.boolean().optional(),
});

export type UpdateInquiryInput = z.infer<typeof UpdateInquirySchema>;

// Inquiry answer input schema (for admin)
export const AnswerInquirySchema = z.object({
  answer: z.string().min(1, 'Please enter answer content'),
});

export type AnswerInquiryInput = z.infer<typeof AnswerInquirySchema>;

// Inquiry filter schema
export const InquiryFilterSchema = z.object({
  product_id: z.string().uuid().optional(),
  user_id: z.string().uuid().optional(),
  category: z.enum(['product', 'shipping', 'refund', 'etc']).optional(),
  status: z.enum(['pending', 'answered']).optional(),
  is_private: z.boolean().optional(),
  search: z.string().optional(),
  sort_by: z.enum(['latest', 'oldest', 'unanswered', 'most_viewed']).default('latest'),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

export type InquiryFilter = z.infer<typeof InquiryFilterSchema>;

// Inquiry sort options
export const INQUIRY_SORT_OPTIONS = {
  latest: { label: 'Latest', value: 'latest' },
  oldest: { label: 'Oldest', value: 'oldest' },
  unanswered: { label: 'Unanswered', value: 'unanswered' },
  most_viewed: { label: 'Most Viewed', value: 'most_viewed' },
} as const;

// Inquiry statistics schema
export const InquiryStatsSchema = z.object({
  total_count: z.number().int().nonnegative(),
  pending_count: z.number().int().nonnegative(),
  answered_count: z.number().int().nonnegative(),
  category_distribution: z.object({
    product: z.number().int().nonnegative(),
    shipping: z.number().int().nonnegative(),
    refund: z.number().int().nonnegative(),
    etc: z.number().int().nonnegative(),
  }),
  private_count: z.number().int().nonnegative(),
  average_answer_time_hours: z.number().nonnegative().nullable(),
});

export type InquiryStats = z.infer<typeof InquiryStatsSchema>;

// Inquiry answer template schema (for admin)
export const InquiryAnswerTemplateSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  category: z.enum(['product', 'shipping', 'refund', 'etc']).nullable(),
  content: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type InquiryAnswerTemplate = z.infer<typeof InquiryAnswerTemplateSchema>;

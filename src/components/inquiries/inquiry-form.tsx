/**
 * Inquiry Form Component - Neo-Brutalism Design
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2, Lock, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  CreateInquirySchema,
  type CreateInquiryInput,
  INQUIRY_CATEGORIES,
} from '@/types/inquiry';

interface InquiryFormProps {
  productId?: string;
  productName?: string;
  onSuccess?: (inquiryId: string) => void;
  onCancel?: () => void;
}

export function InquiryForm({
  productId,
  productName,
  onSuccess,
  onCancel,
}: InquiryFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateInquiryInput>({
    resolver: zodResolver(CreateInquirySchema),
    defaultValues: {
      product_id: productId || undefined,
      category: 'product',
      title: '',
      content: '',
      is_private: false,
    },
  });

  const isPrivate = watch('is_private');
  const category = watch('category');

  async function onSubmit(values: CreateInquiryInput) {
    try {
      setIsSubmitting(true);

      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to submit inquiry.');
      }

      toast({
        title: 'Inquiry has been submitted',
        description: 'We will respond as soon as possible.',
      });

      if (onSuccess) {
        onSuccess(data.inquiry.id);
      } else {
        router.push(`/inquiries/${data.inquiry.id}`);
      }
    } catch (error) {
      console.error('Inquiry submission error:', error);
      toast({
        title: 'Inquiry Submission Failed',
        description:
          error instanceof Error ? error.message : 'Failed to submit inquiry.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Product Information (if applicable) */}
      {productName && (
        <div className="p-4 bg-neo-cream border-3 border-neo-black">
          <p className="text-sm text-neo-black/60 font-bold">Inquiry Product</p>
          <p className="font-black text-neo-black">{productName}</p>
        </div>
      )}

      {/* Category Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-black uppercase text-neo-black">
          Inquiry Type
        </label>
        <div className="relative">
          <select
            {...register('category')}
            className="w-full px-4 py-3 bg-neo-white border-3 border-neo-black font-bold text-neo-black appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-neo-blue"
            disabled={isSubmitting}
          >
            {Object.entries(INQUIRY_CATEGORIES).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neo-black pointer-events-none" strokeWidth={2.5} />
        </div>
        <p className="text-sm text-neo-black/60">Please select the type that matches your inquiry.</p>
        {errors.category && (
          <p className="text-sm font-bold text-neo-pink">{errors.category.message}</p>
        )}
      </div>

      {/* Title */}
      <div className="space-y-2">
        <label className="block text-sm font-black uppercase text-neo-black">
          Title
        </label>
        <input
          type="text"
          {...register('title')}
          placeholder="Enter inquiry title"
          className="w-full px-4 py-3 bg-neo-white border-3 border-neo-black font-medium text-neo-black placeholder:text-neo-black/40 focus:outline-none focus:ring-2 focus:ring-neo-blue"
          disabled={isSubmitting}
        />
        {errors.title && (
          <p className="text-sm font-bold text-neo-pink">{errors.title.message}</p>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <label className="block text-sm font-black uppercase text-neo-black">
          Content
        </label>
        <textarea
          {...register('content')}
          placeholder="Please enter your inquiry in detail (minimum 10 characters)"
          rows={8}
          className="w-full px-4 py-3 bg-neo-white border-3 border-neo-black font-medium text-neo-black placeholder:text-neo-black/40 resize-none focus:outline-none focus:ring-2 focus:ring-neo-blue"
          disabled={isSubmitting}
        />
        <p className="text-sm text-neo-black/60">
          The more detailed your inquiry, the more accurate response you will receive.
        </p>
        {errors.content && (
          <p className="text-sm font-bold text-neo-pink">{errors.content.message}</p>
        )}
      </div>

      {/* Private Post Option */}
      <label className="flex items-start gap-4 p-4 bg-neo-cream border-3 border-neo-black cursor-pointer hover:bg-neo-yellow/30 transition-colors">
        <input
          type="checkbox"
          {...register('is_private')}
          className="w-6 h-6 mt-0.5 border-3 border-neo-black appearance-none cursor-pointer checked:bg-neo-blue checked:border-neo-blue"
          disabled={isSubmitting}
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 font-black text-neo-black">
            <Lock className="w-5 h-5" strokeWidth={2.5} />
            Write as Private Post
          </div>
          <p className="text-sm text-neo-black/60 mt-1">
            If set as private, only the author and admin can view the content.
          </p>
        </div>
      </label>

      {/* Submit Buttons */}
      <div className="flex gap-3 justify-end pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-6 py-3 bg-neo-white text-neo-black border-3 border-neo-black shadow-neo font-bold uppercase hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-neo-blue text-white border-3 border-neo-black shadow-neo font-bold uppercase hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
          {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
        </button>
      </div>
    </form>
  );
}

/**
 * Admin Reviews Management Page
 *
 * Features:
 * - Review list retrieval and filtering (rating, period)
 * - Select best reviews
 * - Delete reviews
 * - Batch processing
 */

import ReviewManagement from '@/components/admin/review-management';

export const metadata = {
  title: 'Review Management - Vibe Store Admin',
  description: 'Manage product reviews.',
};

export default function AdminReviewsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Review Management</h1>
        <p className="text-muted-foreground">
          View customer reviews and select best reviews.
        </p>
      </div>

      <ReviewManagement />
    </div>
  );
}

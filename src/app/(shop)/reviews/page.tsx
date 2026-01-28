/**
 * Reviews Page - Neo-Brutalism Design
 * Product Reviews List Page
 */

import { Suspense } from 'react';
import Link from 'next/link';
import { Star, ThumbsUp, MessageCircle, Search } from 'lucide-react';

interface ReviewsPageProps {
  searchParams: Promise<{
    sort_by?: string;
    rating?: string;
    page?: string;
    search?: string;
  }>;
}

export default async function ReviewsPage({ searchParams }: ReviewsPageProps) {
  const params = await searchParams;
  const sortBy = params.sort_by || 'latest';
  const rating = params.rating;
  const page = parseInt(params.page || '1');
  const search = params.search;

  // API Call
  const queryParams = new URLSearchParams();
  if (sortBy) queryParams.set('sort_by', sortBy);
  if (rating) queryParams.set('rating', rating);
  if (page) queryParams.set('page', page.toString());
  if (search) queryParams.set('search', search);

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  let reviews: any[] = [];
  let pagination = { page: 1, limit: 20, total: 0, totalPages: 0 };

  try {
    const response = await fetch(`${baseUrl}/api/reviews?${queryParams.toString()}`, {
      cache: 'no-store',
    });

    if (response.ok) {
      const data = await response.json();
      reviews = data.reviews || [];
      pagination = data.pagination || pagination;
    }
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
  }

  return (
    <div className="min-h-screen bg-neo-cream">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 flex items-center justify-center bg-neo-yellow border-3 border-neo-black shadow-neo">
            <Star className="w-8 h-8 text-neo-black" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase text-neo-black">Product Reviews</h1>
            <p className="text-neo-black/70 mt-1">
              See authentic reviews from actual customers
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-neo-white border-3 border-neo-black shadow-neo p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Rating Filter */}
            <div className="flex gap-2">
              <Link
                href="/reviews"
                className={`px-3 py-1.5 text-sm font-bold border-2 border-neo-black transition-all ${
                  !rating ? 'bg-neo-yellow text-neo-black' : 'bg-transparent text-neo-black hover:bg-neo-black/10'
                }`}
              >
                All
              </Link>
              {[5, 4, 3, 2, 1].map((r) => (
                <Link
                  key={r}
                  href={`/reviews?rating=${r}`}
                  className={`px-3 py-1.5 text-sm font-bold border-2 border-neo-black transition-all flex items-center gap-1 ${
                    rating === String(r) ? 'bg-neo-yellow text-neo-black' : 'bg-transparent text-neo-black hover:bg-neo-black/10'
                  }`}
                >
                  <Star className="w-4 h-4 fill-current" /> {r}
                </Link>
              ))}
            </div>

            {/* Sort */}
            <div className="flex gap-2">
              {[
                { key: 'latest', label: 'Latest' },
                { key: 'likes', label: 'Most Liked' },
                { key: 'rating_high', label: 'Highest Rated' },
              ].map(({ key, label }) => (
                <Link
                  key={key}
                  href={`/reviews?sort_by=${key}${rating ? `&rating=${rating}` : ''}`}
                  className={`px-3 py-1.5 text-sm font-bold border-2 border-neo-black transition-all ${
                    sortBy === key ? 'bg-neo-blue text-white' : 'bg-transparent text-neo-black hover:bg-neo-black/10'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Search */}
            <form className="flex-1 min-w-[200px]" method="GET" action="/reviews">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neo-black/50" strokeWidth={2.5} />
                <input
                  type="search"
                  name="search"
                  placeholder="Search reviews..."
                  className="w-full pl-10 pr-4 py-2 border-3 border-neo-black font-medium focus:outline-none focus:ring-2 focus:ring-neo-blue"
                  defaultValue={search}
                />
                {rating && <input type="hidden" name="rating" value={rating} />}
                {sortBy && <input type="hidden" name="sort_by" value={sortBy} />}
              </div>
            </form>
          </div>
        </div>

        {/* Reviews List */}
        <Suspense
          fallback={
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-40 bg-neo-white border-3 border-neo-black/30 animate-pulse" />
              ))}
            </div>
          }
        >
          {reviews.length === 0 ? (
            <div className="bg-neo-white border-3 border-neo-black shadow-neo p-12 text-center">
              <Star className="w-16 h-16 mx-auto mb-4 text-neo-black/30" strokeWidth={2} />
              <p className="text-neo-black/70 mb-6 text-lg">
                No reviews registered.
              </p>
              <p className="text-neo-black/50">
                You can write reviews after purchasing products.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review: any) => (
                <div
                  key={review.id}
                  className="bg-neo-white border-3 border-neo-black shadow-neo p-6 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg transition-all"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {/* Rating */}
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-5 h-5 ${
                                star <= review.rating
                                  ? 'fill-neo-yellow text-neo-yellow'
                                  : 'text-neo-black/20'
                              }`}
                              strokeWidth={2}
                            />
                          ))}
                        </div>
                        <span className="font-bold text-neo-black">{review.rating}.0</span>
                      </div>
                      <h3 className="font-black text-lg text-neo-black">{review.title}</h3>
                    </div>
                    {review.is_best && (
                      <span className="px-3 py-1 bg-neo-pink text-white border-2 border-neo-black font-bold text-sm">
                        BEST
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  {review.product && (
                    <Link
                      href={`/products/${review.product.slug}`}
                      className="inline-block mb-3 px-3 py-1 bg-neo-cream border-2 border-neo-black text-sm font-bold hover:bg-neo-yellow transition-colors"
                    >
                      {review.product.name}
                    </Link>
                  )}

                  {/* Content */}
                  <p className="text-neo-black/80 mb-4 leading-relaxed">{review.content}</p>

                  {/* Images */}
                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {review.images.slice(0, 5).map((img: string, idx: number) => (
                        <div
                          key={idx}
                          className="w-20 h-20 border-2 border-neo-black bg-neo-cream"
                        />
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4 text-neo-black/60">
                      <span className="font-bold">{review.author?.nickname || 'Anonymous'}</span>
                      <span>{new Date(review.created_at).toLocaleDateString('ko-KR')}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-neo-black/60 hover:text-neo-pink transition-colors">
                        <ThumbsUp className="w-4 h-4" strokeWidth={2.5} />
                        <span className="font-bold">{review.like_count || 0}</span>
                      </button>
                      <button className="flex items-center gap-1 text-neo-black/60 hover:text-neo-blue transition-colors">
                        <MessageCircle className="w-4 h-4" strokeWidth={2.5} />
                        <span className="font-bold">{review.comment_count || 0}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Suspense>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            {page > 1 && (
              <Link
                href={`/reviews?page=${page - 1}${rating ? `&rating=${rating}` : ''}${sortBy ? `&sort_by=${sortBy}` : ''}`}
                className="px-4 py-2 bg-neo-white border-3 border-neo-black shadow-neo-sm font-bold hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
              >
                Previous
              </Link>
            )}
            <span className="px-4 py-2 bg-neo-black text-white border-3 border-neo-black font-bold">
              {page} / {pagination.totalPages}
            </span>
            {page < pagination.totalPages && (
              <Link
                href={`/reviews?page=${page + 1}${rating ? `&rating=${rating}` : ''}${sortBy ? `&sort_by=${sortBy}` : ''}`}
                className="px-4 py-2 bg-neo-white border-3 border-neo-black shadow-neo-sm font-bold hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
              >
                Next
              </Link>
            )}
          </div>
        )}

        {/* Total Count */}
        <div className="text-center mt-4 font-bold text-neo-black/70">
          Total {pagination.total} reviews
        </div>
      </div>
    </div>
  );
}

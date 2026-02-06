'use client';

/**
 * Products Page
 *
 * P2-T2.4: Product List Page
 * - Responsive grid layout (1/2/3/4 cols)
 * - Category filter (sidebar)
 * - Sort options (popular/newest/price)
 * - Pagination
 */

import { useState, useEffect, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/products/product-card';
import { useProducts } from '@/hooks/use-products';
import type { ProductsParams } from '@/types/products';
import type { CategoryFull } from '@/types/category';
import { Button } from '@/components/ui/button';

// ============================================================================
// Types
// ============================================================================

type SortOption = 'popular' | 'newest' | 'price_asc' | 'price_desc';

// ============================================================================
// Helpers
// ============================================================================

/**
 * Get effective price (discount_price if available, otherwise price)
 */
function getEffectivePrice(product: any): number {
  return product.discount_price ?? product.price ?? 0;
}

// ============================================================================
// Component
// ============================================================================

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category');

  const [params, setParams] = useState<ProductsParams>({
    page: 1,
    pageSize: 12,
    sort: 'newest',
    category: categoryFromUrl || undefined,
  });

  const [categories, setCategories] = useState<CategoryFull[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFromUrl);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Update category when URL parameter changes
  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
    setParams((prev) => ({
      ...prev,
      category: categoryFromUrl || undefined,
      page: 1,
    }));
  }, [categoryFromUrl]);

  const { products, pagination, isLoading, error } = useProducts(params);

  // Client-side sort by category and price
  const sortedProducts = useMemo(() => {
    if (!products || products.length === 0) return products;

    let result = [...products];

    // Only apply price sorting for price_asc and price_desc
    // For newest and popular, use API-sorted order
    if (params.sort === 'price_asc') {
      // Find VERSPA Basic category for prioritization
      const basicCategory = categories.find(
        (cat) => cat.slug === 'verspa-basic' || cat.name.toLowerCase().includes('basic')
      );

      result = result.sort((a, b) => {
        // When viewing All category, prioritize VERSPA Basic products first
        if (selectedCategory === null && basicCategory) {
          const aIsBasic = a.category_id === basicCategory.id;
          const bIsBasic = b.category_id === basicCategory.id;

          // If one is Basic and the other is not, prioritize Basic
          if (aIsBasic && !bIsBasic) return -1;
          if (!aIsBasic && bIsBasic) return 1;
        }

        // Price sorting within category groups
        return getEffectivePrice(a) - getEffectivePrice(b);
      });
    } else if (params.sort === 'price_desc') {
      // Find VERSPA Basic category for prioritization
      const basicCategory = categories.find(
        (cat) => cat.slug === 'verspa-basic' || cat.name.toLowerCase().includes('basic')
      );

      result = result.sort((a, b) => {
        // When viewing All category, prioritize VERSPA Basic products first
        if (selectedCategory === null && basicCategory) {
          const aIsBasic = a.category_id === basicCategory.id;
          const bIsBasic = b.category_id === basicCategory.id;

          // If one is Basic and the other is not, prioritize Basic
          if (aIsBasic && !bIsBasic) return -1;
          if (!aIsBasic && bIsBasic) return 1;
        }

        // Price sorting within category groups
        return getEffectivePrice(b) - getEffectivePrice(a);
      });
    }
    // For 'newest' and 'popular', use API-sorted order without Basic prioritization

    return result;
  }, [products, params.sort, selectedCategory, categories]);

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();

        // Sort categories: Accessory categories to the bottom
        const sortedCategories = (data.categories || []).sort((a: CategoryFull, b: CategoryFull) => {
          const aIsAccessory = a.name.toLowerCase().includes('accessory');
          const bIsAccessory = b.name.toLowerCase().includes('accessory');

          if (aIsAccessory && !bIsAccessory) return 1; // a goes after b
          if (!aIsAccessory && bIsAccessory) return -1; // a goes before b
          return 0; // maintain original order
        });

        setCategories(sortedCategories);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      } finally {
        setIsLoadingCategories(false);
      }
    }

    fetchCategories();
  }, []);

  // Handle category filter
  const handleCategoryChange = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    setParams((prev) => ({
      ...prev,
      category: categorySlug || undefined,
      page: 1, // Reset to first page
    }));
  };

  // Handle sort change
  const handleSortChange = (sort: SortOption) => {
    setParams((prev) => ({
      ...prev,
      sort,
      page: 1, // Reset to first page
    }));
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setParams((prev) => ({
      ...prev,
      page,
    }));
  };

  // Get primary image URL
  const getProductThumbnail = (product: any): string | undefined => {
    // If API directly provides thumbnail field
    if (product.thumbnail) {
      return product.thumbnail;
    }
    // Extract from images array
    if (product.images && product.images.length > 0) {
      const firstImage = product.images[0];
      // If image is object, extract url field
      if (typeof firstImage === 'object' && firstImage.url) {
        return firstImage.url;
      }
      // If string, return as is
      if (typeof firstImage === 'string') {
        return firstImage;
      }
    }
    return undefined;
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Category Filter */}
      <aside
        role="complementary"
        className="hidden w-64 shrink-0 border-r-4 border-black bg-white p-6 lg:block"
      >
        <h2 className="mb-6 text-xl font-bold">Categories</h2>

        {isLoadingCategories ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
          </div>
        ) : (
          <ul className="space-y-2">
            {/* All categories */}
            <li>
              <button
                onClick={() => handleCategoryChange(null)}
                className={`w-full rounded-lg border-2 border-black px-4 py-2 text-left font-bold transition-colors ${
                  selectedCategory === null
                    ? 'bg-blue-500 text-white'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                All
              </button>
            </li>

            {/* Category list */}
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => handleCategoryChange(category.slug)}
                  className={`w-full rounded-lg border-2 border-black px-4 py-2 text-left font-bold transition-colors ${
                    selectedCategory === category.slug
                      ? 'bg-blue-500 text-white'
                      : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="ml-2 text-sm opacity-70">
                    ({category.product_count})
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* Main Content */}
      <main role="main" className="flex-1 p-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Products</h1>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="font-bold">
              Sort:
            </label>
            <select
              id="sort-select"
              role="combobox"
              aria-label="Sort"
              value={params.sort || 'newest'}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              className="rounded-lg border-2 border-black bg-white px-4 py-2 font-bold shadow-neo transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-neo-sm"
            >
              <option value="newest">Newest</option>
              <option value="popular">Popular</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div
              data-testid="loading-spinner"
              className="h-16 w-16 animate-spin rounded-full border-4 border-black border-t-transparent"
            ></div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="rounded-lg border-4 border-red-500 bg-red-50 p-8 text-center">
            <p className="text-xl font-bold text-red-700">
              Failed to load products
            </p>
            <p className="mt-2 text-red-600">{error.message}</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && sortedProducts.length === 0 && (
          <div className="rounded-lg border-4 border-black bg-gray-50 p-12 text-center">
            <p className="text-2xl font-bold text-gray-700">No products found</p>
            <p className="mt-2 text-gray-600">
              {selectedCategory
                ? 'Try selecting a different category'
                : 'New products will be added soon'}
            </p>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !error && sortedProducts.length > 0 && (
          <>
            <div
              data-testid="products-grid"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  thumbnail={getProductThumbnail(product)}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <nav
                role="navigation"
                aria-label="Pagination"
                className="mt-12 flex items-center justify-center gap-2"
              >
                {/* Previous Button */}
                <Button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  variant="outline"
                  className="border-2 border-black font-bold shadow-neo disabled:opacity-50"
                >
                  Previous
                </Button>

                {/* Page Numbers */}
                <div className="flex gap-2">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      // Show first, last, current, and adjacent pages
                      return (
                        page === 1 ||
                        page === pagination.totalPages ||
                        Math.abs(page - pagination.page) <= 1
                      );
                    })
                    .map((page, index, array) => {
                      // Add ellipsis if there's a gap
                      const showEllipsis =
                        index > 0 && page - array[index - 1] > 1;

                      return (
                        <div key={page} className="flex gap-2">
                          {showEllipsis && <span className="px-2">...</span>}
                          <Button
                            onClick={() => handlePageChange(page)}
                            variant={
                              page === pagination.page ? 'default' : 'outline'
                            }
                            className={`min-w-[44px] border-2 border-black font-bold shadow-neo ${
                              page === pagination.page
                                ? 'bg-blue-500 text-white'
                                : 'bg-white'
                            }`}
                          >
                            {page}
                          </Button>
                        </div>
                      );
                    })}
                </div>

                {/* Next Button */}
                <Button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  variant="outline"
                  className="border-2 border-black font-bold shadow-neo disabled:opacity-50"
                >
                  Next
                </Button>
              </nav>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}

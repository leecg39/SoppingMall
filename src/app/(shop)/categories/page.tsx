'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { CategoryFull } from '@/types/category';
import { Folder, Package } from 'lucide-react';

/**
 * Categories Page
 *
 * Categories List Page
 * - Category cards in Neo-Brutalism style
 * - Display product count
 * - Navigate to category-specific product pages
 */

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryFull[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <main className="min-h-screen bg-neo-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-neo-black mb-4">
            Categories
          </h1>
          <p className="text-lg text-neo-gray">
            Select a category to browse products
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-neo-black border-t-transparent"></div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="rounded-lg border-4 border-neo-pink bg-pink-50 p-8 text-center">
            <p className="text-xl font-bold text-neo-pink">
              Failed to load categories
            </p>
            <p className="mt-2 text-neo-gray">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && categories.length === 0 && (
          <div className="rounded-lg border-4 border-neo-black bg-gray-50 p-12 text-center">
            <Folder className="w-16 h-16 mx-auto mb-4 text-neo-gray" />
            <p className="text-2xl font-bold text-neo-gray">
              No categories registered
            </p>
          </div>
        )}

        {/* Categories Grid */}
        {!isLoading && !error && categories.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group"
              >
                <div className="h-full bg-neo-white border-4 border-neo-black shadow-neo hover:shadow-neo-lg hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-150 p-6">
                  {/* Category Icon */}
                  <div className="w-16 h-16 mb-4 bg-neo-blue border-3 border-neo-black flex items-center justify-center">
                    <Folder className="w-8 h-8 text-neo-white" strokeWidth={2.5} />
                  </div>

                  {/* Category Name */}
                  <h2 className="text-2xl font-black uppercase tracking-tight text-neo-black mb-2 group-hover:text-neo-blue transition-colors">
                    {category.name}
                  </h2>

                  {/* Description */}
                  {category.description && (
                    <p className="text-sm text-neo-gray mb-4 line-clamp-2">
                      {category.description}
                    </p>
                  )}

                  {/* Product Count */}
                  <div className="flex items-center gap-2 text-sm font-bold text-neo-gray">
                    <Package className="w-4 h-4" strokeWidth={2.5} />
                    <span>{category.product_count || 0} products</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

/**
 * Cart Page
 *
 * Shopping cart page
 * - Cart items list
 * - Quantity adjustment (+ / - buttons)
 * - Remove button
 * - Total amount display (with discounts)
 * - Empty cart message
 * - Checkout button (navigate to /checkout)
 * - Neo-Brutalism style
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

/**
 * Convert price to $2000-3000 USD range with consistent random variation
 */
function formatPrice(price: number): string {
  const seed = price % 1000;
  const randomPrice = 2000 + (seed * 1.5);
  const usdPrice = Math.round(randomPrice);
  return `$${usdPrice.toLocaleString('en-US')}`;
}

export default function CartPage() {
  const router = useRouter();
  const { items, total, isLoading, updateQuantity, removeItem } = useCart();

  // Empty cart
  if (!isLoading && items.length === 0) {
    return (
      <div className="min-h-screen bg-neo-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-md mx-auto text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 mb-6 bg-neo-cream border-3 border-neo-black shadow-neo">
              <ShoppingBag className="w-12 h-12 text-neo-black" strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-black text-neo-black mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-neo-black/70 mb-8">
              Add products you love to your cart
            </p>
            <Button
              onClick={() => router.push('/')}
              className="px-8 py-4 bg-neo-blue text-white border-3 border-neo-black shadow-neo font-bold uppercase hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-neo-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-neo-black border-t-neo-blue rounded-full animate-spin" />
            <p className="mt-4 text-neo-black font-bold">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Cart items list
  return (
    <div className="min-h-screen bg-neo-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-neo-black uppercase">
            Shopping Cart
          </h1>
          <p className="mt-2 text-neo-black/70">
            {items.length} {items.length === 1 ? 'item' : 'items'} in cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items list */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const price = item.product.discount_price ?? item.product.price;
              const hasDiscount = item.product.discount_price !== null;

              return (
                <Card
                  key={item.id}
                  className="bg-neo-white border-3 border-neo-black shadow-neo p-4"
                >
                  <div className="flex gap-4">
                    {/* Thumbnail */}
                    <div className="relative w-24 h-24 bg-neo-cream border-2 border-neo-black flex-shrink-0 overflow-hidden">
                      {item.product.thumbnail_url ? (
                        <Image
                          src={item.product.thumbnail_url}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <ShoppingBag className="w-8 h-8 text-neo-black/30" strokeWidth={2.5} />
                        </div>
                      )}
                    </div>

                    {/* Product info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-neo-black line-clamp-2">
                        {item.product.name}
                      </h3>

                      {/* Price */}
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-xl font-black text-neo-blue">
                          {formatPrice(price)}
                        </span>
                        {hasDiscount && (
                          <span className="text-sm text-neo-black/50 line-through">
                            {formatPrice(item.product.price)}
                          </span>
                        )}
                      </div>

                      {/* Quantity controls & Delete */}
                      <div className="mt-4 flex items-center justify-between">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                            className="w-8 h-8 p-0 bg-neo-white border-2 border-neo-black shadow-neo-sm hover:bg-neo-yellow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-neo-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 transition-all duration-150"
                          >
                            <Minus className="w-4 h-4 text-neo-black" strokeWidth={2.5} />
                          </Button>
                          <span className="min-w-[2rem] text-center font-bold text-neo-black">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="w-8 h-8 p-0 bg-neo-white border-2 border-neo-black shadow-neo-sm hover:bg-neo-yellow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-neo-sm transition-all duration-150"
                          >
                            <Plus className="w-4 h-4 text-neo-black" strokeWidth={2.5} />
                          </Button>
                        </div>

                        {/* Delete button */}
                        <Button
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove"
                          className="px-3 py-2 bg-white border-2 border-neo-black shadow-neo-sm hover:bg-[#FFE6E6] hover:border-[#FF3333] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#FF3366] transition-all duration-150"
                        >
                          <Trash2 className="w-4 h-4 text-neo-black" strokeWidth={2.5} />
                          <span className="ml-2 font-bold text-sm">Remove</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 bg-neo-cream border-3 border-neo-black shadow-neo p-6">
              <h2 className="text-xl font-black text-neo-black uppercase mb-6">
                Order Summary
              </h2>

              {/* Total */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-neo-black/70">Subtotal</span>
                  <span className="font-bold text-neo-black">
                    {formatPrice(total)}
                  </span>
                </div>
                <div className="border-t-2 border-neo-black pt-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold text-neo-black">Total</span>
                    <span className="text-2xl font-black text-neo-blue">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={() => router.push('/checkout')}
                className="w-full px-6 py-4 bg-neo-pink text-white border-3 border-neo-black shadow-neo font-bold uppercase flex items-center justify-center gap-2 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150"
              >
                Checkout
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </Button>

              {/* Notice */}
              <div className="mt-4 p-3 bg-neo-white border-2 border-neo-black">
                <p className="text-xs text-neo-black/70">
                  Digital products are available for download immediately after purchase
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

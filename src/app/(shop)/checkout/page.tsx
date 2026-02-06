'use client';

/**
 * Checkout Page
 *
 * Payment checkout page
 * - Display cart items summary
 * - Email input form (auto-filled when logged in)
 * - Virtual payment processing (for testing)
 * - Payment success/failure handling
 * - Neo-Brutalism style
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

// ============================================================================
// Types
// ============================================================================

interface OrderItem {
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
}

// ============================================================================
// Checkout Page Component
// ============================================================================

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { items, total, fetchCart } = useCartStore();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Fetch cart
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Auto-fill email from session
  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
    }
  }, [session]);

  // Email validation
  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Invalid email format');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Handle payment (virtual payment)
  const handlePayment = async () => {
    // 1. Validate email
    if (!validateEmail(email)) {
      return;
    }

    // 2. Check cart
    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // 3. Create order
      const orderItems: OrderItem[] = items.map((item) => ({
        product_id: item.product_id,
        product_name: item.product.name,
        price: item.product.discount_price ?? item.product.price,
        quantity: item.quantity,
      }));

      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: orderItems,
          guest_email: email,
          discount_amount: 0,
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.error?.message || 'Failed to create order');
      }

      const { data: order } = await orderResponse.json();

      // 4. Virtual payment processing (replaces Toss SDK)
      // Replace this section with Toss Payments SDK for actual payment integration
      const paymentResponse = await fetch(`/api/orders/${order.id}/payment`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentKey: `mock_${Date.now()}`,
          orderId: order.order_number,
          amount: order.total_amount,
        }),
      });

      if (!paymentResponse.ok) {
        const errorData = await paymentResponse.json();
        throw new Error(errorData.error?.message || 'Payment processing failed');
      }

      // 5. Clear cart
      useCartStore.getState().clearCart();

      // 6. Navigate to success page (pass orderId, paymentKey, amount)
      const mockPaymentKey = `mock_${Date.now()}`;
      router.push(`/checkout/success?orderId=${order.id}&paymentKey=${mockPaymentKey}&amount=${order.total_amount}`);
    } catch (err) {
      console.error('Payment processing failed:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during payment processing');
      setIsProcessing(false);
    }
  };

  // Format price to $2000-$3000 range
  const formatPrice = (price: number): string => {
    const seed = price % 1000;
    const randomPrice = 2000 + (seed * 1.5);
    const usdPrice = Math.round(randomPrice);
    return `$${usdPrice.toLocaleString('en-US')}`;
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50 py-12 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600">Please review your order and proceed to payment</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <Card className="border-4 border-black shadow-neo-xl">
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
                <CardDescription>{items.length} {items.length === 1 ? 'item' : 'items'}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.length === 0 ? (
                  <div className="py-12 text-center text-gray-500">
                    Your cart is empty
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      {/* Thumbnail */}
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 border-black">
                        {item.product.thumbnail_url ? (
                          <Image
                            src={item.product.thumbnail_url}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gray-200">
                            <span className="text-2xl">📦</span>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        <p className="mt-1 font-bold text-blue-600">
                          {formatPrice(item.product.discount_price ?? item.product.price)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Payment Info */}
          <div className="lg:col-span-1">
            <Card className="border-4 border-black shadow-neo-xl">
              <CardHeader>
                <CardTitle>Payment Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Email Input */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email for order confirmation"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError('');
                    }}
                    className={`border-2 ${
                      emailError ? 'border-red-500' : 'border-black'
                    }`}
                    disabled={isProcessing || !!session?.user?.email}
                    readOnly={!!session?.user?.email}
                  />
                  {session?.user?.email && (
                    <p className="text-xs text-gray-600">
                      Email from your logged-in account has been auto-filled
                    </p>
                  )}
                  {emailError && (
                    <p className="text-sm text-red-600">{emailError}</p>
                  )}
                </div>

                <Separator className="my-4" />

                {/* Payment Amount */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-blue-600">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="rounded-lg border-2 border-red-500 bg-red-50 p-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                {/* Payment Button */}
                <Button
                  onClick={handlePayment}
                  disabled={items.length === 0 || isProcessing}
                  className="w-full border-4 border-black bg-blue-400 py-6 text-lg font-bold text-white shadow-neo transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-blue-500 hover:shadow-neo disabled:bg-gray-300 disabled:shadow-none"
                >
                  {isProcessing ? 'Processing...' : 'Virtual Payment (Test)'}
                </Button>

                {/* Notice */}
                <div className="rounded-lg border-2 border-amber-400 bg-amber-50 p-3 text-xs text-amber-800">
                  <p className="font-semibold">Test Mode</p>
                  <p className="mt-1">
                    This is a virtual payment for testing. No actual charge will be made.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

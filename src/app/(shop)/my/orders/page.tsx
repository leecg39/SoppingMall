/**
 * Orders Page
 *
 * Order status page
 * - Display user's order list
 * - Show order status, payment amount, order items
 * - Link to download center
 * - Neo-Brutalism style
 */

import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/server';
import { type OrderWithItems, type OrderStatus } from '@/types/order';
import {
  Package,
  ShoppingBag,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  Download,
} from 'lucide-react';
import Link from 'next/link';

/**
 * Get status display info
 */
function getStatusInfo(status: OrderStatus): {
  label: string;
  color: string;
  bgColor: string;
  Icon: typeof CheckCircle;
} {
  switch (status) {
    case 'paid':
      return {
        label: 'Paid',
        color: 'text-green-700',
        bgColor: 'bg-green-100 border-green-500',
        Icon: CheckCircle,
      };
    case 'completed':
      return {
        label: 'Completed',
        color: 'text-neo-blue',
        bgColor: 'bg-blue-100 border-neo-blue',
        Icon: CheckCircle,
      };
    case 'pending':
      return {
        label: 'Pending',
        color: 'text-amber-700',
        bgColor: 'bg-amber-100 border-amber-500',
        Icon: Clock,
      };
    case 'cancelled':
      return {
        label: 'Cancelled',
        color: 'text-gray-600',
        bgColor: 'bg-gray-100 border-gray-400',
        Icon: XCircle,
      };
    case 'refunded':
      return {
        label: 'Refunded',
        color: 'text-red-600',
        bgColor: 'bg-red-100 border-red-400',
        Icon: RefreshCw,
      };
    default:
      return {
        label: status,
        color: 'text-neo-black',
        bgColor: 'bg-neo-cream border-neo-black',
        Icon: Package,
      };
  }
}

/**
 * Format date
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format price to $2000-$3000 range
 */
function formatPrice(price: number): string {
  const seed = price % 1000;
  const randomPrice = 2000 + (seed * 1.5);
  const usdPrice = Math.round(randomPrice);
  return `$${usdPrice.toLocaleString('en-US')}`;
}

export default async function OrdersPage() {
  // 1. Check authentication (NextAuth)
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login?redirect=/my/orders');
    return null;
  }

  const userId = session.user.id;

  // 2. Fetch orders with items (Admin client to bypass RLS, filter by user_id)
  const supabase = createAdminClient();
  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select(
      `
      *,
      order_items (*)
    `
    )
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  // 3. Handle errors
  if (ordersError) {
    return (
      <div className="min-h-screen bg-neo-white p-4 py-8 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <div
            className="
              bg-[#FFE6E6]
              border-3 border-[#FF3333]
              shadow-neo-pink
              p-6
            "
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-[#FF3333]" strokeWidth={2.5} />
              <div>
                <h2 className="text-lg font-black text-neo-black uppercase">An error occurred</h2>
                <p className="text-sm text-neo-black/70 mt-1">{ordersError.message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const orderList: OrderWithItems[] = (orders || []).map((order: any) => ({
    ...order,
    payment_info: order.payment_info as Record<string, any>,
    order_items: order.order_items || [],
  }));

  return (
    <div className="min-h-screen bg-neo-white p-4 py-8 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-black text-neo-black uppercase tracking-tight">
            Order Status
          </h1>
          <p className="text-base text-neo-black/70 mt-2">
            Check your order history and payment status
          </p>
        </div>

        {/* Empty State */}
        {orderList.length === 0 && (
          <div
            className="
              bg-neo-cream
              border-3 border-neo-black
              shadow-neo
              p-12
              text-center
            "
          >
            <ShoppingBag className="w-16 h-16 text-neo-black/40 mx-auto mb-4" strokeWidth={2} />
            <h2 className="text-2xl font-black text-neo-black uppercase mb-2">
              No orders yet
            </h2>
            <p className="text-sm text-neo-black/60 mb-6">
              You can check your order status here after making a purchase
            </p>
            <Link
              href="/products"
              className="
                inline-block
                px-6 py-3
                bg-neo-blue
                text-white
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
              Browse Products
            </Link>
          </div>
        )}

        {/* Orders List */}
        {orderList.length > 0 && (
          <div className="space-y-6">
            {orderList.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.Icon;
              const isPaid = order.status === 'paid' || order.status === 'completed';

              return (
                <div
                  key={order.id}
                  className="
                    bg-neo-white
                    border-3 border-neo-black
                    shadow-neo
                    overflow-hidden
                  "
                >
                  {/* Order Header */}
                  <div className="bg-neo-cream border-b-3 border-neo-black p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Order Number & Date */}
                      <div>
                        <p className="text-xs font-bold text-neo-black/60 uppercase">
                          Order Number
                        </p>
                        <p className="text-lg font-black text-neo-black">
                          {order.order_number}
                        </p>
                        <p className="text-xs text-neo-black/60 mt-1">
                          {formatDate(order.created_at)}
                        </p>
                      </div>

                      {/* Status Badge */}
                      <div
                        className={`
                          inline-flex items-center gap-2
                          px-4 py-2
                          border-2 ${statusInfo.bgColor}
                          font-bold text-sm uppercase
                          ${statusInfo.color}
                        `}
                      >
                        <StatusIcon className="w-4 h-4" strokeWidth={2.5} />
                        <span>{statusInfo.label}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4 sm:p-6">
                    <div className="space-y-3">
                      {order.order_items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center py-2 border-b border-neo-black/10 last:border-0"
                        >
                          <div className="flex-1">
                            <p className="font-bold text-neo-black">{item.product_name}</p>
                            <p className="text-xs text-neo-black/60">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="font-bold text-neo-black">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="mt-4 pt-4 border-t-2 border-neo-black/20">
                      {order.discount_amount > 0 && (
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-neo-black/60">Discount</span>
                          <span className="text-[#FF3333] font-medium">
                            -{formatPrice(order.discount_amount)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="font-bold text-neo-black">Total Amount</span>
                        <span className="text-xl font-black text-neo-blue">
                          {formatPrice(order.total_amount)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    {isPaid && (
                      <div className="mt-6 pt-4 border-t-2 border-neo-black/10">
                        <Link
                          href="/my/downloads"
                          className="
                            inline-flex items-center gap-2
                            px-4 py-2
                            bg-neo-blue
                            text-white
                            border-2 border-neo-black
                            shadow-neo-sm
                            font-bold text-sm uppercase

                            hover:translate-x-[1px] hover:translate-y-[1px]
                            hover:shadow-none

                            transition-all duration-150
                          "
                        >
                          <Download className="w-4 h-4" strokeWidth={2.5} />
                          <span>Download Center</span>
                        </Link>
                      </div>
                    )}

                    {/* Paid At */}
                    {order.paid_at && (
                      <div className="mt-4 flex items-center gap-2 text-xs text-neo-black/60">
                        <CheckCircle className="w-3.5 h-3.5 text-green-600" strokeWidth={2.5} />
                        <span>Paid on: {formatDate(order.paid_at)}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

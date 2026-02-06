'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useCartStore } from '@/stores/cart-store';

/**
 * CartBadge Component
 * - Shopping cart icon + quantity badge
 * - Real-time quantity update via useCart hook
 * - Refresh cart on session change
 * - Hide cart icon for admins
 */
export function CartBadge() {
  const { items, fetchCart } = useCartStore();
  const { data: session, status } = useSession();

  const isAdmin = session?.user?.role === 'admin';

  // Fetch cart on component mount and session change
  useEffect(() => {
    // Wait during session loading
    if (status === 'loading') return;
    // Admins don't fetch cart
    if (isAdmin) return;
    fetchCart();
  }, [fetchCart, session?.user?.id, status, isAdmin]);

  // Hide cart icon for admins
  if (isAdmin) {
    return null;
  }

  // Calculate total quantity
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link
      href="/cart"
      className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-neo-white border-3 border-neo-black shadow-neo-sm hover:bg-neo-blue hover:text-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150"
      aria-label="Shopping cart"
    >
      <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
      {/* Cart count badge */}
      <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-neo-pink text-white border-2 border-neo-black text-xs font-bold rounded-full">
        {itemCount > 99 ? '99+' : itemCount}
      </span>
    </Link>
  );
}

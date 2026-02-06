'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useCartStore } from '@/stores/cart-store';

/**
 * CartBadge Component
 * - Dark luxury theme with amber accents
 * - Subtle glass effect styling
 * - Real-time quantity update via useCart hook
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
      className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-transparent border border-white/20 rounded-xl text-white/80 hover:bg-white/10 hover:text-white hover:border-white/40 transition-all duration-300"
      aria-label="Shopping cart"
    >
      <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
      {/* Cart count badge */}
      <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-primary text-background-dark text-xs font-bold rounded-full">
        {itemCount > 99 ? '99+' : itemCount}
      </span>
    </Link>
  );
}
